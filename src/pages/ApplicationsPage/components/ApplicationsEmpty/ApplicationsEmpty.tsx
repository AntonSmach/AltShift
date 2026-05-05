import {FC, memo} from 'react';
import GoalBanner from '@components/GoalBanner/GoalBanner';
import './ApplicationsEmpty.css';

interface IApplicationsEmptyProps {
    goal: number;
    onCreateNew: () => void;
}

const ApplicationsEmpty: FC<IApplicationsEmptyProps> = memo(({goal, onCreateNew}) => (
    <div className='applications-empty'>
        <GoalBanner current={0} total={goal} onCreateNew={onCreateNew} />
    </div>
));

ApplicationsEmpty.displayName = 'ApplicationsEmpty';

export default ApplicationsEmpty;
