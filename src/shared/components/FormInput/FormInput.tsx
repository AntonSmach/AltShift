import {forwardRef, InputHTMLAttributes, useId} from 'react';
import classNames from 'classnames';
import './FormInput.css';

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
            <div className='form-input-wrapper'>
                <label htmlFor={inputId} className='form-input-label'>
                    {label}
                    {props.required && <b className='form-input-required'>*</b>}
                </label>
                <input
                    ref={ref}
                    id={inputId}
                    className={classNames('form-input', hasError && 'form-input--error')}
                    {...props}
                />
                <div className='form-input-hint'>
                    {hasError && errorMessage && <span className='form-input-error-msg'>{errorMessage}</span>}
                </div>
            </div>
        );
    },
);

FormInput.displayName = 'FormInput';

export default FormInput;
