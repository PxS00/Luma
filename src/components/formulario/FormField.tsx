import React from 'react';

// Props do campo de formulário
type FormFieldProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function FormField({ label, required = false, children, className = '' }: FormFieldProps) {
  return (
    <div className={`${className}`}>
      <label className='block my-[10px_0_4px] text-lg text-fontPrimary font-atkinson'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>
      {children}
    </div>
  );
}
