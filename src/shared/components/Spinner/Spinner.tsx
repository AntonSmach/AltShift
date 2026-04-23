import {FC} from 'react';
import {cn} from '@utils/cn';

interface SpinnerProps {
    className?: string;
    size?: number;
}

const Spinner: FC<SpinnerProps> = ({className, size = 20}) => (
    <svg
        className={cn('animate-spin', className)}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        width={size}
        height={size}>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='3' />
        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
    </svg>
);

Spinner.displayName = 'Spinner';

export default Spinner;
