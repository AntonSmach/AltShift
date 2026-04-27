import {FC, memo} from 'react';
import IconButton from '@components/IconButton/IconButton';
import {cn} from '@utils/cn';
import {GeneratorState} from '@models/enums/generator-state.enum';
import {GeneratorStatus} from '@pages/GeneratorPage/types/generator.types';
import './LetterPreview.css';
import PulseLoader from '@components/PulseLoader/PulseLoader.tsx';

interface ILetterPreviewProps {
    status: GeneratorStatus;
    copied: boolean;
    isCompleted: boolean;
    onCopy: () => void;
}

const LetterPreview: FC<ILetterPreviewProps> = memo(({status, copied, isCompleted, onCopy}) => {
    const renderContent = () => {
        if (status.phase === GeneratorState.GENERATING) {
            return <PulseLoader />;
        }
        if (status.phase === GeneratorState.COMPLETED) {
            return <p className='letter-preview-text'>{status.letter}</p>;
        }
        if (status.phase === GeneratorState.ERROR) {
            return <p className='letter-preview-error'>{status.message}</p>;
        }
        return <p className='letter-preview-placeholder'>Your personalized job application will appear here...</p>;
    };

    return (
        <div className='letter-preview'>
            <div className='letter-preview-content'>{renderContent()}</div>
            {isCompleted && (
                <div className='letter-preview-footer'>
                    <IconButton
                        startIcon={copied ? 'icon-check' : 'icon-copy'}
                        label={copied ? 'Copied!' : 'Copy to clipboard'}
                        onClick={onCopy}
                        className={cn('copy-btn', copied && 'copy-btn--copied')}
                    />
                </div>
            )}
        </div>
    );
});

LetterPreview.displayName = 'LetterPreview';

export default LetterPreview;
