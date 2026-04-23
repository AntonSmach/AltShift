import {type ReactNode, FC, memo} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Check, Home} from 'lucide-react';
import {useApplications} from '@hooks/useApplications';
import {ProgressDots} from '@components/ProgressDots';
import {AltShiftLogo} from '@components/AltShiftLogo';

interface AppLayoutProps {
    children: ReactNode;
}

const Logo: FC = () => (
    <Link to='/applications' className='flex items-center gap-2.5 no-underline rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green'>
        <AltShiftLogo size={36} />
        <span className='font-display text-xl font-bold text-ink'>Alt+Shift</span>
    </Link>
);

const AppLayout: FC<AppLayoutProps> = memo(({children}) => {
    const {applications, goal, goalReached} = useApplications();
    const location = useLocation();
    const isGeneratorPage = location.pathname === '/generator';
    const showProgress = !goalReached;

    return (
        <div className='flex min-h-screen flex-col bg-white'>
            <header className='sticky top-0 z-10 border-b border-surface-border bg-white'>
                <div className='mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8'>
                    <Logo />

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
                                <Check size={14} className='text-brand-green' />
                            </div>
                        )}

                        <Link
                            to={isGeneratorPage ? '/applications' : '/generator'}
                            aria-label={isGeneratorPage ? 'View all applications' : 'Create new application'}
                            className='flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border text-ink-secondary hover:bg-surface-secondary transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green'>
                            <Home size={16} />
                        </Link>
                    </div>
                </div>
            </header>

            <main className='flex flex-1 flex-col'>{children}</main>
        </div>
    );
});
AppLayout.displayName = 'AppLayout';

export {AppLayout};
