import {FC, HTMLAttributes, memo, ReactNode} from 'react';
import classNames from 'classnames';
import './Card.css';

type ICardSize = 'sm' | 'full';

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
    actions?: ReactNode;
    size?: ICardSize;
    showFade?: boolean;
}

const sizeClass: Record<ICardSize, string> = {
    sm: 'card--sm',
    full: 'card--full',
};

const Card: FC<ICardProps> = memo(({actions, children, size, showFade = true, className, ...props}) => (
    <div className={classNames('card', size && sizeClass[size], className)} {...props}>
        <div className={classNames('card-preview', showFade && 'card-preview--fade')}>
            <div className='card-text'>{children}</div>
            {showFade && <div className='card-fade' />}
        </div>
        {actions && <div className='card-footer'>{actions}</div>}
    </div>
));

Card.displayName = 'Card';

export default Card;
