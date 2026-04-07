export const Card = ({
  number,
  click,
  isSelected,
  hasVoted,
}: {
  number: number,
  click: () => void,
  isSelected: boolean,
  hasVoted: boolean,
}) => {
    return (
        <div
        onClick={hasVoted ? () => {} : click}
        className={`flex w-20 h-30 items-center
            justify-center outline-1 rounded-lg
            hover:cursor-pointer hover:bg-gray-700
            ${isSelected ? 'bg-gray-600': ''}`}
        >
        <h1>{number}</h1>
        </div>
    );
};
