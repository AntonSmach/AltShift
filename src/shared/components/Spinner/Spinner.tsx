import {FC} from 'react';
import classNames from 'classnames';

interface ISpinnerProps {
    className?: string;
    size?: number;
}

const Spinner: FC<ISpinnerProps> = ({className, size = 20}) => (
    <i className={classNames('icon-spinner animate-spin', className)} style={{fontSize: size}} />
);

export default Spinner;
