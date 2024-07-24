import React from 'react';
import { Button } from './ui/button';

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const SubmitButton = ({ className, children, onClick }: ButtonProps) => {
  return (
    <Button
      type='button'
      className={className ?? ' w-full'}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
