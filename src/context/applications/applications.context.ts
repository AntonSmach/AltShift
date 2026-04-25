import {createContext} from 'react';
import type {IApplicationsContextValue} from '@models/interfaces/context-state.interface';

export const ApplicationsContext = createContext<IApplicationsContextValue | null>(null);
