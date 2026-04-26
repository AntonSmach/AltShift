import {FC, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import ApplicationCard from '@components/ApplicationCard/ApplicationCard';
import GoalBanner from '@components/GoalBanner/GoalBanner';
import Button from '@components/Button/Button';
import {useApplications} from '@context/applications/useApplications';

const ApplicationsPage: FC = () => {
    const {applications, deleteApplication, goalReached, goal} = useApplications();
    const navigate = useNavigate();

    const handleCreateNew = useCallback(() => navigate('/generator'), [navigate]);

    return (
        <div className='mx-auto w-full max-w-5xl px-4 py-8 md:px-8'>
            <div className='mb-6 flex items-center justify-between'>
                <h1 className='font-display text-3xl font-bold text-fg-primary md:text-4xl'>Applications</h1>
                <Button icon='icon-plus' onClick={handleCreateNew} className='gap-1.5'>
                    <span className='hidden sm:inline'>Create New</span>
                    <span className='sm:hidden'>New</span>
                </Button>
            </div>

            <div className='mb-1 h-px w-full bg-stroke' />

            {applications.length === 0 ? (
                <div className='mt-8'>
                    <GoalBanner current={0} total={goal} onCreateNew={handleCreateNew} />
                </div>
            ) : (
                <div className='mt-8 flex flex-col gap-8'>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
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
