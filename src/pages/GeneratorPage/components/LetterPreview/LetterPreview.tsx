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
    const renderContent = () => {
        if (!value) return <PulseLoader />;
        if (isError) return <span className='letter-preview-error'>{value}</span>;
        return value;
    };

    const renderActions = () => {
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
        <Card content={renderContent()} size='full' showFade={false} className='rounded-2xl'>
            {renderActions()}
        </Card>
    );
});

LetterPreview.displayName = 'LetterPreview';

export default LetterPreview;
