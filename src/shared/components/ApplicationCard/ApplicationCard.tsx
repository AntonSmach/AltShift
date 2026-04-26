import {FC, memo} from 'react';
import type {IApplication} from '@models/interfaces/application.interface';
import {useClipboard} from '@hooks/useClipboard';
import IconButton from '@components/IconButton/IconButton';

interface IApplicationCardProps {
    application: IApplication;
    onDelete: (id: string) => void;
}

const ApplicationCard: FC<IApplicationCardProps> = memo(({application, onDelete}) => {
    const {copy, copied} = useClipboard();

    return (
        <div className='flex flex-col gap-3 rounded-2xl border border-stroke bg-white p-4'>
            <div className='relative max-h-60 overflow-hidden'>
                <p className='font-text text-sm text-fg-secondary whitespace-pre-line'>{application.generatedLetter}</p>
                <div className='absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent' />
            </div>
            <div className='flex items-center justify-between border-t border-stroke pt-3'>
                <IconButton
                    icon='icon-trash'
                    label='Delete'
                    onClick={() => onDelete(application.id)}
                    className='text-fg-muted hover:text-fg-error'
                />
                <IconButton
                    icon={copied ? 'icon-check' : 'icon-copy'}
                    label={copied ? 'Copied!' : 'Copy to clipboard'}
                    onClick={() => copy(application.generatedLetter)}
                    className={copied ? 'text-brand' : 'text-fg-secondary hover:text-fg-primary'}
                />
            </div>
        </div>
    );
});

ApplicationCard.displayName = 'ApplicationCard';

export default ApplicationCard;
