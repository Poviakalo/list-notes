import React from 'react';
import classNames from 'classnames';
import { Context } from '../../App';

function ListItem({title, activeItem, date, text, selectItem, item}) {
  const { setEdit, setChecked } = React.useContext(Context);

  const itemText  = text.slice(0, 14);
  const itemTitle  = title.slice(0, 25);
  
  const chooseItem = ( obj) => {
    selectItem(obj);
    setEdit(false);
    setChecked(true);
  }
  return (
    <>
      <li 
        className={classNames( {"listItem": true, 'listItem-active': activeItem.id === item.id })} 
        onClick={() => chooseItem(item)}
      >
        { Object.keys(date).length > 1
          ? <>
                <h2 className='listItem__title'>{title.length > 25 ? `${itemTitle} ...` : title}</h2>
                <div className="listItem__content">
                  <span className='listItem__date'>{          
                  item === activeItem 
                  ? `${date.hours < 10 ? (`0${date.hours}`) : date.hours}:${date.minutes < 10 ? (`0${date.minutes}`): date.minutes} ${date.am_pm}`
                  :`${date.month}/${date.day < 10 ? (`0${date.day}`) : date.day}/${`${date.year}`.slice(2)}`
                  }</span>
                  <p className='listItem__text'>{`${itemText} ...`}</p>
                </div>
                
              </>
              : null     
        }
      </li>
    </>
    
  )
}

export default ListItem;