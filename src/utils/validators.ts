/**
 * Aplica máscara de CPF no formato 000.000.000-00
 * @param cpf - string contendo apenas números ou com caracteres
 * @returns CPF formatado ou valor limpo se incompleto
 * @example formatCPF('12345678901') => '123.456.789-01'
 */
export function formatCPF(cpf: string): string {
  const cleanCPF = cpf.replace(/\D/g, '');
  // Limita a 11 dígitos para evitar entrada excessiva
  const limitedCPF = cleanCPF.slice(0, 11);
  if (limitedCPF.length < 11) return limitedCPF;
  return limitedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Valida se o CPF é válido conforme regras oficiais.
 * @param cpf - string contendo CPF
 * @returns true se válido, false se inválido
 */
export function validateCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) return false;
  // Verifica se todos os dígitos são iguais (caso inválido)
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  let sum = 0;
  // Calcula o primeiro dígito verificador
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  // Compara o resultado com o primeiro dígito verificador
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
  sum = 0;
  // Calcula o segundo dígito verificador
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  // Compara o resultado com o segundo dígito verificador
  if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
  return true;
}

/**
 * Aplica máscara de telefone brasileiro (com ou sem 9).
 * @param phone - string contendo apenas números ou com caracteres
 * @returns Telefone formatado ou valor limpo se incompleto
 * @example formatPhone('11912345678') => '(11) 91234-5678'
 */
export function formatPhone(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  // Limita a 11 dígitos (DDD + número com 8/9 dígitos)
  const limitedPhone = cleanPhone.slice(0, 11);
  if (limitedPhone.length < 10) return limitedPhone;
  // Aplica máscara para telefones com 8 ou 9 dígitos no número
  if (limitedPhone.length === 10) {
    return limitedPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (limitedPhone.length === 11) {
    return limitedPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
    // Não deve chegar aqui por causa do slice acima, mas retorna o valor limpo
    return limitedPhone;
  }
}

/**
 * Valida se o telefone possui pelo menos 10 dígitos.
 * @param phone - string contendo telefone
 * @returns true se válido, false se inválido
 */
export function validatePhone(phone: string): boolean {
  // Remove caracteres não numéricos e verifica se possui exatamente 11 dígitos
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length === 11;
}
