import React from 'react';
import '../../scss/main.scss';
import SearchBox from '../SearchBox';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const buttons = [
        {name: 'add', icon: faPlus}, 
        {name: 'delete', icon: faTrashCan}, 
        {name: 'edit', icon: faPenToSquare}
    ];
  return (
    <div className='header'>
        {/* <div className="wrapper header__wrapper"> */}
            <div className="actions">
                {
                    buttons.map( ({name, icon}) => <Button key={name} name={name}>
                        <FontAwesomeIcon icon={icon} />
                    </Button>)
                }
            </div>
            <SearchBox />
        {/* </div> */}
    </div>
  )
}

export default Header;