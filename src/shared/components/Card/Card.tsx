import {FC, HTMLAttributes, ReactNode, memo} from 'react';
import './Card.css';

interface ICardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
    content: ReactNode;
}

const Card: FC<ICardProps> = memo(({content, children, ...props}) => (
    <div className='application-card' {...props}>
        <div className='application-card-preview'>
            {content}
            <div className='application-card-fade' />
        </div>
        <div className='application-card-footer'>{children}</div>
    </div>
));

Card.displayName = 'Card';

export default Card;
