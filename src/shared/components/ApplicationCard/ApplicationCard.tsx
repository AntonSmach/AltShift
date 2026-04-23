import {FC, memo} from 'react';
import {Trash2, Copy, Check} from 'lucide-react';
import type {Application} from '@models/interfaces/application.interface';
import {useClipboard} from '@hooks/useClipboard';
import {extractLetterBody, extractLetterGreeting} from '@utils/letter';

interface ApplicationCardProps {
    application: Application;
    onDelete: (id: string) => void;
}

const ApplicationCard: FC<ApplicationCardProps> = memo(({application, onDelete}) => {
    const {copy, copied} = useClipboard();

    return (
        <div className='flex flex-col gap-3 rounded-2xl border border-surface-border bg-white p-4'>
            <div className='flex-1 overflow-hidden'>
                <p className='mb-2 font-text text-sm font-semibold text-ink'>{extractLetterGreeting(application.generatedLetter)}</p>
                <p className='font-text text-sm text-ink-secondary line-clamp-4'>
                    {extractLetterBody(application.generatedLetter)}
                </p>
            </div>
            <div className='flex items-center justify-between border-t border-surface-border pt-3'>
                <button
                    type='button'
                    onClick={() => onDelete(application.id)}
                    className='inline-flex items-center gap-1.5 font-text text-sm text-ink-tertiary hover:text-red-500 transition-colors duration-150 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green'>
                    <Trash2 size={14} />
                    Delete
                </button>
                <button
                    type='button'
                    onClick={() => copy(application.generatedLetter)}
                    className='inline-flex items-center gap-1.5 font-text text-sm text-ink-secondary hover:text-ink transition-colors duration-150 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green'>
                    {copied ? <Check size={14} className='text-brand-green' /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy to clipboard'}
                </button>
            </div>
        </div>
    );
});
ApplicationCard.displayName = 'ApplicationCard';

export {ApplicationCard};
