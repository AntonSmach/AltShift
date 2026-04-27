import {FC, HTMLAttributes, memo} from 'react';
import './Card.css';

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
    content: string;
}

const Card: FC<ICardProps> = memo(({content, children, ...props}) => (
    <div className='application-card' {...props}>
        <div className='application-card-preview'>
            <p className='application-card-text'>{content}</p>
            <div className='application-card-fade' />
        </div>
        <div className='application-card-footer'>{children}</div>
    </div>
));

Card.displayName = 'Card';

export default Card;
