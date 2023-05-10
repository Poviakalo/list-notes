import React from 'react'
import '../../scss/main.scss'
import ListItem from '../ListItem'

function Sidebar() {
  const list = ['monday', 'tuesday', 'wensday', 'thursday', 'friday', 'saturday', 'sunday','monday1', 'tuesday1', 'wensday1', 'thursday1', 'friday1', 'saturday1', 'sunday1','monday2', 'tuesday2', 'wensday2', 'thursday2', 'friday2', 'saturday2', 'sunday2','monday', 'tuesday', 'wensday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <ul className='sideBar'>
    {
      list.map((item, index) => {
        return <ListItem key={index} name={item} />
      })
    }
    </ul>
  )
}

export default Sidebar