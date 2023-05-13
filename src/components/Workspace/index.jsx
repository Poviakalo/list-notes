import React from 'react';
import { Context } from '../../App';
import Form from '../Form';

function Workspace() {
  const { activeItem, edit } = React.useContext(Context);

  
  return (
      <div className='workspace'>  
        {
          Object.keys(activeItem).length === 0 ? null : (
          edit 
          ? <Form />
          : <>
              <div className='workspace__date'>{activeItem.date}</div>
              <h1 className='workspace__title'>{activeItem.title}</h1>
              <p className='workspace__text'>{activeItem.text}</p>
            </>
          )
        }        
      </div>
    )  
}

export default Workspace;