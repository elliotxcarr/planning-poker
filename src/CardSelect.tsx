import { useState } from "react";
import { Card } from "./Card";

export const CardSelect = ({
  setPicked,
}: {
  setPicked: (value: number) => void;
}) => {
    const numbers: number[] = [1, 2, 3, 4, 5];
    const [selectedNum, setSelectedNum] = useState<number | null>(null);
    const numberPicked = (num:number) => {
        setSelectedNum(num);
        setPicked(num)
    }
    return (
        <div className=" flex flex-row justify-around w-2/4">
        {numbers.map((a) => (
            <Card
            number={a}
            click={() => numberPicked(a)}
            isSelected={selectedNum === a}
            hasVoted={!!selectedNum}
            ></Card>
        ))}
        </div>
    );
};
