import {FC, memo} from 'react';
import ProgressDots from '@components/ProgressDots/ProgressDots';
import Button from '@components/Button/Button';

interface IGoalBannerProps {
    current: number;
    total: number;
    onCreateNew: () => void;
}

const GoalBanner: FC<IGoalBannerProps> = memo(({current, total, onCreateNew}) => (
    <div className='flex flex-col items-center gap-4 rounded-2xl bg-brand-green-light px-6 py-8 text-center'>
        <div>
            <h2 className='font-display text-2xl font-bold text-ink'>Hit your goal</h2>
            <p className='mt-1 font-text text-sm text-ink-secondary'>
                Generate and send out couple more job applications today to get hired faster
            </p>
        </div>
        <Button icon='icon-plus' onClick={onCreateNew} className='gap-1.5'>
            Create New
        </Button>
        <div className='flex flex-col items-center gap-1.5'>
            <ProgressDots current={current} total={total} />
            <span className='font-text text-sm text-ink-tertiary'>
                {current} out of {total}
            </span>
        </div>
    </div>
));

GoalBanner.displayName = 'GoalBanner';

export default GoalBanner;
