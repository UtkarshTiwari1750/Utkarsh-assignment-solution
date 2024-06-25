import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({text, link, children, custom}) => {
  return (
    <Link to={link}
    >
        <button className={`${custom} bg-[#5865F2] hover:bg-blue-700 font-semibold py-2 px-4 rounded `}>
            {text}
            {children}
        </button>
    </Link>
  );
}

export default Button;
