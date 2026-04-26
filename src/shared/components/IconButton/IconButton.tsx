import {ButtonHTMLAttributes, forwardRef} from 'react';
import {cn} from '@utils/cn';

export interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
    label: string;
}

const IconButton = forwardRef<HTMLButtonElement, IIconButtonProps>(({icon, label, className, ...props}, ref) => (
    <button
        ref={ref}
        type='button'
        className={cn(
            'inline-flex items-center gap-1.5 font-text text-sm transition-colors duration-150 rounded cursor-pointer',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
            className,
        )}
        {...props}>
        <i className={cn(icon, 'text-sm')} />
        {label}
    </button>
));

IconButton.displayName = 'IconButton';

export default IconButton;
