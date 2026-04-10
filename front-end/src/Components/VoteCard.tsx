import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const VoteCard = ({
  vote,
  revealed,
}: {
  vote: number;
  revealed: boolean;
}) => {
  return (
    <div className={`card w-30 h-40 ${revealed ? '' : 'bg-gray-700'}`}>
      <h1>{revealed ? vote : <FontAwesomeIcon icon={faQuestion} />}</h1>
    </div>
  );
};
