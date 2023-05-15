import React from 'react';

import classNames from 'classnames';

import '../../scss/main.scss';
import ListItem from '../ListItem';
import { Context } from '../../App';

function Sidebar() {
  const { list, activeItem, setActiveItem, search, remove, checked } = React.useContext(Context); 
  
  // React.useEffect(() => {
  //   const test = async () => {
  //     try {
  //       const notes = await fetch('https://quintadb.com.ua/apps/cJrCofWPncGi8HWRKypYOY/dtypes/entity/cClIevW5TcNOkHs8kGWPrr.json?rest_api_key=ddMSkaWO5cGOkLW4P5WQGA&amp;view=').then(data => data.json())
  //       console.log(notes.records[0].values);
  //     } catch (error) {
  //       console.error(error)
  //     }      
  //   }
  //   test()
  // },[])
  

  return (
    <ul className={classNames('sidebar', {'sidebar__hide': checked})}>
    {
      list
      .filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()) || obj.text.toLowerCase().includes(search.toLowerCase()))
      .filter((item) => {
        if(remove && item === activeItem) {          
          return false
        }
        return true;
      })
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