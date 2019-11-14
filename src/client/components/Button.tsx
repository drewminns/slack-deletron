import React from 'react';

interface IButtonProps {
  content: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: string;
}

const classes = ['bg-blue-900', 'hover:bg-blue-700', 'text-white', 'text-sm'];

const renderClassName = (style: string): string => {
  switch (style) {
    default:
      classes.push('px-5', 'py-2');
  }
  return classes.join(' ');
};

export const Button: React.FC<IButtonProps> = ({ content, handleClick, size = 'default' }: IButtonProps) => {
  return (
    <button className={renderClassName(size)} onClick={handleClick}>
      {content}
    </button>
  );
};

Button.displayName = 'Button';
