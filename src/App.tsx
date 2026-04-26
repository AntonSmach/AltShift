import {FC} from 'react';
import {BrowserRouter, useRoutes} from 'react-router-dom';
import {AppLayout} from './layouts/AppLayout/AppLayout';
import {ApplicationsProvider} from './context/applications/ApplicationsProvider';
import {routes} from './routes';

const AppRoutes: FC = () => <>{useRoutes(routes)}</>;

const App: FC = () => (
    <BrowserRouter>
        <ApplicationsProvider>
            <AppLayout>
                <AppRoutes />
            </AppLayout>
        </ApplicationsProvider>
    </BrowserRouter>
);

export default App;
