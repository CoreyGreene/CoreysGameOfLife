import React from 'react';

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

  const getSlideValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = parseInt(event.target.value, 10);
    onSlideCallback(inputNumber);
  };

  return (
    <>
      <div>{text}</div>
      <input type="range" min={min} max={max} value={initialValue} onChange={getSlideValue} disabled={isDisabled} />
    </>
  );
}
