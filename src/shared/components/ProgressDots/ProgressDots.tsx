import {FC} from 'react';
import {cn} from '@utils/cn';

interface ProgressDotsProps {
    current: number;
    total: number;
    className?: string;
}

const ProgressDots: FC<ProgressDotsProps> = ({current, total, className}) => (
    <div className={cn('flex items-center gap-1.5', className)}>
        {Array.from({length: total}, (_, i) => (
            <span
                key={i}
                className={cn('h-1 w-6 rounded-full transition-colors duration-300', {
                    'bg-ink': i < current,
                    'bg-surface-border': i >= current,
                })}
            />
        ))}
    </div>
);

ProgressDots.displayName = 'ProgressDots';

export {ProgressDots};
