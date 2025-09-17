import { useState, useCallback } from 'react';
import type { FormData, FormValidation } from '@/types/form';

// Hook para gerenciar estado do formulário
export function useForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    telefone: '',
  });

  const [validation, setValidation] = useState<FormValidation>({
    nome: false,
    cpf: false,
    dataNascimento: false,
    email: true,
    telefone: false,
  });

  // Reseta o formulário
  const resetForm = useCallback(() => {
    setFormData({
      nome: '',
      cpf: '',
      dataNascimento: '',
      email: '',
      telefone: '',
    });
    setValidation({
      nome: false,
      cpf: false,
      dataNascimento: false,
      email: true,
      telefone: false,
    });
  }, []);

  return {
    formData,
    validation,
    resetForm,
  };
}
