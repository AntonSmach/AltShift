import {forwardRef, TextareaHTMLAttributes, useId} from 'react';
import {cn} from '@utils/cn';

export interface IFormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    hasError?: boolean;
    errorMessage?: string;
    currentLength?: number;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, IFormTextareaProps>(
    ({label, hasError, errorMessage, currentLength = 0, id, ...props}, ref) => {
        const generatedId = useId();
        const inputId = id || generatedId;

        return (
            <div className='flex flex-col gap-1.5'>
                <label htmlFor={inputId} className='font-text text-sm font-medium text-fg-primary'>
                    {label}
                    {props.required && <b className='ml-0.5 text-fg-error'>*</b>}
                </label>
                <textarea
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'w-full rounded-xl border bg-white px-4 py-3',
                        'font-text text-base text-fg-primary placeholder:text-fg-muted',
                        'outline-none transition-colors duration-150 resize-none',
                        'disabled:cursor-not-allowed disabled:bg-surface disabled:text-fg-disabled',
                        hasError ? 'border-stroke-error focus:border-stroke-error' : 'border-stroke focus:border-brand',
                    )}
                    {...props}
                />
                <div className='flex items-start justify-between min-h-[1.25rem]'>
                    {props.maxLength !== undefined && (
                        <span className={cn('font-text text-sm', hasError ? 'text-fg-error' : 'text-fg-muted')}>
                            {currentLength}/{props.maxLength}
                        </span>
                    )}
                    <span className='font-text text-sm text-fg-error'>
                        {hasError && errorMessage ? errorMessage : ''}
                    </span>
                </div>
            </div>
        );
    },
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
