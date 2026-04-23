import {forwardRef, InputHTMLAttributes} from 'react';
import {cn} from '@utils/cn';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    wrapperClassName?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({label, wrapperClassName, id, ...props}, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
            <label htmlFor={inputId} className='font-text text-sm font-medium text-ink'>
                {label}
            </label>
            <input
                ref={ref}
                id={inputId}
                className={cn(
                    'h-11 w-full rounded-xl border border-surface-border bg-white px-4',
                    'font-text text-base text-ink placeholder:text-ink-tertiary',
                    'outline-none transition-colors duration-150',
                    'focus:border-brand-green',
                    'disabled:cursor-not-allowed disabled:bg-surface-secondary disabled:text-ink-tertiary',
                )}
                {...props}
            />
        </div>
    );
});
FormInput.displayName = 'FormInput';

export {FormInput};
