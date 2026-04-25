import {useContext} from 'react';
import {ApplicationsContext} from './applications.context';
import type {IApplicationsContextValue} from '@models/interfaces/context-state.interface';

export function useApplications(): IApplicationsContextValue {
    const context = useContext(ApplicationsContext);
    if (!context) throw new Error('useApplications must be used inside ApplicationsProvider');
    return context;
}
