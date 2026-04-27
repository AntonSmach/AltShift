import {FC, memo} from 'react';
import IconButton from '@components/IconButton/IconButton';
import Card from '@components/Card/Card';
import PulseLoader from '@components/PulseLoader/PulseLoader';
import {GeneratorState} from '@models/enums/generator-state.enum';
import {GeneratorStatus} from '@pages/GeneratorPage/types/generator.types';
import './LetterPreview.css';

interface ILetterPreviewProps {
    status: GeneratorStatus;
    isCompleted: boolean;
    onCopy: () => void;
}

const LetterPreview: FC<ILetterPreviewProps> = memo(({status, isCompleted, onCopy}) => {
    const renderContent = () => {
        if (status.phase === GeneratorState.GENERATING) return <PulseLoader />;
        if (status.phase === GeneratorState.COMPLETED) return status.letter;
        if (status.phase === GeneratorState.ERROR)
            return <span className='letter-preview-error'>{status.message}</span>;
        return 'Your personalized job application will appear here...';
    };

    return (
        <Card content={renderContent()} size='full' showFade={false} className='rounded-2xl'>
            {isCompleted && (
                <>
                    <div />
                    <IconButton startIcon='icon-copy' label='Copy to clipboard' onClick={onCopy} className='copy-btn' />
                </>
            )}
        </Card>
    );
});

LetterPreview.displayName = 'LetterPreview';

export default LetterPreview;
