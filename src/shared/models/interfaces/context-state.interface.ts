import {IApplication} from '@models/interfaces/application.interface.ts';

export interface IState {
    applications: IApplication[];
}

export interface IApplicationsContextValue {
    applications: IApplication[];
    addApplication: (data: Omit<IApplication, 'createdAt'>) => void;
    deleteApplication: (id: string) => void;
    goalReached: boolean;
    goal: number;
}

export type IAction = IAddApplicationAction | IDeleteApplicationAction;

export interface IAddApplicationAction {
    type: 'ADD';
    payload: IApplication;
}

export interface IDeleteApplicationAction {
    type: 'DELETE';
    payload: {
        id: string;
    };
}
