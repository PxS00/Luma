import BtnAcao from '@/components/Button/BtnAcao';
import FormField from '@/components/Form/FormField';
import InputField from '@/components/Form/InputField';
import { useAuth } from '@/hooks/useAuth';
import type { CadastroFormData } from '@/types/form';
import {
  getUsersFromStorage,
  saveUserToStorage,
  setAllUsersToStorage,
  setLoggedUser,
  setLoggedUserFull,
  getLoggedUserFull,
} from '@/utils/userStorage';
import { formatCPF, formatPhone, validateCPF } from '@/utils/validators';
import { useEffect, useMemo, useState } from 'react';
import Spinner from '@/components/Spinner/Spinner';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * Formulário de Cadastro
 * Coleta dados do usuário para cadastro prévio
 */
export default function FormCadastro() {
  const navigate = useNavigate();
  const { isLoggedIn, userData } = useAuth();
  const [searchParams] = useSearchParams();
  const isEditMode = useMemo(() => searchParams.get('edit') === '1', [searchParams]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isNavigatingToHome, setIsNavigatingToHome] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CadastroFormData>({
    mode: 'onTouched',
    defaultValues: {
      nome: '',
      cpf: '',
      dataNascimento: '',
      email: '',
      telefone: '',
    },
  });

  // Prefill when in edit mode and user is logged in
  useEffect(() => {
    if (isEditMode && isLoggedIn && userData) {
      // Assuming stored date is already yyyy-mm-dd
      // Ensure CPF/phone stay formatted
      reset({
        nome: userData.nome || '',
        cpf: userData.cpf || '',
        dataNascimento: userData.dataNascimento || '',
        email: userData.email || '',
        telefone: userData.telefone || '',
      });
    }
  }, [isEditMode, isLoggedIn, userData, reset]);

  /**
   * Manipula o envio do formulário de cadastro
   * Salva dados no localStorage e atualiza estado de autenticação
   * @param data - Dados do formulário validados
   */
 const onSubmit = async (data: CadastroFormData) => {
   setErrorMessage('');
   // mostra spinner de navegação enquanto processa (mesmo padrão do FormLogin)
   setIsNavigatingToHome(true);

    const onlyDigits = (v: string) => v.replace(/\D/g, '');

    try {
      const payload = {
        cpf: onlyDigits(data.cpf),
        name: data.nome,
        email: data.email || '',
        birthDate: data.dataNascimento,
        phone: data.telefone,
      };
    
      if (isEditMode) {
        const logged = getLoggedUserFull();
        const userId = logged?.id;
        if (!userId) {
          setErrorMessage('ID do usuário não encontrado para edição.');
          setIsNavigatingToHome(false);
          return;
        }

        const token = localStorage.getItem('token');

        const res = await fetch(`https://luma-wu46.onrender.com/user/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });

        const responseData = await res.json().catch(() => null);

        if (!res.ok) {
          const msg =
            (responseData && (responseData.message || responseData.error)) ||
            'Erro ao atualizar usuário.';
          setErrorMessage(msg);
          return;
        }

        try {
          const users = getUsersFromStorage();
          const normCpf = payload.cpf;
          const updated = users.map((u) =>
            u.cpf.replace(/\D/g, '') === normCpf
              ? {
                  nome: data.nome,
                  cpf: normCpf,
                  dataNascimento: data.dataNascimento,
                  email: data.email || '',
                  telefone: data.telefone,
                }
              : u
          );
          if (!updated.find((u) => u.cpf.replace(/\D/g, '') === normCpf)) {
            updated.push({
              nome: data.nome,
              cpf: normCpf,
              dataNascimento: data.dataNascimento,
              email: data.email || '',
              telefone: data.telefone,
            });
          }
          setAllUsersToStorage(updated);
        } catch (err) {
          console.warn('Falha ao atualizar usuário localmente:', err);
        }
        window.dispatchEvent(new CustomEvent('auth-update'));
        reset();
        // mantém o spinner ativo um instante curto para sensação de resposta e depois navega
        setTimeout(() => {
          setIsNavigatingToHome(false);
          navigate('/perfil', { replace: true, state: { message: 'Dados atualizados com sucesso!' } });
        }, 200);
        return;
      }

      // Caso seja criação 
      const res = await fetch('https://luma-wu46.onrender.com/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (!res.ok) {
        const msg =
          (responseData && (responseData.message || responseData.error)) ||
          (res.status === 409 ? 'Usuário já existe.' : 'Erro ao cadastrar usuário.');
        setErrorMessage(msg);
        return;
      }

      const token = responseData?.token || responseData?.accessToken;
      if (token) {
        localStorage.setItem('token', token);
      }

      // tenta sincronizar com o mesmo fluxo do FormLogin: buscar usuários e salvar o usuário logado completo
      try {
        const userRes = await fetch('https://luma-wu46.onrender.com/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (userRes.ok) {
          interface UserResponse {
            id: string | number;
            cpf: string;
            birthDate: string;
            name?: string;
            nome?: string;
            email?: string;
            phone?: string;
          }
          
          const users = (await userRes.json()) as UserResponse[];

          const normalizeCpf = (v: string = '') => String(v ?? '').replace(/\D/g, '');
          const normalizeDate = (v: string = '') => {
            if (!v) return '';
            const s = String(v);
            if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
            try {
              return new Date(s).toISOString().split('T')[0];
            } catch {
              return s;
            }
          };

          const birthIso = /^\d{4}-\d{2}-\d{2}$/.test(data.dataNascimento)
            ? data.dataNascimento
            : new Date(data.dataNascimento).toISOString().split('T')[0];

          const found = users.find(
            (u) =>
              normalizeCpf(u.cpf) === normalizeCpf(payload.cpf) &&
              normalizeDate(u.birthDate) === normalizeDate(birthIso)
          );

          // salva token e informações locais similar ao login
          if (found) {
            try {
              setLoggedUserFull({
                id: String(found.id),
                cpf: String(found.cpf),
                passwordDate: normalizeDate(found.birthDate),
              });

              saveUserToStorage({
                nome: String(found.name || found.nome || ''),
                cpf: String(found.cpf),
                dataNascimento: normalizeDate(found.birthDate),
                email: found.email || '',
                telefone: (found.phone as string) || '',
              });
            } catch (err) {
              console.warn('Falha ao salvar usuário localmente após cadastro:', err);
            }
            window.dispatchEvent(new CustomEvent('auth-update'));
          } else {
            // fallback: grava apenas o CPF e os dados do form
            try {
              saveUserToStorage({ ...data, cpf: payload.cpf });
            } catch (err) {
              console.error('Falha ao salvar usuário localmente:', err);
            }
            setLoggedUser(payload.cpf);
            window.dispatchEvent(new CustomEvent('auth-update'));
          }
        } else {
          // se falhar ao buscar usuários, ainda salva local e marca como logado (comportamento tolerante)
          try {
            saveUserToStorage({ ...data, cpf: payload.cpf });
          } catch (err) {
            console.error('Falha ao salvar usuário localmente:', err);
          }
          setLoggedUser(payload.cpf);
          window.dispatchEvent(new CustomEvent('auth-update'));
        }
      } catch (err) {
        console.warn('Erro ao sincronizar usuário após cadastro:', err);
        try {
          saveUserToStorage({ ...data, cpf: payload.cpf });
        } catch (e) {
          console.error('Falha ao salvar usuário localmente:', e);
        }
        setLoggedUser(payload.cpf);
        window.dispatchEvent(new CustomEvent('auth-update'));
      }

      reset();
      setTimeout(() => {
        setIsNavigatingToHome(false);
        navigate('/', {
          replace: true,
          state: { message: 'Cadastro realizado com sucesso!' },
        });
      }, 300);
    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
      setErrorMessage('Não foi possível concluir o cadastro. Verifique os dados informados ou tente novamente.');
      setIsNavigatingToHome(false);
    }
  };

  return (
    <main>
      {isNavigatingToHome && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-white/70'>
          <Spinner size='lg' message='Redirecionando...' />
        </div>
      )}
      <h1 className='text-center mb-5 text-fontPrimary text-2xl font-bold '>
        {isEditMode ? 'Atualizar dados' : 'Registre seu Cadastro'}
      </h1>

      <div className='alerta-obrigatorio bg-[color-mix(in_oklab,theme(colors.backBtn)_15%,white)] border-l-[5px] border-l-clikColor p-[10px_14px] mb-4 rounded-[5px] text-xs text-fontTertiary '>
        <p>
          Por favor, preencha todos os campos abaixo. Os campos marcados com <strong>*</strong> são
          obrigatórios.
        </p>
      </div>

      <form id='form-pre-atendimento' onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <FormField label='Nome completo' required>
          <Controller
            name='nome'
            control={control}
            rules={{
              required: 'Nome é obrigatório',
              minLength: { value: 2, message: 'Nome muito curto' },
            }}
            render={({ field }) => (
              <InputField
                type='text'
                name='nome'
                id='nome'
                value={field.value}
                onChange={field.onChange}
                placeholder='Digite seu nome'
                required
                maxLength={100}
                isValid={errors.nome ? false : field.value.length > 0}
                errorMessage={errors.nome?.message}
              />
            )}
          />
        </FormField>

        <FormField label='CPF' required>
          <Controller
            name='cpf'
            control={control}
            rules={{
              required: 'CPF é obrigatório',
              validate: (value) => validateCPF(value) || 'CPF inválido',
            }}
            render={({ field }) => (
              <InputField
                type='text'
                name='cpf'
                id='cpf'
                value={field.value}
                onChange={(v) => field.onChange(formatCPF(v))}
                placeholder='000.000.000-00'
                required
                maxLength={14}
                isValid={errors.cpf ? false : field.value.length > 0}
                errorMessage={errors.cpf?.message}
              />
            )}
          />
        </FormField>

        <FormField label='Data de nascimento' required>
          <Controller
            name='dataNascimento'
            control={control}
            rules={{
              required: 'Data de nascimento é obrigatória',
              validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                const minDate = new Date('1900-01-01');

                if (selectedDate > today) {
                  return 'Data não pode ser futura';
                }
                if (selectedDate < minDate) {
                  return 'Data muito antiga';
                }
                return true;
              },
            }}
            render={({ field }) => (
              <InputField
                type='date'
                name='dataNascimento'
                id='dataNascimento'
                value={field.value}
                onChange={field.onChange}
                required
                min='1900-01-01'
                max={new Date().toISOString().split('T')[0]}
                isValid={errors.dataNascimento ? false : !!field.value}
                errorMessage={errors.dataNascimento?.message}
              />
            )}
          />
        </FormField>

        <FormField label='E-mail' required>
          <Controller
            name='email'
            control={control}
            rules={{
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'E-mail inválido',
              },
            }}
            render={({ field }) => (
              <InputField
                type='email'
                name='email'
                id='email'
                value={field.value || ''}
                onChange={field.onChange}
                placeholder='seuemail@email.com'
                required
                maxLength={100}
                isValid={errors.email ? false : !!field.value}
                errorMessage={errors.email?.message}
              />
            )}
          />
        </FormField>

        <FormField label='Telefone' required>
          <Controller
            name='telefone'
            control={control}
            rules={{
              required: 'Telefone é obrigatório',
              validate: (value) => value.replace(/\D/g, '').length >= 10 || 'Telefone inválido',
            }}
            render={({ field }) => (
              <InputField
                type='tel'
                name='telefone'
                id='telefone'
                value={field.value}
                onChange={(v) => field.onChange(formatPhone(v))}
                placeholder='(11) 91234-5678'
                required
                maxLength={16}
                isValid={errors.telefone ? false : field.value.length > 0}
                errorMessage={errors.telefone?.message}
              />
            )}
          />
        </FormField>

        <BtnAcao
          type='submit'
          id='botao-enviar'
          disabled={isSubmitting}
          className='w-full mt-[15px] text-lg '
        >
          {isSubmitting ? (isEditMode ? 'SALVANDO...' : 'ENVIANDO...') : isEditMode ? 'SALVAR' : 'ENVIAR'}
        </BtnAcao>
      </form>

      <BtnAcao
        type='button'
        id='botao-nao-cadastrar'
        onClick={() => navigate(isEditMode ? '/perfil' : '/')}
        className='w-full mt-2.5 text-lg bg-gray-300 text-fontTertiary hover:bg-gray-400'
      >
        {isEditMode ? 'Cancelar' : 'Não quero me cadastrar'}
      </BtnAcao>

      {errorMessage && (
        <div
          id='mensagem-erro'
          className='mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-center '
        >
          {errorMessage}
        </div>
      )}
    </main>
  );
}
