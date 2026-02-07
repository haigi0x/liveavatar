import React from "react";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, onClick, ...props }) => {
  return (
    <button
      className={`bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm px-6 py-2.5 rounded-xl disabled:opacity-50 h-fit cursor-pointer transition-all hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98] ${className}`}
      onClick={props.disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </button>
  );
};
