import {FC} from 'react';
import {cn} from '@utils/cn';

interface IProgressDotsProps {
    current: number;
    total: number;
    variant?: 'bar' | 'dot';
    className?: string;
}

const ProgressDots: FC<IProgressDotsProps> = ({current, total, variant = 'bar', className}) => (
    <div className={cn('flex items-center gap-1.5', className)}>
        {Array.from({length: total}, (_, i) => (
            <span
                key={i}
                className={cn(
                    'rounded-full transition-colors duration-300',
                    variant === 'bar' ? 'h-1 w-6' : 'h-2 w-2',
                    i < current ? 'bg-fg-primary' : 'bg-stroke',
                )}
            />
        ))}
    </div>
);

export default ProgressDots;
