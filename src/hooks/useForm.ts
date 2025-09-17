import { useState, useCallback } from 'react';
import type { FormData, FormValidation } from '@/types/form';

// Hook para gerenciar estado e validação do formulário
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

  //Valida formato do CPF
  const validateCPF = useCallback((cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) return false;
    
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
    
    return true;
  }, []);

  //Formata CPF com máscara
  const formatCPF = useCallback((cpf: string): string => {
    const cleanCPF = cpf.replace(/\D/g, '');
    return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }, []);

  //Formata telefone com máscara
  const formatPhone = useCallback((phone: string): string => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length <= 10) {
      return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  }, []);

  //Atualiza um campo do formulário
  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      setValidation(prevValidation => {
        const newValidation = { ...prevValidation };
        switch (field) {
          case 'nome':
            newValidation.nome = value.trim().length >= 2;
            break;
          case 'cpf':
            newValidation.cpf = validateCPF(value);
            break;
          case 'dataNascimento':
            newValidation.dataNascimento = value !== '';
            break;
          case 'telefone':
            newValidation.telefone = value.replace(/\D/g, '').length >= 10;
            break;
          case 'email':
            if (value === '') {
              newValidation.email = true;
            } else {
              newValidation.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            }
            break;
        }
        return newValidation;
      });
      
      return newData;
    });
  }, [validateCPF]);

  //Verifica se o formulário está válido para envio
  const isFormValid = useCallback((): boolean => {
    return (
      validation.nome &&
      validation.cpf &&
      validation.dataNascimento &&
      validation.telefone &&
      validation.email 
    );
  }, [validation]);

  //Reseta o formulário
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
    updateField,
    isFormValid,
    resetForm,
    formatCPF,
    formatPhone,
  };
}
