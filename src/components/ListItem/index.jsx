import React from 'react';
import classNames from 'classnames';
// import { Context } from '../../App';



function ListItem({title, activeItem, date, text, selectItem, item}) {
  // const { setFormAdd, setAction } = React.useContext(Context);
  const itemText  = text.slice(0, 16);
  
  const chooseItem = ( obj) => {
    selectItem(obj);
    // setFormAdd('');
    // setAction('');
  }

  return (
    <>
      <li 
        className={classNames( {"listItem": true, 'listItem-active': activeItem.id === item.id })} 
        onClick={() => chooseItem(item)}
      >
        <h2 className='listItem__title'>{title}</h2>
        <span className='listItem__date'>{date}</span>
        <p className='listItem__text'>{`${itemText} ...`}</p>
      </li>
    </>
    
  )
}

export default ListItem;