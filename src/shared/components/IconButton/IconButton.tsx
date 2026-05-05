import {ButtonHTMLAttributes, forwardRef} from 'react';
import classNames from 'classnames';
import './IconButton.css';

export interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    startIcon?: string;
    endIcon?: string;
}

const IconButton = forwardRef<HTMLButtonElement, IIconButtonProps>(
    ({label, startIcon, endIcon, className, ...props}, ref) => (
        <button ref={ref} type='button' className={classNames('icon-btn', className)} {...props}>
            {startIcon && <i className={classNames(startIcon, 'icon-btn-icon')} />}
            {label}
            {endIcon && <i className={classNames(endIcon, 'icon-btn-icon')} />}
        </button>
    ),
);

IconButton.displayName = 'IconButton';

export default IconButton;
