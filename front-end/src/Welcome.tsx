import './Welcome.css';

export const Welcome = (
    {
        setRoom,
        setPlayerName,
        joinRoom,
    }:
    {
        setRoom: (a:string) => void,
        setPlayerName: (a: string) => void,
        joinRoom: () => void
    }
) => {
    return (
        <div className="flex flex-col gap-3 justify-center items-center">
                <h1 className="py-10">Welcome to Planning Poker</h1>
                <input
                  className="input-box"
                  placeholder="Room ID"
                  onChange={(e) => setRoom(e.target.value)}
                />
                <input
                  className="input-box"
                  placeholder="Your Name"
                  onChange={(e) => setPlayerName(e.target.value)}
                />
                <button
                  className="outline-1 px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-gray-700"
                  onClick={joinRoom}
                >
                  Join Room
                </button>
              </div>
    )
}