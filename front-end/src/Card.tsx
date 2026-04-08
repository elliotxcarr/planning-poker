export const Card = ({
  number,
  click,
  isSelected,
  hasVoted,
}: {
  number: number;
  click: () => void;
  isSelected: boolean;
  hasVoted: boolean;
}) => {
  return (
    <div
      onClick={hasVoted ? () => {} : click}
      className={`w-20 h-30 card
            ${hasVoted ? "hover:bg-none outline-gray-500" : "hover:bg-gray-800 hover:cursor-pointer "}
            ${isSelected ? "bg-gray-700 border-3" : ""}`}
    >
      <div
        className={`text-5xl font-bold ${hasVoted && !isSelected ? "text-gray-400 " : "text-white"}`}
      >
        {number}
      </div>
    </div>
  );
};
