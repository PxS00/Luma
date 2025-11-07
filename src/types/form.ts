/**
 * Dados do formulário de atendimento
 * Utilizado para cadastro de novos usuários
 */
export type CadastroFormData = {
  nome: string;
  cpf: string;
  dataNascimento: string;
  email?: string;
  telefone: string;
};

/**
 * Dados do formulário de login
 * Utilizado para autenticação do usuário
 */
export type LoginFormData = {
  cpf: string;
  dataNascimento: string;
};

export type LoggedUser = {
  cpf: string;
  passwordDate: string;
  id?: string;
};

/**
 * Estado de validação dos campos do formulário
 * Indica se cada campo está válido ou não
 */
export type CadastroFormValidation = {
  nome: boolean;
  cpf: boolean;
  dataNascimento: boolean;
  email: boolean;
  telefone: boolean;
};

/**
 * Propriedades do componente InputField
 * Define os parâmetros aceitos para campos de input
 */
export type InputFieldProps = {
  type: 'text' | 'email' | 'tel' | 'date';
  name: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  min?: string;
  max?: string;
  isValid?: boolean;
  errorMessage?: string;
  className?: string;
};

/**
 * Propriedades do componente FormField
 * Define os parâmetros aceitos para campos de formulário
 */
export type FormFieldProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
};
