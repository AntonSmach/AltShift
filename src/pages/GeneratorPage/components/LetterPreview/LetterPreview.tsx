import {FC, memo} from 'react';
import IconButton from '@components/IconButton/IconButton';
import Card from '@components/Card/Card';
import PulseLoader from '@components/PulseLoader/PulseLoader';
import './LetterPreview.css';
import {GeneratorState} from '@models/enums/generator-state.enum.ts';

interface ILetterPreviewProps {
    value: string;
    state: GeneratorState;
    onCopy: () => void;
}

const LetterPreview: FC<ILetterPreviewProps> = memo(({value, state, onCopy}) => {
    const letterContent = () => {
        if (state === GeneratorState.GENERATING) return <PulseLoader />;
        if (state === GeneratorState.ERROR) return <span className='letter-preview-error'>{value}</span>;
        return value;
    };

    const letterActions = () => {
        if (state === GeneratorState.COMPLETED) {
            return (
                <>
                    <div />
                    <IconButton startIcon='icon-copy' label='Copy to clipboard' onClick={onCopy} className='copy-btn' />
                </>
            );
        }
    };

    return (
        <Card actions={letterActions()} size='full' showFade={false} className='rounded-2xl'>
            {letterContent()}
        </Card>
    );
});

LetterPreview.displayName = 'LetterPreview';

export default LetterPreview;
