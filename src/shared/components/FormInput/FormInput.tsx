import {forwardRef, InputHTMLAttributes, useId} from 'react';
import {cn} from '@utils/cn';

export interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    hasError?: boolean;
    errorMessage?: string;
}

const FormInput = forwardRef<HTMLInputElement, IFormInputProps>(
    ({label, hasError, errorMessage, id, ...props}, ref) => {
        const generatedId = useId();
        const inputId = id || generatedId;

        return (
            <div className='flex flex-col gap-1.5'>
                <label htmlFor={inputId} className='font-text text-sm font-medium text-ink'>
                    {label}
                    {props.required && <b className='ml-0.5 text-red-500'>*</b>}
                </label>
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'h-11 w-full rounded-xl border bg-white px-4',
                        'font-text text-base text-ink placeholder:text-ink-tertiary',
                        'outline-none transition-colors duration-150',
                        'disabled:cursor-not-allowed disabled:bg-surface-secondary disabled:text-ink-tertiary',
                        hasError
                            ? 'border-red-400 focus:border-red-400'
                            : 'border-surface-border focus:border-brand-green',
                    )}
                    {...props}
                />
                <div className='min-h-[1.25rem]'>
                    {hasError && errorMessage && (
                        <span className='font-text text-sm text-red-500'>{errorMessage}</span>
                    )}
                </div>
            </div>
        );
    },
);
FormInput.displayName = 'FormInput';

export {FormInput};
