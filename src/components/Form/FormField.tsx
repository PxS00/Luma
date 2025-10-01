import type { FormFieldProps } from '@/types/form';

/**
 * Campo de formulário reutilizável com label
 * Encapsula label, indicação de obrigatório e conteúdo do campo
 */
export default function FormField({
  label,
  required = false,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`${className}`}>
      <label className='block my-[10px_0_4px] text-lg text-fontPrimary '>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>
      {children}
    </div>
  );
}
