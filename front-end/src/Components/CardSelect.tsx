import { Card } from "./Card";

export const CardSelect = ({
  setPicked,
  picked,
}: {
  setPicked: (value: number) => void;
  picked: number | null,
}) => {
    const numbers: number[] = [1, 2, 3, 5, 8];
    return (
        <div className=" flex flex-row justify-around w-2/4">
        {numbers.map((a) => (
            <Card
            number={a}
            click={() => setPicked(a)}
            isSelected={picked === a}
            hasVoted={!!picked}
            ></Card>
        ))}
        </div>
    );
};
