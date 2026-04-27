import {FC, memo, PropsWithChildren} from 'react';
import './Card.css';

interface ICardProps extends PropsWithChildren {
    content: string;
}

const Card: FC<ICardProps> = memo(({content, children}) => (
    <div className='application-card'>
        <div className='application-card-preview'>
            <p className='application-card-text'>{content}</p>
            <div className='application-card-fade' />
        </div>
        <div className='application-card-footer'>{children}</div>
    </div>
));

Card.displayName = 'Card';

export default Card;
