import BtnAcao from '@/components/Button/BtnAcao';
import FormField from '@/components/Form/FormField';
import InputField from '@/components/Form/InputField';
import type { LoginFormData } from '@/types/form';
import { setLoggedUser } from '@/utils/userStorage';
import { formatCPF, validateCPF } from '@/utils/validators';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

/**
 * Formulário de Login
 * Permite acesso à aplicação usando CPF e data de nascimento
 */
export default function FormLogin() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    mode: 'onTouched',
    defaultValues: {
      cpf: '',
      dataNascimento: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage('');
    const onlyDigits = (v: any = '') => String(v ?? '').replace(/\D/g, '');

    try {
      const birthIso =
        /^\d{4}-\d{2}-\d{2}$/.test(data.dataNascimento) ||
        !data.dataNascimento
          ? data.dataNascimento
          : new Date(data.dataNascimento).toISOString().split('T')[0];

      const payload = {
        cpf: onlyDigits(data.cpf),
        passwordDate: birthIso,
      };

      console.log('Login payload:', payload);

      const res = await fetch('https://luma-wu46.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let responseData: any = null;
      try {
        responseData = JSON.parse(text);
      } catch {
        responseData = null;
      }
      console.log('Login response status:', res.status, 'body:', text);

      if (!res.ok) {
        const msg =
          (responseData && (responseData.message || responseData.error)) ||
          (res.status === 401 ? 'Credenciais inválidas.' : 'Erro ao autenticar.');
        setErrorMessage(msg);
        return;
      }

      const token = responseData?.token || responseData?.accessToken;
      if (token) {
        localStorage.setItem('token', token);
      }
      setLoggedUser(payload.cpf);

      reset();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Erro de conexão. Tente novamente.');
    }
  };

  return (
    <main>
      <h1 className='text-center mb-5 text-fontPrimary text-2xl font-bold'>Acesse suconta</h1>
      <form id='form-login' onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
                onChange={(v: any) => {
                  const val = typeof v === 'string' ? v : v?.target?.value ?? '';
                  field.onChange(formatCPF(val));
                }}
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
                onChange={(v: any) => {
                  const val = typeof v === 'string' ? v : v?.target?.value ?? '';
                  field.onChange(val);
                }}
                required
                min='1900-01-01'
                max={new Date().toISOString().split('T')[0]}
                isValid={errors.dataNascimento ? false : !!field.value}
                errorMessage={errors.dataNascimento?.message}
              />
            )}
          />
        </FormField>

        <BtnAcao
          type='submit'
          id='botao-login-enviar'
          disabled={isSubmitting}
          className='w-full mt-[15px] text-lg'
        >
          {isSubmitting ? 'ENTRANDO...' : 'ENTRAR'}
        </BtnAcao>
      </form>

      <BtnAcao
        type='button'
        id='botao-login-limpar'
        onClick={() => reset()}
        className='w-full mt-[10px] text-lg'
      >
        LIMPAR
      </BtnAcao>

      {errorMessage && (
        <div
          id='mensagem-erro-login'
          className='mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-center'
        >
          {errorMessage}
        </div>
      )}
    </main>
  );
}