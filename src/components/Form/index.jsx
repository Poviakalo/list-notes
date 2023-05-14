import React from 'react';
import classNames from 'classnames';
import { Context } from '../../App';

function Form({ className }) {  
  const { activeItem, setActiveItem, list, setList } = React.useContext(Context);
  
  //functions
  const createDate = () => {
    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes = date.getMinutes();
    const am_pm = date.getHours() > 12 ? 'PM' : 'AM';
    
    return {
      year,
      month,
      day,
      hours,
      minutes,
      am_pm
    }
  }
  const onChangeTitle = (event) => {
    setActiveItem({...activeItem, title: event.target.value, date: createDate()})     
  }
  const onChangeText = (event) => {
    setActiveItem({...activeItem, text: event.target.value, date: createDate()})    
  }
  const toUpdateList = (arr, item) => {
    const newList = arr.map(obj => {
      if(obj.id === item.id) {
        console.log('item', item)
        return item;
      }
      return obj;
    })
    return newList;
  }

  //useRef
  const formRef = React.useRef()
  
  //useEffect
  React.useEffect(() => {
    const hideFormOutSide = (event) => {
      // console.log(event.composedPath().includes(formRef.current)? 'попав':'мимо');
      // setEdit(event.composedPath().includes(formRef.current));
    }  
    document.body.addEventListener('click', hideFormOutSide);
    return () => {
      document.body.removeEventListener('click', hideFormOutSide);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setList(toUpdateList(list, activeItem));
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [activeItem]);

  const date = {...createDate()};

  return (
    <div className={classNames('form', className)} ref={formRef}>
        <div className='form__date'>{`${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.month - 1]} ${date.day}, ${date.year} at ${date.hours < 10 ? (`0${date.hours}`) : date.hours}:${date.minutes < 10 ? (`0${date.minutes}`): date.minutes} ${date.am_pm}`}</div>
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
    </div>
  )
}

export default Form;