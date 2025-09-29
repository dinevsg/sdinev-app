import React from 'react';

interface ButtonHoverUnderLineProps {
  text: string;
  href: string;
}

const ButtonHoverUnderLine: React.FC<ButtonHoverUnderLineProps> = ({ text, href }) => {
  return (
    <a
      href={href}
      className="relative text-md font-semibold
    after:absolute after:bottom-0 after:left-1/2 after:h-[2px]
    after:w-[calc(100%+16px)] after:-translate-x-1/2
    after:origin-bottom-right after:scale-x-0 after:bg-indigo-500
    after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)]
    hover:after:origin-bottom-left hover:after:scale-x-100">
      {text}
    </a>
  );
};

export default ButtonHoverUnderLine;