import React from 'react'

interface IButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: IButtonProps) => {
  return (
    <button className="bg-blackLight text-white text-sm px-3 py-1 rounded-full">
      {children}
    </button>
  )
}

export default Button