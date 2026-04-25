import {FC} from 'react';
import {cn} from '@utils/cn';

interface ISpinnerProps {
    className?: string;
    size?: number;
}

const Spinner: FC<ISpinnerProps> = ({className, size = 20}) => (
    <i className={cn('icon-spinner animate-spin', className)} style={{fontSize: size}} />
);

Spinner.displayName = 'Spinner';

export default Spinner;
