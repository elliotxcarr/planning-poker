import { VoteCard } from './VoteCard'
import './PickedCards.css';

export const PickedCards = ({cards, reveal}: {cards: number[], reveal:boolean}) => {
    return (
        <div className="picked-card-container">
            {cards.map(a => <VoteCard vote={a} revealed={reveal}/>)}
        </div>
    )
}