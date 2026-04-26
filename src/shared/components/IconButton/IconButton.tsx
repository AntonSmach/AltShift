import {ButtonHTMLAttributes, forwardRef} from 'react';
import {cn} from '@utils/cn';
import './IconButton.css';

export interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    startIcon?: string;
    endIcon?: string;
}

const IconButton = forwardRef<HTMLButtonElement, IIconButtonProps>(
    ({label, startIcon, endIcon, className, ...props}, ref) => (
        <button ref={ref} type='button' className={cn('icon-btn', className)} {...props}>
            {startIcon && <i className={cn(startIcon, 'icon-btn-icon')} />}
            {label}
            {endIcon && <i className={cn(endIcon, 'icon-btn-icon')} />}
        </button>
    ),
);

IconButton.displayName = 'IconButton';

export default IconButton;
