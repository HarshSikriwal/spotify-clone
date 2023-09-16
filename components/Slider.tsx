"use client";

import { Slider as SliderUi } from "@/components/ui/slider";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (
    <SliderUi
      defaultValue={[50]}
      value={[value]}
      max={1}
      step={0.1}
      onValueChange={handleChange}
      aria-label="Volume"
    />
  );
};

export default Slider;
