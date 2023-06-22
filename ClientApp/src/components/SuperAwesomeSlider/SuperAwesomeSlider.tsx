import React from 'react';
import { useState } from 'react';

interface SuperAwesomeSliderProps {
  text: string;
  onSlideCallback: (value: number) => void;
  min?: number;
  max?: number;
  initialValue: number;
  isDisabled: boolean;
}

export default function SuperAwesomeSlider(props: SuperAwesomeSliderProps) {
  const { text, onSlideCallback, min = 0, max = 100, initialValue, isDisabled } = props;
  const [sliderValue, setSliderValue] = useState<number>(initialValue);

  const getSlideValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = parseInt(event.target.value, 10);
    setSliderValue(inputNumber);
    onSlideCallback(inputNumber);
  };

  return (
    <>
      <div>{text}</div>
      <input
        type="range"
        min={min}
        max={max}
        value={sliderValue}
        onChange={getSlideValue}
        disabled={isDisabled}></input>
      <span className="hxBadge">{sliderValue}</span>
    </>
  );
}
