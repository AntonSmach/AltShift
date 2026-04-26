import {FC} from 'react';
import Spinner from '@components/Spinner/Spinner';
import IconButton from '@components/IconButton/IconButton';
import {cn} from '@utils/cn';
import {GeneratorState} from '@models/enums/generator-state.enum';
import {GeneratorStatus} from '@pages/GeneratorPage/types/generator.types';
import './LetterPreview.css';

interface ILetterPreviewProps {
    status: GeneratorStatus;
    copied: boolean;
    isCompleted: boolean;
    onCopy: () => void;
}

const LetterPreview: FC<ILetterPreviewProps> = ({status, copied, isCompleted, onCopy}) => {
    const renderContent = () => {
        if (status.phase === GeneratorState.GENERATING) {
            return (
                <div className='flex flex-1 items-center justify-center'>
                    <Spinner size={36} className='text-fg-muted' />
                </div>
            );
        }
        if (status.phase === GeneratorState.COMPLETED) {
            return (
                <p className='font-text text-sm leading-relaxed text-fg-secondary whitespace-pre-line'>
                    {status.letter}
                </p>
            );
        }
        if (status.phase === GeneratorState.ERROR) {
            return <p className='font-text text-sm text-fg-error'>{status.message}</p>;
        }
        return <p className='font-text text-sm text-fg-muted'>Your personalized job application will appear here...</p>;
    };

    return (
        <div className='letter-preview'>
            <div className='letter-preview-content'>{renderContent()}</div>
            {isCompleted && (
                <div className='letter-preview-footer'>
                    <IconButton
                        icon={copied ? 'icon-check' : 'icon-copy'}
                        label={copied ? 'Copied!' : 'Copy to clipboard'}
                        onClick={onCopy}
                        className={cn('letter-preview-copy-btn', copied && 'letter-preview-copy-btn--copied')}
                    />
                </div>
            )}
        </div>
    );
};

export default LetterPreview;
