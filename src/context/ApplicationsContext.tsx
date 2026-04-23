import {type ReactNode, createContext, FC, useCallback, useContext, useEffect, useMemo, useReducer} from 'react';
import type {Application} from '@models/interfaces/application.interface';

const STORAGE_KEY = 'alt-shift-applications';
const GOAL = 5;

interface State {
    applications: Application[];
}

type Action =
    | {type: 'ADD'; payload: Application}
    | {type: 'DELETE'; payload: {id: string}};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'ADD':
            return {applications: [action.payload, ...state.applications]};
        case 'DELETE':
            return {applications: state.applications.filter((a) => a.id !== action.payload.id)};
    }
}

function loadFromStorage(): State {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return {applications: raw ? (JSON.parse(raw) as Application[]) : []};
    } catch {
        return {applications: []};
    }
}

interface ApplicationsContextValue {
    applications: Application[];
    addApplication: (data: Omit<Application, 'id' | 'createdAt'>) => void;
    deleteApplication: (id: string) => void;
    goalReached: boolean;
    goal: number;
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(null);

export const ApplicationsProvider: FC<{children: ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, undefined, loadFromStorage);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.applications));
    }, [state.applications]);

    const addApplication = useCallback((data: Omit<Application, 'id' | 'createdAt'>) => {
        dispatch({
            type: 'ADD',
            payload: {
                ...data,
                id: crypto.randomUUID(),
                createdAt: Date.now(),
            },
        });
    }, []);

    const deleteApplication = useCallback((id: string) => {
        dispatch({type: 'DELETE', payload: {id}});
    }, []);

    const value = useMemo(
        () => ({
            applications: state.applications,
            addApplication,
            deleteApplication,
            goalReached: state.applications.length >= GOAL,
            goal: GOAL,
        }),
        [state.applications, addApplication, deleteApplication],
    );

    return <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>;
};

ApplicationsProvider.displayName = 'ApplicationsProvider';

export function useApplications(): ApplicationsContextValue {
    const ctx = useContext(ApplicationsContext);
    if (!ctx) throw new Error('useApplications must be used inside ApplicationsProvider');
    return ctx;
}
