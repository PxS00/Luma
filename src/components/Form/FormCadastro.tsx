import BtnAcao from '@/components/Button/BtnAcao';
import FormField from '@/components/Form/FormField';
import InputField from '@/components/Form/InputField';
import type { CadastroFormData } from '@/types/form';
import { saveUserToStorage, setLoggedUser } from '@/utils/userStorage';
import validators from '@/utils/validators';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

/**
 * Formulário de Atendimento
 * Coleta dados do usuário para cadastro prévio
 */
export default function FormCadastro() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

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

  // Manipula o envio do formulário
  const onSubmit = (data: CadastroFormData) => {
    setErrorMessage('');
    try {
      // Salva novo usuário usando utilitário
      saveUserToStorage(data);
      setLoggedUser(data.cpf);
      reset();
      navigate('/');
    } catch (error) {
      // Registra o erro para depuração
      console.error('Erro ao salvar cadastro:', error);
      setErrorMessage('Não foi possível realizar o cadastro. Por favor, tente novamente.');
    }
  };

  // Manipula a limpeza do formulário
  const handleClear = () => {
    reset();
  };

  return (
    <main>
      <h1 className='text-center mb-5 text-fontPrimary text-2xl font-bold '>
        Registre seu Cadastro
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

        <FormField label='E-mail'>
          <Controller
            name='email'
            control={control}
            rules={{
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
                onChange={(v) => field.onChange(validators.formatPhone(v))}
                placeholder='(11) 91234-5678'
                required
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
          {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
        </BtnAcao>
      </form>

      <BtnAcao
        type='button'
        id='botao-cadastro-limpar'
        onClick={handleClear}
        className='w-full mt-[10px] text-lg '
      >
        LIMPAR
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
