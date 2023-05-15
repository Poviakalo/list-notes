import React from 'react';
import '../../scss/main.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../App';

function ArrowBack() {
  const { checked, setChecked } = React.useContext(Context);

  return (
    <>
        <label htmlFor="arrowLeft" className='actions__label' >           
            <FontAwesomeIcon icon={faArrowLeft} />
        </label>
        <input 
            type="checkbox" 
            id='arrowLeft' 
            className='actions__input' 
            checked={checked}
            onChange={() => setChecked(!checked)}
        />            
    </>
  )
}

export default ArrowBack;