import {FC, memo, type ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {useApplications} from '@context/applications/useApplications';
import ProgressDots from '@components/ProgressDots/ProgressDots';
import AltShiftLogo from '@components/AltShiftLogo/AltShiftLogo';
import './AppLayout.css';

interface IAppLayoutProps {
    children: ReactNode;
}

export const AppLayout: FC<IAppLayoutProps> = memo(({children}) => {
    const {applications, goal, goalReached} = useApplications();
    const showProgress = !goalReached;

    return (
        <div className='app-layout'>
            <header className='app-header'>
                <div className='app-header-inner'>
                    <Link to='/applications' className='app-logo-link'>
                        <AltShiftLogo size={36} />
                        <span className='app-logo-title'>Alt+Shift</span>
                    </Link>

                    <div className='app-nav'>
                        {showProgress && (
                            <div className='app-nav-progress'>
                                <span className='app-progress-text'>
                                    {applications.length}/{goal} applications generated
                                </span>
                                <ProgressDots current={applications.length} total={goal} variant='dot' />
                            </div>
                        )}

                        {goalReached && (
                            <div className='app-nav-progress'>
                                <span className='app-goal-text'>
                                    {goal}/{goal} applications generated
                                </span>
                                <div className='app-goal-icon-wrapper'>
                                    <i className='icon-check app-goal-icon' />
                                </div>
                            </div>
                        )}

                        <Link to='/applications' className='app-nav-btn'>
                            <i className='icon-home' />
                        </Link>
                    </div>
                </div>
            </header>

            <main className='app-main'>
                <div className='app-container'>{children}</div>
            </main>
        </div>
    );
});

AppLayout.displayName = 'AppLayout';
