import {ButtonHTMLAttributes, forwardRef} from 'react';
import Spinner from '@components/Spinner/Spinner';
import classNames from 'classnames';
import './Button.css';

export type IButtonVariant = 'primary' | 'secondary' | 'ghost';
export type IButtonSize = 'sm' | 'md';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: IButtonVariant;
    size?: IButtonSize;
    loading?: boolean;
    fullWidth?: boolean;
    startIcon?: string;
    endIcon?: string;
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

const sizeClass: Record<IButtonSize, string> = {
    sm: 'btn--sm',
    md: 'btn--md',
};

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
    (
        {variant = 'primary', size = 'md', loading, fullWidth, startIcon, endIcon, children, className, ...props},
        ref,
    ) => {
        const isDisabled = props.disabled || loading;

        return (
            <button
                ref={ref}
                disabled={isDisabled}
                className={classNames(
                    'btn',
                    sizeClass[size],
                    fullWidth && 'btn--full',
                    loading ? 'btn--loading' : isDisabled ? variantDisabledClass[variant] : variantClass[variant],
                    className,
                )}
                {...props}>
                {loading ? (
                    <Spinner className='text-white' />
                ) : (
                    <>
                        {startIcon && <i className={startIcon} />}
                        {children}
                        {endIcon && <i className={endIcon} />}
                    </>
                )}
            </button>
        );
    },
);

Button.displayName = 'Button';

export default Button;
