import {FC, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import Card from '@components/Card/Card';
import GoalBanner from '@components/GoalBanner/GoalBanner';
import Button from '@components/Button/Button';
import IconButton from '@components/IconButton/IconButton';
import {useApplications} from '@context/applications/useApplications';
import {useClipboard} from '@hooks/useClipboard';
import './ApplicationsPage.css';

const ApplicationsPage: FC = () => {
    const {applications, deleteApplication, goalReached, goal} = useApplications();
    const navigate = useNavigate();
    const {copy} = useClipboard();

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
                            <Card key={app.id} content={app.generatedLetter}>
                                <IconButton
                                    startIcon='icon-trash'
                                    label='Delete'
                                    onClick={() => deleteApplication(app.id)}
                                    className='application-card-delete-btn'
                                />
                                <IconButton
                                    endIcon='icon-copy'
                                    label='Copy to clipboard'
                                    onClick={() => copy(app.generatedLetter)}
                                    className='copy-btn'
                                />
                            </Card>
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
