import { useEffect, useState } from "react";
import "./App.css";
import { CardSelect } from "./CardSelect";
import { PickedCards } from "./PickedCards";
import { Players } from "./Players";
import { io } from "socket.io-client";
import { Welcome } from "./Welcome";

const socket = io("http://localhost:3001");

export interface Player {
  id: string;
  name: string;
  vote: number;
  socketId: string;
}
interface Room {
  id: string;
  players: Player[];
  revealed: boolean;
  votes: [];
}
function App() {
  const [inGame, setInGame] = useState<boolean>();
  const [roomId, setRoomId] = useState<string>("");
  const [room, setRoom] = useState<Room | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState<string>("");

  useEffect(() => {
    socket.on("update_room", (value) => {
      setRoom(value);
    });
    socket.on("player_id", (id) => setPlayerId(id));
  }, []);

  const joinRoom = () => {
    if (!roomId || !playerName) return;
    socket.emit("join_room", { roomId, playerName });
    setInGame(true);
  };

  const vote = (number: number) => {
    socket.emit("vote", { roomId, playerId, vote: number });
  };

  const revealVotes = () => {
    socket.emit("reveal", { roomId });
  };
  const leave = () => {
    socket.emit("leave");
    setInGame(false);
  };

  if (!room || inGame === false) {
    return (
      <Welcome
        setRoom={setRoomId}
        setPlayerName={setPlayerName}
        joinRoom={joinRoom}/>
    );
  }
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-1/5 outline-1">
        <div className="text-center text-2xl p-3">Players</div>
        {room?.players ? <Players players={room?.players} /> : ""}
      </div>
      <div className="flex flex-col gap-10 h-screen justify-center text-center w-2/3 ">
        <h1 className="pt-10">Planning Poker</h1>
        <button onClick={() => leave()}>Leave Game</button>
        <div className="flex flex-row justify-center gap-2 ">
          <button
            onClick={() => revealVotes()}
            className="hover:cursor-pointer"
          >
            Reveal
          </button>
        </div>

        <PickedCards cards={room?.votes} reveal={room?.revealed || false} />
        <div className="flex justify-center items-end h-full pb-10">
          <CardSelect setPicked={(a) => vote(a)} />
        </div>
      </div>
    </div>
  );
}

export default App;
