import { Card } from "./Card"

export const CardSelect = ({setPicked}: {setPicked: (value: number) => void}) => {
    const numbers: number[] = [1,2,3,4,5]

    return (
        <div className=" flex flex-row justify-around w-2/4">
            {numbers.map(a => <Card number={a} picked={false} click={() => setPicked(a)}></Card>)}
        </div>
    )
}