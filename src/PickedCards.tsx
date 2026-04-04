import { Card } from "./Card"

export const PickedCards = ({cards, reveal}: {cards: number[], reveal:boolean}) => {
    return (
        <div className="flex flex-row w-3/4 gap-2 justify-center self-center py-10">
            {cards.map(a => <Card number={a} picked={reveal ? false : true} click={() => {}}/>)}
        </div>
    )
}