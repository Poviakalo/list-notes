import React from 'react';

import classNames from 'classnames';

import '../../scss/main.scss';
import ListItem from '../ListItem';
import { Context } from '../../App';

function Sidebar() {
  const { list, activeItem, setActiveItem, search, checked } = React.useContext(Context);

  return (
    <ul className={classNames('sidebar', {'sidebar__hide': checked})}>
    {
      list
      .filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()) || obj.text.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => b.date.lastChange - a.date.lastChange )
      .map((item, index) => {
        return (
          <ListItem 
            key={index} 
            item={item}
            {...item}              
            activeItem={activeItem}
            selectItem={(obj) => {setActiveItem(obj)}}
          />)
      })
    }
    </ul>
  )
}

export default Sidebar