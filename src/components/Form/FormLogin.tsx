import BtnAcao from '@/components/Button/BtnAcao';
import FormField from '@/components/Form/FormField';
import InputField from '@/components/Form/InputField';
import type { CadastroFormData, LoginFormData } from '@/types/form';
import { getUsersFromStorage, setLoggedUser } from '@/utils/userStorage';
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
    try {
      // Recupera cadastros usando utilitário
      const cadastros = getUsersFromStorage();
      if (!cadastros.length) {
        setErrorMessage('Nenhum usuário cadastrado encontrado.');
        return;
      }

      // Verifica se existe usuário com CPF e data de nascimento
      const usuarioEncontrado = cadastros.find(
        (cadastro: CadastroFormData) =>
          cadastro.cpf === data.cpf && cadastro.dataNascimento === data.dataNascimento
      );

      if (usuarioEncontrado) {
        setLoggedUser(usuarioEncontrado.cpf);
        reset();
        // Navegação com mensagem de sucesso implícita
        navigate('/', {
          replace: true,
          state: { message: `Bem-vindo(a), ${usuarioEncontrado.nome}!` },
        });
      } else {
        setErrorMessage('CPF ou data de nascimento incorretos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <main>
      <h1 className='text-center mb-5 text-fontPrimary text-2xl font-bold'>Acesse sua conta</h1>
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
                onChange={(v) => field.onChange(formatCPF(v))}
                placeholder='000.000.000-00'
                required
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
            rules={{ required: 'Data de nascimento é obrigatória' }}
            render={({ field }) => (
              <InputField
                type='date'
                name='dataNascimento'
                id='dataNascimento'
                value={field.value}
                onChange={field.onChange}
                required
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
