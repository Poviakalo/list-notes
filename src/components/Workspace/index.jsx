import React from 'react';
import classNames from 'classnames';

import { Context } from '../../App';
import Form from '../Form';

function Workspace() {
  const { activeItem, edit, checked } = React.useContext(Context);
  const { date } = activeItem;
  
  return (
      <div className={classNames('workspace',{'workspace__show': checked})}>  
        {
          Object.keys(activeItem).length === 0 ? null : (
          edit 
          ? <Form />
          : (Object.keys(date).length > 1
            ? <>
                <div className='workspace__date'>
                  {`
                  ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.month -1]}
                   ${date.day},
                    ${date.year}
                     at ${date.hours < 10 
                     ? (`0${date.hours}`) 
                     : date.hours}:${date.minutes < 10 ? (`0${date.minutes}`) : date.minutes} ${date.am_pm}`
                  }</div>
                <h1 className='workspace__title'>{activeItem.title}</h1>
                <p className='workspace__text'>{activeItem.text}</p>
              </>
              : null
            )
          )
        }        
      </div>
    )  
}

export default Workspace;