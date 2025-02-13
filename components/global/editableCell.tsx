/** @format */

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type EditableCellProps = {
  value: number;
  onSave: (newValue: number) => void;
};

const EditableCell = ({ value, onSave }: EditableCellProps) => {
  const [change, setChange] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleCheck = () => {
    onSave(newValue);
    setChange(false);
  };

  return change ? (
    <div className="relative w-24">
      <Input
        type="number"
        value={newValue}
        onChange={(e) => setNewValue(parseInt(e.target.value))}
        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button
        onClick={handleCheck}
        size="icon"
        variant="outline"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 w-8 py-2"
      >
        <Check className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <p onClick={() => setChange(true)}>{value}</p>
  );
};

export default EditableCell;
