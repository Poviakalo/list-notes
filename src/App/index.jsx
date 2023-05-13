import React from 'react';

import '../scss/main.scss';
import Header from '../components/Header';
import Layout from '../components/Layout';

export const Context = React.createContext();

function App() {
  const notes = [
    {id: 1, date: 'May 01, 2018 at 10:17 AM', title: 'some text 1', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae doloribus reiciendis atque ducimus ad minus suscipit nisi error inventore sed fugiat alias quam, vitae, autem a tenetur debitis impedit numquam?'},
    {id: 2, date: 'May 02, 2018 at 12:20 PM', title: 'task for Monday', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quis debitis, nihil culpa blanditiis quo enim dignissimos eos quos molestiae tenetur fuga voluptate ipsa laudantium sint mollitia maxime minima? Asperiores.'},
    {id: 3, date: 'May 03, 2018 at 09:30 AM', title: 'task for Tuesday', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa tempore corrupti, velit quidem numquam voluptatibus atque aspernatur est cupiditate libero optio eos reprehenderit! Illum accusamus minus perferendis totam? Totam, quis?'},
    {id: 4, date: 'May 04, 2018 at 11:11 AM', title: 'task for Wensday', text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia laborum temporibus quaerat distinctio architecto labore fuga ipsam doloremque iure quisquam. Assumenda vel ea id consequatur at maxime ipsam, optio ratione.'},
    {id: 5, date: 'May 05, 2018 at 01:35 PM', title: 'task for Thursday', text: '1Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quos eaque, ipsam quis a voluptatibus laudantium possimus amet rerum vel nesciunt voluptas magni illum alias quod id nisi ab ducimus.'},
    {id: 6, date: 'May 06, 2018 at 02:04 PM', title: 'task for Friday', text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla placeat ipsa illum aspernatur modi voluptate necessitatibus exercitationem, rerum voluptas illo nobis amet vero veniam tenetur consectetur alias. Corporis, velit pariatur.'},
    {id: 7, date: 'May 07, 2018 at 05:29 PM', title: 'task for Weekend', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quaerat sint excepturi atque, libero qui repudiandae impedit perferendis. Autem voluptate pariatur fuga minus nihil totam non laboriosam quo, aspernatur ipsa!'},
]

  const [search, setSearch] = React.useState('');
  const [newTask, setNewTask] = React.useState({title: '', text: '', date:''});
  const [list, setList] = React.useState(notes);
  const [activeItem, setActiveItem] = React.useState({});
  const [edit, setEdit] = React.useState(false);

  const generateID = (arr) => {  
    let id = 1;  
    arr.forEach(obj => {
      if(obj.id === id) {
        id++;
      }
    })
    return id;
  }
  
  const removeItem = (item, arr) => {
    setList(arr.filter(elem => elem !== item ))
    setActiveItem({})
  }
  const addNewItem = () => {
    const newList = [...list, {id: generateID(list), title: '', text: '', date:''}];
    setList(newList);
    setActiveItem({});
    setEdit(false);
  }

  const editItem = (obj) => {
    setEdit(!edit);
  }

  return (
    <Context.Provider value={{
      search, setSearch, 
      list, setList, 
      activeItem, setActiveItem,      
      edit, setEdit,
      newTask, setNewTask,
      }}>
      <div className="app">    
        <Header 
          onRemove={() => removeItem(activeItem, list)} 
          onAddList={() => addNewItem()} 
          onEditListItem={() => editItem(activeItem)}
          />
        <Layout />      
      </div>
    </Context.Provider>    
  );
}

export default App;
