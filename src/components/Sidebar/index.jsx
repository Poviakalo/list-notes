import React from 'react';
import '../../scss/main.scss';
import ListItem from '../ListItem';
import { Context } from '../../App';

function Sidebar() {
  const { list, activeItem, setActiveItem, search, remove } = React.useContext(Context); 
  
  React.useEffect(() => {
    const test = async () => {
      try {
        const notes = await fetch('https://quintadb.com.ua/apps.json?rest_api_key=ddMSkaWO5cGOkLW4P5WQGA').then(data => data.json())
        console.log(notes);
      } catch (error) {
        console.error(error)
      }      
    }
    test()
  },[])
  

  return (
    <ul className='sideBar'>
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