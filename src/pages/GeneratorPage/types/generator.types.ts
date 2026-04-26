import {GeneratorState} from '@models/enums/generator-state.enum.ts';

export type GeneratorStatus =
    | {phase: GeneratorState.IDLE}
    | {phase: GeneratorState.GENERATING}
    | {phase: GeneratorState.COMPLETED; letter: string}
    | {phase: GeneratorState.ERROR; message: string};
