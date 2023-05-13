import React from 'react';
import classNames from 'classnames';
import { Context } from '../../App';

function Form({ className }) {  
  const { activeItem, setActiveItem, edit, setEdit } = React.useContext(Context);


//date

const createDate = () => {
  const date = new Date();
  const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes = date.getMinutes();
  const am_pm = date.getHours() > 12 ? 'PM' : 'AM';
  
  return `${month} ${day}, ${year} at ${hours < 10 ? (`0${hours}`) : hours}:${minutes < 10 ? (`0${minutes}`): minutes} ${am_pm}`;

}

const onChangeTitle = (event) => {
   setActiveItem({...activeItem, title: event.target.value, date: createDate()})  
}
const onChangeText = (event) => {
   setActiveItem({...activeItem, text: event.target.value, date: createDate()})    
}
 
  const formRef = React.useRef()
  

  React.useEffect(() => {
      const hideFormOutSide = (event) => {
      // console.log(event.composedPath().includes(formRef.current))
      // setFormAdd(event.composedPath().includes(formRef.current))
    }  
    document.body.addEventListener('click', hideFormOutSide);
    return () => {
      document.body.removeEventListener('click', hideFormOutSide);
    }

  }, []);

  
  return (
    <div className={classNames('form', className)} ref={formRef}>
        <div className='form__date'>{createDate()}</div>
        <input 
          className='form__title'
          type="text" 
          placeholder='Введіть назву події'
          value={ activeItem.title }
          onChange={onChangeTitle}
          autoFocus
        />
        <textarea 
          className='form__text' 
          placeholder='Введіть текст'
          value={ activeItem.text }
          onChange={onChangeText}
        ></textarea>
        <div className="blockButtons">
          <button className='button button__save' onClick={() => console.log('save')}>Зберегти зміни</button>
          <button className='button button__cancel' onClick={() => setEdit(!edit)}>Відмінити</button>
        </div>

    </div>
  )
}

export default Form;