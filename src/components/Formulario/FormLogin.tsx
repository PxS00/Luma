import BtnAcao from '@/components/Botao/BtnAcao';
import FormField from '@/components/Formulario/FormField';
import InputField from '@/components/Formulario/InputField';
import type { FormData, LoginFormData } from '@/types/form';
import validators from '@/utils/validators';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// Removed duplicate definition of LoginFormData

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

  const onSubmit = (data: LoginFormData) => {
    setErrorMessage('');
    try {
      // Recupera cadastros do localStorage
      const cadastrosStr = localStorage.getItem('cadastrosLumaHC');
      if (!cadastrosStr) {
        setErrorMessage('Nenhum usuário cadastrado encontrado.');
        return;
      }

      const cadastros = JSON.parse(cadastrosStr);

      // Verifica se existe usuário com CPF e data de nascimento
      const usuarioEncontrado = cadastros.find(
        (cadastro: FormData) =>
          cadastro.cpf === data.cpf && cadastro.dataNascimento === data.dataNascimento
      );

      if (usuarioEncontrado) {
        reset();
        navigate('/');
      } else {
        setErrorMessage('CPF ou data de nascimento incorretos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Erro ao fazer login. Tente novamente.');
    }
  };

  const handleCancel = () => {
    if (window.confirm('Deseja cancelar o login?')) {
      reset();
      navigate('/');
    }
  };

  return (
    <main>
      <h1 className='text-center mb-5 text-fontPrimary text-2xl font-bold font-atkinson'>
        Acesse sua conta
      </h1>
      <form id='form-login' onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <FormField label='CPF' required>
          <Controller
            name='cpf'
            control={control}
            rules={{
              required: 'CPF é obrigatório',
              validate: (value) => validators.validateCPF(value) || 'CPF inválido',
            }}
            render={({ field }) => (
              <InputField
                type='text'
                name='cpf'
                id='cpf'
                value={field.value}
                onChange={(v) => field.onChange(validators.formatCPF(v))}
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
          className='w-full mt-[15px] text-lg font-atkinson'
        >
          {isSubmitting ? 'ENTRANDO...' : 'ENTRAR'}
        </BtnAcao>
      </form>

      <BtnAcao
        type='button'
        id='botao-login-cancelar'
        onClick={handleCancel}
        className='w-full mt-[10px] text-lg font-atkinson'
      >
        CANCELAR
      </BtnAcao>

      {errorMessage && (
        <div
          id='mensagem-erro-login'
          className='mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-center font-atkinson'
        >
          {errorMessage}
        </div>
      )}
    </main>
  );
}
