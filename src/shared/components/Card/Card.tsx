import {FC, HTMLAttributes, ReactNode, memo} from 'react';
import {cn} from '@utils/cn';
import './Card.css';

type ICardSize = 'sm' | 'full';

interface ICardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
    content: ReactNode;
    size?: ICardSize;
    showFade?: boolean;
}

const sizeClass: Record<ICardSize, string> = {
    sm: 'card--sm',
    full: 'card--full',
};

const Card: FC<ICardProps> = memo(({content, children, size, showFade = true, className, ...props}) => (
    <div className={cn('card', size && sizeClass[size], className)} {...props}>
        <div className={cn('card-preview', showFade && 'card-preview--fade')}>
            <div className='card-text'>{content}</div>
            {showFade && <div className='card-fade' />}
        </div>
        {children && <div className='card-footer'>{children}</div>}
    </div>
));

Card.displayName = 'Card';

export default Card;
