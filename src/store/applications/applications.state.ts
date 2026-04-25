import type {IApplication} from '@models/interfaces/application.interface';
import {IState} from '@models/interfaces/context-state.interface';
import {LocalStorageKeys} from '@models/enums/local-storage-keys.enum';
import {loadFromStorage} from '@helpers/load-from-storage';

export function initApplicationsState(): IState {
    return {
        applications: loadFromStorage<IApplication[]>(LocalStorageKeys.SAVED_APPLICATION, []),
    };
}
