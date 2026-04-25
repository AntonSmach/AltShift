import {ButtonHTMLAttributes, forwardRef} from 'react';
import {Spinner} from '@components/Spinner';
import {cn} from '@utils/cn';

export type IButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: IButtonVariant;
    loading?: boolean;
    fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
    ({variant = 'primary', loading = false, fullWidth = false, className, children, disabled, ...props}, ref) => {
        const isDisabled = disabled || loading;

        return (
            <button
                ref={ref}
                disabled={isDisabled}
                className={cn(
                    'inline-flex items-center justify-center rounded-xl font-text font-semibold text-base transition-colors duration-150 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green',
                    'h-[52px] px-6',
                    {
                        'w-full': fullWidth,
                        'bg-brand-green text-white hover:bg-brand-green-dark active:bg-brand-green-dark':
                            variant === 'primary' && !isDisabled,
                        'bg-surface-border text-ink-tertiary cursor-not-allowed':
                            variant === 'primary' && isDisabled && !loading,
                        'bg-brand-green text-white cursor-not-allowed opacity-90': variant === 'primary' && loading,
                        'border border-surface-border text-ink bg-white hover:bg-surface-secondary':
                            variant === 'secondary' && !isDisabled,
                        'border border-surface-border text-ink-tertiary bg-white cursor-not-allowed':
                            variant === 'secondary' && isDisabled,
                        'text-ink hover:text-ink-secondary': variant === 'ghost',
                    },
                    className,
                )}
                {...props}>
                {loading ? <Spinner className='text-white' /> : children}
            </button>
        );
    },
);
Button.displayName = 'Button';

export {Button};
