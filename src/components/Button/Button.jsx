import React from 'react';
import '../../scss/main.scss';

function Button({children, name}) {

  return (
    <button className='button' onClick={() => console.log(name)}>{children}</button>
  )
}

export default Button