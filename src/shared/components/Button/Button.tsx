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
        base: 'bg-brand text-white',
        hover: 'hover:bg-brand-dark',
        active: 'active:bg-brand-dark',
        disabled: 'bg-stroke text-fg-disabled cursor-not-allowed',
    },
    secondary: {
        base: 'border border-stroke text-fg-primary bg-white',
        hover: 'hover:bg-surface',
        active: 'active:bg-brand-dark',
        disabled: 'border border-stroke text-fg-disabled bg-white cursor-not-allowed',
    },
    ghost: {
        base: 'text-fg-primary',
        hover: 'hover:text-fg-secondary',
        active: 'active:bg-brand-dark',
        disabled: 'text-fg-disabled cursor-not-allowed',
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
                    'inline-flex items-center justify-center rounded-xl font-text font-semibold text-base transition-colors duration-150 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                    'h-[52px] px-6',
                    fullWidth && 'w-full',
                    loading
                        ? 'bg-brand text-white cursor-not-allowed opacity-90'
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
