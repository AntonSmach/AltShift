import {ButtonHTMLAttributes, forwardRef} from 'react';
import {cn} from '@utils/cn';
import './IconButton.css';

export interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
    label: string;
}

const IconButton = forwardRef<HTMLButtonElement, IIconButtonProps>(({icon, label, className, ...props}, ref) => (
    <button ref={ref} type='button' className={cn('icon', className)} {...props}>
        <i className={cn(icon, 'icon-btn')} />
        {label}
    </button>
));

IconButton.displayName = 'IconButton';

export default IconButton;
