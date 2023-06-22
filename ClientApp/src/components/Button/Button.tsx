import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  const { text, onClick } = props;
  return (
    <>
      <button className="hxBtn" onClick={onClick}>
        {text}
      </button>
    </>
  );
}
