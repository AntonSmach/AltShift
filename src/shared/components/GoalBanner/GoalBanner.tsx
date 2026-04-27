import {FC, memo} from 'react';
import ProgressDots from '@components/ProgressDots/ProgressDots';
import Button from '@components/Button/Button';
import './GoalBanner.css';

interface IGoalBannerProps {
    current: number;
    total: number;
    onCreateNew: () => void;
}

const GoalBanner: FC<IGoalBannerProps> = memo(({current, total, onCreateNew}) => (
    <div className='goal-banner'>
        <div>
            <h2 className='goal-banner-title'>Hit your goal</h2>
            <p className='goal-banner-subtitle'>
                Generate and send out couple more job applications today to get hired faster
            </p>
        </div>
        <Button startIcon='icon-plus' size='md' onClick={onCreateNew}>
            Create New
        </Button>
        <div className='goal-banner-progress'>
            <ProgressDots current={current} total={total} />
            <span className='goal-banner-count'>
                {current} out of {total}
            </span>
        </div>
    </div>
));

GoalBanner.displayName = 'GoalBanner';

export default GoalBanner;
