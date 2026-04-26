import {lazy, Suspense} from 'react';
import type {RouteObject} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import Spinner from '@components/Spinner';

const GeneratorPage = lazy(() => import('@pages/GeneratorPage/GeneratorPage'));
const ApplicationsPage = lazy(() => import('@pages/ApplicationsPage/ApplicationsPage'));

const fallback = (
    <div className='flex flex-1 items-center justify-center'>
        <Spinner size={36} className='text-ink-tertiary' />
    </div>
);

export const routes: RouteObject[] = [
    {
        path: '/generator',
        element: (
            <Suspense fallback={fallback}>
                <GeneratorPage />
            </Suspense>
        ),
    },
    {
        path: '/applications',
        element: (
            <Suspense fallback={fallback}>
                <ApplicationsPage />
            </Suspense>
        ),
    },
    {
        path: '*',
        element: <Navigate to='/generator' replace />,
    },
];
