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
                <label htmlFor={inputId} className='font-text text-sm font-medium text-fg-primary'>
                    {label}
                    {props.required && <b className='ml-0.5 text-fg-error'>*</b>}
                </label>
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'h-11 w-full rounded-xl border bg-white px-4',
                        'font-text text-base text-fg-primary placeholder:text-fg-muted',
                        'outline-none transition-colors duration-150',
                        'disabled:cursor-not-allowed disabled:bg-surface disabled:text-fg-disabled',
                        hasError ? 'border-stroke-error focus:border-stroke-error' : 'border-stroke focus:border-brand',
                    )}
                    {...props}
                />
                <div className='min-h-[1.25rem]'>
                    {hasError && errorMessage && (
                        <span className='font-text text-sm text-fg-error'>{errorMessage}</span>
                    )}
                </div>
            </div>
        );
    },
);

FormInput.displayName = 'FormInput';

export default FormInput;
