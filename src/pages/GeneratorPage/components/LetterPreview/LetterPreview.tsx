import {FC} from 'react';
import Spinner from '@components/Spinner/Spinner';
import {GeneratorState} from '@models/enums/generator-state.enum';
import {GeneratorStatus} from '@pages/GeneratorPage/types/generator.types';

const LetterPreview: FC<{status: GeneratorStatus}> = ({status}) => {
    if (status.phase === GeneratorState.GENERATING) {
        return (
            <div className='flex flex-1 items-center justify-center'>
                <Spinner size={36} className='text-fg-muted' />
            </div>
        );
    }
    if (status.phase === GeneratorState.COMPLETED) {
        return (
            <p className='font-text text-sm leading-relaxed text-fg-secondary whitespace-pre-line'>{status.letter}</p>
        );
    }
    if (status.phase === GeneratorState.ERROR) {
        return <p className='font-text text-sm text-fg-error'>{status.message}</p>;
    }
    return <p className='font-text text-sm text-fg-muted'>Your personalized job application will appear here...</p>;
};

export default LetterPreview;
