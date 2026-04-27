import {FC, memo} from 'react';
import type {IApplication} from '@models/interfaces/application.interface';
import {useClipboard} from '@hooks/useClipboard';
import IconButton from '@components/IconButton/IconButton';
import {cn} from '@utils/cn';
import './ApplicationCard.css';

interface IApplicationCardProps {
    application: IApplication;
    onDelete: (id: string) => void;
}

const ApplicationCard: FC<IApplicationCardProps> = memo(({application, onDelete}) => {
    const {copy, copied} = useClipboard();

    return (
        <div className='application-card'>
            <div className='application-card-preview'>
                <p className='application-card-text'>{application.generatedLetter}</p>
                <div className='application-card-fade' />
            </div>
            <div className='application-card-footer'>
                <IconButton
                    startIcon='icon-trash'
                    label='Delete'
                    onClick={() => onDelete(application.id)}
                    className='application-card-delete-btn'
                />
                <IconButton
                    endIcon={copied ? 'icon-check' : 'icon-copy'}
                    label={copied ? 'Copied!' : 'Copy to clipboard'}
                    onClick={() => copy(application.generatedLetter)}
                    className={cn('copy-btn', copied && 'copy-btn--copied')}
                />
            </div>
        </div>
    );
});

ApplicationCard.displayName = 'ApplicationCard';

export default ApplicationCard;
