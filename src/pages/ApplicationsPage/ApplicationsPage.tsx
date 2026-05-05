import {FC, MouseEvent, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@components/Button/Button';
import {useApplications} from '@context/applications/useApplications';
import {useClipboard} from '@hooks/useClipboard';
import ApplicationsEmpty from './components/ApplicationsEmpty/ApplicationsEmpty';
import ApplicationsList from './components/ApplicationsList/ApplicationsList';
import {CardAction} from '@pages/ApplicationsPage/enums/card-action.enum';
import './ApplicationsPage.css';

const ApplicationsPage: FC = () => {
    const {applications, deleteApplication, goalReached, goal} = useApplications();
    const navigate = useNavigate();
    const {copy} = useClipboard();

    const handleCreateNew = useCallback(() => navigate('/generator'), [navigate]);

    const handleCardAction = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const card = target.closest<HTMLElement>('[data-id]');
        const cardAction = target.closest<HTMLElement>('[data-action]');

        if (!card?.dataset?.id || !cardAction?.dataset.action) return;

        const {id} = card.dataset;
        const {action} = cardAction.dataset;

        if (action === CardAction.DELETE) {
            deleteApplication(id);
        }
        if (action === CardAction.COPY) {
            const application = applications.find((application) => application.id === id);
            application?.generatedLetter && copy(application.generatedLetter);
        }
    };

    return (
        <div className='applications-page'>
            <div className='applications-header'>
                <h1 className='applications-title'>Applications</h1>
                <Button startIcon='icon-plus' size='sm' onClick={handleCreateNew}>
                    <span className='applications-btn-label-full'>Create New</span>
                    <span className='applications-btn-label-short'>New</span>
                </Button>
            </div>
            <div className='applications-divider' />

            {applications.length === 0 ? (
                <ApplicationsEmpty goal={goal} onCreateNew={handleCreateNew} />
            ) : (
                <ApplicationsList
                    applications={applications}
                    goal={goal}
                    goalReached={goalReached}
                    onCreateNew={handleCreateNew}
                    onCardAction={handleCardAction}
                />
            )}
        </div>
    );
};

export default ApplicationsPage;
