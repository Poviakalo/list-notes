import React from 'react';
import '../../scss/main.scss';
import ArrowBack from '../ArrowBack';
import SearchBox from '../SearchBox';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../App';



function Header({onRemove, onAddList, onEditListItem}) {    
    const { activeItem, edit, setBtn, checked } = React.useContext(Context);
    const btnEditRef = React.useRef();
    const editItem = () => {      
      onEditListItem()
    }
    React.useEffect(() => {
      setBtn(btnEditRef);
    },[setBtn])
    
    const removeItem = () => {      
      if(window.confirm(`Ви дійсно бажаєте видалити нотатку ${activeItem.title}?`)) {              
        onRemove();
      }
    }
    
  return (
    <div className='header'>
        <div className="actions">          
          {checked && <ArrowBack />}
          <button className='button button__add' onClick={ () => onAddList() }><FontAwesomeIcon icon={faPlus} /></button>
          <button className='button' onClick={ removeItem } disabled={Object.keys(activeItem).length === 0 || edit}><FontAwesomeIcon icon={faTrashCan} /></button>
          <button className='button' onClick={ editItem } disabled={Object.keys(activeItem).length === 0} ref={btnEditRef}><FontAwesomeIcon icon={faPenToSquare} /></button>
        </div>
        <SearchBox />        
    </div>
  )
}

export default Header;