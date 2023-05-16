import React from 'react';

import '../scss/main.scss';
import Header from '../components/Header';
import Layout from '../components/Layout';


export const Context = React.createContext();

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

const createCollectionsInIndexedDB = () => {
  if(!indexedDB) {
    console.log("This browser doesn't suppotr indexedDB");
    return;
  }
  console.log(indexedDB);

  const request = indexedDB.open('NotesDatabase', 1);

  request.onerror = (event) => {
    console.error('Error', event);
    console.error('An error occured with IndexedDB')
  }

  request.onupgradeneeded = (event) => {
    const db = request.result;
    if(!db.objectStoreNames.contains('notes')) {
      db.createObjectStore("notes", { keyPath: "id" });
    }    
  }

  request.onsuccess = (event) => {
    console.log('Database opened successfuly');

    // const db = request.result;
    // const transaction = db.transaction("notes", "readwrite");

    // const store = transaction.objectStore("notes");      
    // // notes.forEach(obj => store.put(obj));

    // const idQuery = store.getAll();

    // idQuery.onsuccess = () => {
    //     console.log('idQuery', idQuery.result);
    // };
    // transaction.oncomplete = () => {
    //     db.close();
    // };      
  }

}

//   const notes = [
//     {id: 1, date: {am_pm: "PM", day: 14, hours: 1, minutes: 0, month: 5, year: 2023}, title: 'some text 1', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae doloribus reiciendis atque ducimus ad minus suscipit nisi error inventore sed fugiat alias quam, vitae, autem a tenetur debitis impedit numquam?'},
//     {id: 2, date: {am_pm: "PM", day: 30, hours: 1, minutes: 7, month: 4, year: 2018}, title: 'task for Tuesday task for Tuesday task for Tuesday', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa tempore corrupti, velit quidem numquam voluptatibus atque aspernatur est cupiditate libero optio eos reprehenderit! Illum accusamus minus perferendis totam? Totam, quis?'},
//     {id: 3, date: {am_pm: "AM", day: 2, hours: 9, minutes: 57, month: 5, year: 2019}, title: 'task for Tuesday', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa tempore corrupti, velit quidem numquam voluptatibus atque aspernatur est cupiditate libero optio eos reprehenderit! Illum accusamus minus perferendis totam? Totam, quis?'},
//     {id: 4, date: {am_pm: "AM", day: 17, hours: 11, minutes: 11, month: 5, year: 2020}, title: 'task for Wensday', text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia laborum temporibus quaerat distinctio architecto labore fuga ipsam doloremque iure quisquam. Assumenda vel ea id consequatur at maxime ipsam, optio ratione.'},
//     {id: 5, date: {am_pm: "PM", day: 22, hours: 7, minutes: 24, month: 8, year: 2021}, title: 'task for Thursday', text: '1Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quos eaque, ipsam quis a voluptatibus laudantium possimus amet rerum vel nesciunt voluptas magni illum alias quod id nisi ab ducimus.'},
//     {id: 6, date: {am_pm: "AM", day: 5, hours: 4, minutes: 38, month: 10, year: 2022}, title: 'task for Friday', text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla placeat ipsa illum aspernatur modi voluptate necessitatibus exercitationem, rerum voluptas illo nobis amet vero veniam tenetur consectetur alias. Corporis, velit pariatur.'},
//     {id: 7, date: {am_pm: "AM", day: 31, hours: 12, minutes: 43, month: 12, year: 2022}, title: 'task for Weekend', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quaerat sint excepturi atque, libero qui repudiandae impedit perferendis. Autem voluptate pariatur fuga minus nihil totam non laboriosam quo, aspernatur ipsa!'},
// ]

function App() {
  React.useEffect(() => {
    createCollectionsInIndexedDB(); 
    getAllData();   
  }, []);

  const [search, setSearch] = React.useState(''); 
  const [list, setList] = React.useState([]);
  const [activeItem, setActiveItem] = React.useState({});
  const [edit, setEdit] = React.useState(false);
  const [btn, setBtn] = React.useState(null);
  const [checked, setChecked] = React.useState(false);

  console.log('list', list)
  
  const generateID = (arr) => {  
    let id = 1;  
    arr.sort((a,b) => a.id - b.id).forEach(obj => {      
      if(obj.id === id) {
        id++;
      }
    })
    return id;
  }

  const getAllData = () => {
    const dbPromise = indexedDB.open('NotesDatabase', 1);    
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction('notes', 'readonly');

      const notes = tx.objectStore('notes');

      const listNotes = notes.getAll();

      listNotes.onsuccess = (event) => {
        setList(event.target.result)
      }      
      listNotes.onerror = (error) => {
        console.error(error);
        alert('Error occurred while loading initial data.')
      }      
      tx.oncomplete = () => {
        db.close()
      }     
    }
  }

  //Actions  
  const addNewItem = (event) => {
    // const newList = [...list, {id: generateID(list), title: '', text: '', date: {}}];
    // setList(newList);
    setActiveItem({});
    setEdit(false);
    const dbPromise = indexedDB.open('NotesDatabase', 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction('notes', 'readwrite');
      const notes = tx.objectStore('notes');
      const notesItem = notes.put({
          id: generateID(list), 
          date: {lastChange: Date.now()},
          title: '', 
          text: ''
        });
        notesItem.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();          
        }
        getAllData();
        console.log('An item added');
      }
      notesItem.onerror = (error) => {        
        console.error(error);
        alert('Error!!!')
      }
    }    
  }

  const removeItem = (event, item, arr) => {    
    setList(arr.filter(elem => elem !== item ));
    setActiveItem({});
    console.log('remove', event);
    const dbPromise = indexedDB.open('NotesDatabase', 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction('notes', 'readwrite');
      const notes = tx.objectStore('notes');

      const deleteNote = notes.delete(item.id);      
      deleteNote.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();          
        }
        console.log(`The note ${item.title} deleted`);
        getAllData();
        
      }
      deleteNote.onerror = (error) => {        
        console.error(error);
        alert('Error!!!')
      }
    }    
  }
  const editItemHandler = (event) => {    
    setEdit(!edit);
    setChecked(true);
     
  }

  const setItemHandler = (obj, title, date, text) => {
    console.log('setItemHandler')
    const dbPromise = indexedDB.open('NotesDatabase', 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction('notes', 'readwrite');
      const notes = tx.objectStore('notes');
      const item = notes.put({
          id: obj.id, 
          date: date,
          title: title ? title : obj.title, 
          text: text ? text : obj.text
        });
      item.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();          
        }
        getAllData();
        console.log('An item edit');
      }
      item.onerror = (error) => {        
        console.error(error);
        alert('Error!!!')
      }
    } 
  }

  return (
    <Context.Provider value={{
      search, setSearch, 
      list, setList, 
      activeItem, setActiveItem,      
      edit, setEdit,
      btn, setBtn,
      checked, setChecked,
      setItemHandler
      }}>
      <div className="app">    
        <Header 
          onRemove={(event) => removeItem(event, activeItem, list)} 
          onAddList={(event) => addNewItem(event)} 
          onEditListItem={(event) => editItemHandler(event)}
          />
        <Layout />      
      </div>
    </Context.Provider>    
  );
}

export default App;
