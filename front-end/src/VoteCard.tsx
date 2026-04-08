export const VoteCard = ({
    vote,
    revealed
}: {
    vote: number,
    revealed: boolean
}) => {
    return (
    <div
        className="flex w-20 h-30 items-center justify-center outline-1 rounded-lg hover:cursor-pointer hover:bg-gray-700"
    >
        <h1>{revealed ? vote : ''}</h1>
    </div>
  );
}