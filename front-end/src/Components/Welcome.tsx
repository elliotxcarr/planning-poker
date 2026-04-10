import { useState } from 'react';
import '../Styles/Welcome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

enum Action {
  Create = 0,
  Join = 1,
}
export const Welcome = ({
  joinRoom,
  createRoom,
}: {
  joinRoom: (a: string, b: string) => void;
  createRoom: (a: string) => void;
}) => {
  const [action, setAction] = useState<number | null>(null);
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');

  const buildReq = () => {
    if (action === Action.Join) {
      joinRoom(id, name);
    } else {
      createRoom(name);
    }
  };
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <h1 className="py-10">Welcome to Planning Poker</h1>
      {action === null ? (
        <>
          <button
            className="action-button"
            onClick={() => setAction(Action.Join)}
          >
            Join Room
          </button>
          <div>or</div>
          <button
            className="action-button"
            onClick={() => setAction(Action.Create)}
          >
            Create Room
          </button>
        </>
      ) : (
        <button onClick={() => setAction(null)}>
          <FontAwesomeIcon icon={faBackward} />
        </button>
      )}
      {action != null ? (
        <input
          className="input-box"
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <></>
      )}
      {action === Action.Join ? (
        <>
          <input
            className="input-box"
            placeholder="Room ID"
            onChange={(e) => setId(e.target.value)}
          />
          <button className="action-button" onClick={buildReq}>
            Join
          </button>
        </>
      ) : (
        <></>
      )}
      {action === Action.Create ? (
        <button className="action-button" onClick={() => buildReq()}>
          Create Room
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};
