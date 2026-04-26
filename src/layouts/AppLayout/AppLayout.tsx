import {FC, memo, type ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {useApplications} from '@context/applications/useApplications';
import ProgressDots from '@components/ProgressDots';
import AltShiftLogo from '@components/AltShiftLogo';

interface IAppLayoutProps {
    children: ReactNode;
}

export const AppLayout: FC<IAppLayoutProps> = memo(({children}) => {
    const {applications, goal, goalReached} = useApplications();
    const showProgress = !goalReached;

    return (
        <div className='flex min-h-screen flex-col bg-white'>
            <header className='sticky top-0 z-10 border-b border-surface-border bg-white'>
                <div className='mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8'>
                    <Link
                        to='/applications'
                        className='flex items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green'>
                        <AltShiftLogo size={36} />
                        <span className='font-display text-xl font-bold text-ink'>Alt+Shift</span>
                    </Link>

                    <div className='flex items-center gap-2'>
                        {showProgress && (
                            <div className='hidden items-center gap-2 sm:flex'>
                                <span className='font-text text-sm text-ink-secondary'>
                                    {applications.length}/{goal} applications generated
                                </span>
                                <ProgressDots current={applications.length} total={goal} />
                            </div>
                        )}

                        {goalReached && (
                            <div className='hidden items-center gap-1.5 sm:flex'>
                                <span className='font-text text-sm font-medium text-brand-green'>
                                    {goal}/{goal} applications generated
                                </span>
                                <i className='icon-check text-sm text-brand-green' />
                            </div>
                        )}

                        <Link
                            to={'/applications'}
                            className='flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border text-ink-secondary hover:bg-surface-secondary transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green'>
                            <i className='icon-home text-base' />
                        </Link>
                    </div>
                </div>
            </header>

            <main className='flex flex-1 flex-col'>{children}</main>
        </div>
    );
});

AppLayout.displayName = 'AppLayout';
