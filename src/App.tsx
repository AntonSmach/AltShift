import {FC, lazy, Suspense} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {AppLayout} from './layouts/AppLayout/AppLayout';
import {ApplicationsProvider} from './context/applications/ApplicationsProvider';
import Spinner from '@components/Spinner';

const GeneratorPage = lazy(() => import('./pages/GeneratorPage/GeneratorPage'));
const ApplicationsPage = lazy(() => import('./pages/ApplicationsPage/ApplicationsPage'));

const App: FC = () => (
    <BrowserRouter>
        <ApplicationsProvider>
            <AppLayout>
                <Suspense
                    fallback={
                        <div className='flex flex-1 items-center justify-center'>
                            <Spinner size={36} className='text-ink-tertiary' />
                        </div>
                    }>
                    <Routes>
                        <Route path='/generator' element={<GeneratorPage />} />
                        <Route path='/applications' element={<ApplicationsPage />} />
                        <Route path='*' element={<Navigate to='/generator' replace />} />
                    </Routes>
                </Suspense>
            </AppLayout>
        </ApplicationsProvider>
    </BrowserRouter>
);

export default App;
