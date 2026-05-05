import {FC, memo, MouseEvent} from 'react';
import Card from '@components/Card/Card';
import GoalBanner from '@components/GoalBanner/GoalBanner';
import IconButton from '@components/IconButton/IconButton';
import {IApplication} from '@models/interfaces/application.interface';
import {CardAction} from '@pages/ApplicationsPage/enums/card-action.enum';
import './ApplicationsList.css';

interface IApplicationsListProps {
    applications: IApplication[];
    goal: number;
    goalReached: boolean;
    onCreateNew: () => void;
    onCardAction: (e: MouseEvent) => void;
}

const ApplicationsList: FC<IApplicationsListProps> = memo(
    ({applications, goal, goalReached, onCreateNew, onCardAction}) => (
        <div className='applications-list'>
            <div className='applications-grid' onClick={onCardAction}>
                {applications.map((app) => (
                    <Card
                        key={app.id}
                        data-id={app.id}
                        size='sm'
                        actions={
                            <>
                                <IconButton
                                    startIcon='icon-trash'
                                    label='Delete'
                                    data-action={CardAction.DELETE}
                                    className='card-delete-btn'
                                />
                                <IconButton
                                    endIcon='icon-copy'
                                    label='Copy to clipboard'
                                    data-action={CardAction.COPY}
                                    className='copy-btn'
                                />
                            </>
                        }>
                        {app.generatedLetter}
                    </Card>
                ))}
            </div>
            {!goalReached && <GoalBanner current={applications.length} total={goal} onCreateNew={onCreateNew} />}
        </div>
    ),
);

ApplicationsList.displayName = 'ApplicationsList';

export default ApplicationsList;
