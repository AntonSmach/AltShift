import {FC, type ReactNode, useEffect, useMemo, useReducer} from 'react';
import {ApplicationsContext} from './applications.context';
import {applicationsReducer} from '@store/applications/applications.reducer';
import {initApplicationsState} from '@store/applications/applications.state';
import {APPLICATIONS_GOAL} from '@models/constants/app.constants';
import {LocalStorageHelper} from '@helpers/local-storage.helper';
import {LocalStorageKeys} from '@models/enums/local-storage-keys.enum';
import type {IApplication} from '@models/interfaces/application.interface';

export const ApplicationsProvider: FC<{children: ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(applicationsReducer, undefined, initApplicationsState);

    useEffect(() => {
        LocalStorageHelper().set(LocalStorageKeys.SAVED_APPLICATION, state.applications);
    }, [state.applications]);

    const value = useMemo(
        () => ({
            applications: state.applications,
            addApplication: (data: Omit<IApplication, 'createdAt'>) =>
                dispatch({
                    type: 'ADD',
                    payload: {...data, createdAt: Date.now()},
                }),
            deleteApplication: (id: string) => dispatch({type: 'DELETE', payload: {id}}),
            goalReached: state.applications.length >= APPLICATIONS_GOAL,
            goal: APPLICATIONS_GOAL,
        }),
        [state.applications],
    );

    return <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>;
};

ApplicationsProvider.displayName = 'ApplicationsProvider';
