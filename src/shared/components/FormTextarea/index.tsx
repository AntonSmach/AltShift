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
                <label htmlFor={inputId} className='font-text text-sm font-medium text-ink'>
                    {label}
                    {props.required && <b className='ml-0.5 text-red-500'>*</b>}
                </label>
                <textarea
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'w-full rounded-xl border bg-white px-4 py-3',
                        'font-text text-base text-ink placeholder:text-ink-tertiary',
                        'outline-none transition-colors duration-150 resize-none',
                        'disabled:cursor-not-allowed disabled:bg-surface-secondary disabled:text-ink-tertiary',
                        hasError
                            ? 'border-red-400 focus:border-red-400'
                            : 'border-surface-border focus:border-brand-green',
                    )}
                    {...props}
                />
                <div className='flex items-start justify-between min-h-[1.25rem]'>
                    {props.maxLength !== undefined && (
                        <span className={cn('font-text text-sm', hasError ? 'text-red-500' : 'text-ink-tertiary')}>
                            {currentLength}/{props.maxLength}
                        </span>
                    )}
                    <span className='font-text text-sm text-red-500'>
                        {hasError && errorMessage ? errorMessage : ''}
                    </span>
                </div>
            </div>
        );
    },
);
FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
