import {ButtonHTMLAttributes, forwardRef} from 'react';
import Spinner from '@components/Spinner/Spinner';
import {cn} from '@utils/cn';

export type IButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: IButtonVariant;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: string;
}

const variantStyles: Record<IButtonVariant, {base: string; hover: string; active?: string; disabled: string}> = {
    primary: {
        base: 'bg-brand-green text-white',
        hover: 'hover:bg-brand-green-dark',
        active: 'active:bg-brand-green-dark',
        disabled: 'bg-surface-border text-ink-tertiary cursor-not-allowed',
    },
    secondary: {
        base: 'border border-surface-border text-ink bg-white',
        hover: 'hover:bg-surface-secondary',
        active: 'active:bg-brand-green-dark',
        disabled: 'border border-surface-border text-ink-tertiary bg-white cursor-not-allowed',
    },
    ghost: {
        base: 'text-ink',
        hover: 'hover:text-ink-secondary',
        active: 'active:bg-brand-green-dark',
        disabled: 'text-ink-tertiary cursor-not-allowed',
    },
};

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
    ({variant = 'primary', loading, fullWidth, icon, children, className, ...props}, ref) => {
        const isDisabled = props.disabled || loading;
        const styles = variantStyles[variant];

        return (
            <button
                ref={ref}
                disabled={isDisabled}
                className={cn(
                    'inline-flex items-center justify-center rounded-xl font-text font-semibold text-base transition-colors duration-150 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green',
                    'h-[52px] px-6',
                    fullWidth && 'w-full',
                    loading
                        ? 'bg-brand-green text-white cursor-not-allowed opacity-90'
                        : isDisabled
                          ? styles.disabled
                          : cn(styles.base, styles.hover, styles.active),
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
