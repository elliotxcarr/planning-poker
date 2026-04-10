import { useEffect, useState } from "react";
import "./App.css";
import { CardSelect } from "./Components/CardSelect";
import { PickedCards } from "./Components/PickedCards";
import { io } from "socket.io-client";
import { Welcome } from "./Components/Welcome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { PlayerWindow } from "./Components/PlayerWindow";

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
  const [playerId, setPlayerId] = useState<string>("");
  const [socketErr, setSocketErr] = useState<string>('');

  useEffect(() => {
    socket.on("update_room", (value) => {
      setRoom(value);
      setRoomId(value?.id.toString() || '');
    });
    socket.on("player_id", (id) => setPlayerId(id));
    socket.on('error', err => setSocketErr(err))
  }, []);

  const joinRoom = (id: string, name: string) => {
    setSocketErr('')
    if(!id || !name) return;
    socket.emit("join_room", { id, name });
    if(!socketErr) {
      setInGame(true);
    }
  };
  const createRoom = (name: string) => {
    if (!name) return;
    socket.emit("create_room", { name });
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
      <>
        
        <Welcome
          joinRoom={joinRoom}
          createRoom={createRoom}
        />
        <div className="w-full text-center pt-5 text-red-300">{socketErr}</div>
      </>
    );
  }
  return (
    <div className="flex flex-row justify-center h-screen ">
      <PlayerWindow players={room.players}/>
      <div className="fixed right-0 m-10 flex flex-col items-start gap-4">
          <button onClick={() => leave()}
            className="text-xl hover:cursor-pointer hover:text-white rounded-sm p-1">
            Leave Game
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="pl-3"/>
            </button>
      </div>
      <div className="flex flex-col gap-5 justify-center text-center w-2/3 ">
            <h1 className="pt-5">Planning Poker Room: {roomId}</h1>
            <div className="flex flex-row justify-center gap-2">
              <button
              onClick={() => refreshVotes()}
              className="game-button"
            >Refresh</button>
              <button
              onClick={() => revealVotes()}
              className="game-button"
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
