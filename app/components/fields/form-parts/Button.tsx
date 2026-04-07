interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseClass = 'font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClass = {
    primary: 'bg-[#48546A] hover:bg-[#3a3f52] text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    outline:
      'border border-[#48546A] text-[#48546A] hover:bg-slate-50',
  };

  const sizeClass = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg w-full',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass[variant]} ${sizeClass[size]} ${widthClass} ${className}`}
    >
      {label}
    </button>
  );
}
