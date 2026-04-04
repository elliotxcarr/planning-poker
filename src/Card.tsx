export const Card = ({number, picked, click}: {number: number, picked:boolean, click: () => void}) => {
    return (
        <div
        onClick={click}
        className="flex w-20 h-30 items-center justify-center outline-1 rounded-lg hover:cursor-pointer hover:bg-gray-700">
            <h1>{picked ? '' : number}</h1>
        </div>
    )
}