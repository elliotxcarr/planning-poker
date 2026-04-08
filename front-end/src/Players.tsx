import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Player } from "./App";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
export const Players = ({ players }: { players: Player[] }) => {
  return (
    <div className="flex flex-col gap-1 mx-5 p-5">
      {players?.map((a) => (
        <div className="flex flex-row justify-between">
          <div className="text-white">{a.name}</div>
          <div>{!!a.vote ? 
          <FontAwesomeIcon icon={faCircleCheck} color={'lightgreen'}/>
            : 
            <FontAwesomeIcon icon={faClock} color={'gray'}/>
          }</div>
        </div>
      ))}
    </div>
  );
};
