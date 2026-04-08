import type { Player } from "./App"

export const Players = ({players}: {players: Player[]}) => {

    return (
        <div className="flex flex-col gap-3 p-8">
        {players?.map( a => <div className="flex flex-row justify-between">
            <div>{a.name}</div>
            <div>{(a.vote != null).toString()}</div>
        </div>
        )}
        </div>
    )
}