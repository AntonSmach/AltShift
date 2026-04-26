import {forwardRef, TextareaHTMLAttributes, useId} from 'react';
import {cn} from '@utils/cn';
import './FormTextarea.css';

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
            <div className='form-textarea-wrapper'>
                <label htmlFor={inputId} className='form-textarea-label'>
                    {label}
                    {props.required && <b className='form-textarea-required'>*</b>}
                </label>
                <textarea
                    ref={ref}
                    id={inputId}
                    className={cn('form-textarea', hasError && 'form-textarea--error')}
                    {...props}
                />
                <div className='form-textarea-footer'>
                    {props.maxLength !== undefined && (
                        <span className={cn('form-textarea-counter', hasError && 'form-textarea-counter--error')}>
                            {currentLength}/{props.maxLength}
                        </span>
                    )}
                    <span className='form-textarea-error-msg'>{hasError && errorMessage ? errorMessage : ''}</span>
                </div>
            </div>
        );
    },
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
