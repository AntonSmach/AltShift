import {LocalStorageHelper} from './local-storage.helper.ts';
import {LocalStorageKeys} from '@models/enums/local-storage-keys.enum';

export function loadFromStorage<T>(key: LocalStorageKeys, fallback: T): T {
    return LocalStorageHelper().get<T>(key) ?? fallback;
}
