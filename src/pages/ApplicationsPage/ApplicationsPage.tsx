import {FC, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import ApplicationCard from '@components/ApplicationCard/ApplicationCard';
import GoalBanner from '@components/GoalBanner/GoalBanner';
import Button from '@components/Button/Button';
import {useApplications} from '@context/applications/useApplications';
import './ApplicationsPage.css';

const ApplicationsPage: FC = () => {
    const {applications, deleteApplication, goalReached, goal} = useApplications();
    const navigate = useNavigate();

    const handleCreateNew = useCallback(() => navigate('/generator'), [navigate]);

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
                <div className='applications-empty'>
                    <GoalBanner current={0} total={goal} onCreateNew={handleCreateNew} />
                </div>
            ) : (
                <div className='applications-list'>
                    <div className='applications-grid'>
                        {applications.map((app) => (
                            <ApplicationCard key={app.id} application={app} onDelete={deleteApplication} />
                        ))}
                    </div>
                    {!goalReached && (
                        <GoalBanner current={applications.length} total={goal} onCreateNew={handleCreateNew} />
                    )}
                </div>
            )}
        </div>
    );
};

export default ApplicationsPage;
