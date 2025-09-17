
// Props do campo de input
type InputFieldProps = {
  type: 'text' | 'email' | 'tel' | 'date';
  name: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  isValid?: boolean;
  errorMessage?: string;
  className?: string;
};

// Componente de campo de input com validação visual
export default function InputField({
  type,
  name,
  id,
  value,
  onChange,
  placeholder,
  required = false,
  maxLength,
  isValid,
  errorMessage,
  className = ''
}: InputFieldProps) {
  const getInputClasses = () => {
    const base = 'w-full p-2 rounded-[5px] border border-gray-300 bg-[#FFF8E1] text-xl text-fontTertiary font-atkinson focus:outline-none focus:ring-2 focus:ring-backBtn';

    if (type === 'email' && value === '') {
      return base;
    }
    
    if (isValid === false && value) {
      return `${base} border-red-500 focus:ring-red-500`;
    } else if (isValid === true && value) {
      return `${base} border-green-500 focus:ring-green-500`;
    }
    
    return base;
  };

  return (
    <div className={className}>
      {type === 'text' && name === 'cpf' ? (
        <div className='campo-validacao relative'>
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            maxLength={maxLength}
            className={`${getInputClasses()} pr-[30px]`}
          />
        </div>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={getInputClasses()}
        />
      )}
      {errorMessage && (
        <p className='text-red-500 text-sm mt-1'>{errorMessage}</p>
      )}
    </div>
  );
}
