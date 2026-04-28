import {FC, memo} from 'react';
import IconButton from '@components/IconButton/IconButton';
import Card from '@components/Card/Card';
import PulseLoader from '@components/PulseLoader/PulseLoader';
import './LetterPreview.css';

interface ILetterPreviewProps {
    value: string;
    isError: boolean;
    isCompleted: boolean;
    onCopy: () => void;
}

const LetterPreview: FC<ILetterPreviewProps> = memo(({value, isCompleted, isError, onCopy}) => {
    const letterContent = () => {
        if (isError) return <span className='letter-preview-error'>{value}</span>;
        if (!value) return <PulseLoader />;
        return value;
    };

    const letterActions = () => {
        if (isCompleted) {
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
