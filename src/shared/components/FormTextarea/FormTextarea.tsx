import {forwardRef, TextareaHTMLAttributes} from 'react';
import {cn} from '@utils/cn';

export interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    maxChars?: number;
    currentLength?: number;
    wrapperClassName?: string;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    ({label, maxChars, currentLength = 0, wrapperClassName, id, ...props}, ref) => {
        const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
        const isOverLimit = maxChars !== undefined && currentLength > maxChars;

        return (
            <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
                <label htmlFor={inputId} className='font-text text-sm font-medium text-ink'>
                    {label}
                </label>
                <textarea
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'w-full rounded-xl border bg-white px-4 py-3',
                        'font-text text-base text-ink placeholder:text-ink-tertiary',
                        'outline-none transition-colors duration-150 resize-none',
                        {
                            'border-red-400 focus:border-red-400': isOverLimit,
                            'border-surface-border focus:border-brand-green': !isOverLimit,
                        },
                    )}
                    {...props}
                />
                {maxChars !== undefined && (
                    <span
                        className={cn('font-text text-sm self-start', {
                            'text-red-500': isOverLimit,
                            'text-ink-tertiary': !isOverLimit,
                        })}>
                        {currentLength}/{maxChars}
                    </span>
                )}
            </div>
        );
    },
);
FormTextarea.displayName = 'FormTextarea';

export {FormTextarea};
