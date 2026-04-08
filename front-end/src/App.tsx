import { useEffect, useState } from "react";
import "./App.css";
import { CardSelect } from "./CardSelect";
import { PickedCards } from "./PickedCards";
import { Players } from "./Players";
import { io } from "socket.io-client";
import { Welcome } from "./Welcome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";

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

  const vote = (number: number) => socket.emit(
    "vote", 
    {
      roomId,
      playerId,
      vote: number
    });

  const getPlayer = (): Player | null => {
    const player = room?.players.find(a => a.id === playerId) || null;
    return player;
  }

  const revealVotes = () => socket.emit("reveal", { roomId });
  const refreshVotes = () => socket.emit('reset', { roomId });
  const allPlayersVoted = () => {
    if(!room?.players) return;
    return room?.players.every(a => a.vote != null)
  }
  const leave = () => {
    socket.emit("leave");
    setInGame(false);
  };

  if (!room || inGame === false) {
    return (
      <Welcome
        setRoom={setRoomId}
        setPlayerName={setPlayerName}
        joinRoom={joinRoom}
      />
    );
  }
  return (
    <div className="flex flex-row justify-center h-screen ">
      <div className="fixed left-0 w-1/5 m-10 outline-1 rounded-sm">
        <div className="text-center text-2xl p-2">Players</div>
        <div className="outline-1 mx-10"></div>
        {room?.players ? <Players players={room?.players} /> : ""}
      </div>
      <div className="fixed right-0 m-10 flex flex-col items-start gap-4">
          <button onClick={() => leave()}
            className="text-xl hover:cursor-pointer hover:text-white rounded-sm p-1">
            Leave Game
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="pl-3"/>
            </button>
      </div>
      <div className="flex flex-col gap-5 justify-center text-center w-2/3 ">
            <h1 className="pt-5">Planning Poker</h1>
            <div className="flex flex-row justify-center gap-2">
              <button
              onClick={() => refreshVotes()}
              className="hover:cursor-pointer hover:bg-gray-800
              text-xl p-2 outline-1 text-gray-200 rounded-sm
              disabled:outline-none disabled:cursor-not-allowed disabled:text-gray-500"
            >Refresh</button>
              <button
              onClick={() => revealVotes()}
              className="hover:cursor-pointer hover:bg-gray-800
              text-xl p-2 outline-1 text-gray-200 rounded-sm
              disabled:outline-none disabled:cursor-not-allowed disabled:text-gray-500"
              disabled={!allPlayersVoted()}
            >Reveal</button>
            </div>
        {room.votes ? <PickedCards cards={room?.votes} reveal={room?.revealed || false} /> : ''}
        
        <div className="flex justify-center items-end h-full pb-5">
          <CardSelect setPicked={(a) => vote(a)} picked={getPlayer()?.vote || null}/>
        </div>
      </div>
    </div>
  );
}

export default App;
