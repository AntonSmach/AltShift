import {ButtonHTMLAttributes, forwardRef} from 'react';
import Spinner from '@components/Spinner/Spinner';
import {cn} from '@utils/cn';
import './Button.css';

export type IButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: IButtonVariant;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: string;
}

const variantClass: Record<IButtonVariant, string> = {
    primary: 'btn--primary',
    secondary: 'btn--secondary',
    ghost: 'btn--ghost',
};

const variantDisabledClass: Record<IButtonVariant, string> = {
    primary: 'btn--primary-disabled',
    secondary: 'btn--secondary-disabled',
    ghost: 'btn--ghost-disabled',
};

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
    ({variant = 'primary', loading, fullWidth, icon, children, className, ...props}, ref) => {
        const isDisabled = props.disabled || loading;

        return (
            <button
                ref={ref}
                disabled={isDisabled}
                className={cn(
                    'btn',
                    fullWidth && 'btn--full',
                    loading ? 'btn--loading' : isDisabled ? variantDisabledClass[variant] : variantClass[variant],
                    className,
                )}
                {...props}>
                {loading ? (
                    <Spinner className='text-white' />
                ) : (
                    <>
                        {icon && <i className={cn(icon, 'text-base')} />}
                        {children}
                    </>
                )}
            </button>
        );
    },
);

Button.displayName = 'Button';

export default Button;
