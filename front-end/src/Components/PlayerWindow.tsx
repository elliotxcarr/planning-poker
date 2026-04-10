import type { Player } from '../App';
import { Players } from './Players';
export const PlayerWindow = ({
  players,
}: {
  players: Player[] | undefined;
}) => {
  return (
    <div className="fixed left-0 w-1/5 m-10 outline-1 rounded-sm">
      <div className="text-center text-2xl p-2">Players</div>
      <div className="outline-1 mx-10"></div>
      {players ? <Players players={players} /> : ''}
    </div>
  );
};
