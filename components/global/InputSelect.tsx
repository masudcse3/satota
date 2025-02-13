/** @format */

import { TCustomerType } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectLabel } from "@radix-ui/react-select";

type Option = {
  value: string;
  label?: string; // Optional label for display (if different from value)
};

type InputSelectProps = {
  value: string; // Selected value
  onChange: (value: TCustomerType) => void; // Change handler
  options: Option[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

const InputSelect = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className,
  disabled = false,
}: InputSelectProps) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={disabled}
            >
              {option.label || option.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default InputSelect;
