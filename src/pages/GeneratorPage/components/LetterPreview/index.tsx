import {FC} from 'react';
import Spinner from '@components/Spinner';
import {GeneratorStatus} from '@pages/GeneratorPage/GeneratorPage.tsx';
import {GeneratorState} from '@models/enums/generator-state.enum.ts';

const LetterPreview: FC<{status: GeneratorStatus}> = ({status}) => {
    if (status.phase === GeneratorState.GENERATING) {
        return (
            <div className='flex flex-1 items-center justify-center'>
                <Spinner size={36} className='text-ink-tertiary' />
            </div>
        );
    }
    if (status.phase === GeneratorState.COMPLETED) {
        return (
            <p className='font-text text-sm leading-relaxed text-ink-secondary whitespace-pre-line'>{status.letter}</p>
        );
    }
    return <p className='font-text text-sm text-ink-tertiary'>Your personalized job application will appear here...</p>;
};

export default LetterPreview;
