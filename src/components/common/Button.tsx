import { forwardRef } from 'react';
import { type LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly icon?: LucideIcon;
  readonly children: React.ReactNode;
  readonly loading?: boolean;
}

const buttonVariants = {
  primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary-light',
  secondary: 'bg-accent text-primary hover:bg-accent-light focus:ring-accent',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary-light',
  ghost: 'text-primary hover:bg-primary/10 focus:ring-primary-light',
  danger: 'bg-danger text-white hover:bg-red-700 focus:ring-red-400',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-8 py-3.5 text-base gap-2.5',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', icon: Icon, children, loading, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          'cursor-pointer',
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : Icon ? (
          <Icon size={18} aria-hidden="true" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
