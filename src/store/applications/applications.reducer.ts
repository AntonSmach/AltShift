import {IAction, IState} from '@models/interfaces/context-state.interface';

export function applicationsReducer(state: IState, action: IAction): IState {
    switch (action.type) {
        case 'ADD':
            return {applications: [action.payload, ...state.applications]};
        case 'DELETE':
            return {applications: state.applications.filter((application) => application.id !== action.payload.id)};
        default:
            return state;
    }
}
