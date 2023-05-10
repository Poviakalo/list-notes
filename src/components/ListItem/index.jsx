import React from 'react'

function ListItem({name}) {
    
  return (
    <li className='listItem' onClick={() => console.log(name)}>{name}</li>
  )
}

export default ListItem;