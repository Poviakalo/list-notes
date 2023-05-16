import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../App';

function SearchBox() {
  const { search, setSearch, setActiveItem } = React.useContext(Context);
  const inputRef = React.useRef();

  const onChangeInput = (event) => {
    setSearch(event.target.value);  
    setActiveItem({});  
  }

  const onClickClear = () => {
    setSearch('');
    inputRef.current.focus();
  }

  return (
    <div className='searchBox'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='searchBox__icon icon__search'/>
        <input 
          ref={inputRef} 
          type="text" 
          placeholder='Search' 
          className='searchBox__input' 
          onChange={onChangeInput}
          value={search}
        />        
        {
          search && 
          <FontAwesomeIcon 
            icon={faXmark} 
            className='searchBox__icon input__clear' 
            onClick={onClickClear}
          />
        }        
    </div>
  )
}

export default SearchBox;