import {FC} from 'react';
import classNames from 'classnames';

interface IProgressDotsProps {
    current: number;
    total: number;
    variant?: 'bar' | 'dot';
    className?: string;
}

const ProgressDots: FC<IProgressDotsProps> = ({current, total, variant = 'bar', className}) => (
    <div className={classNames('flex items-center gap-1', className)}>
        {Array.from({length: total}, (_, i) => (
            <span
                key={i}
                className={classNames(
                    'rounded-full transition-colors duration-300',
                    variant === 'bar' ? 'h-2 w-8' : 'h-2 w-2',
                    i < current ? 'bg-fg-primary' : 'bg-stroke',
                )}
            />
        ))}
    </div>
);

export default ProgressDots;
