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
  }

}



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
  const addNewItem = () => {
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
      }
      notesItem.onerror = (error) => {        
        console.error(error);
        alert('Error!!!')
      }
    }    
  }
  const removeItem = (item, arr) => {    
    setList(arr.filter(elem => elem !== item ));
    setActiveItem({});
    setChecked(false);
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
          onAddList={addNewItem} 
          onRemove={() => removeItem(activeItem, list)}          
          onEditListItem={editItemHandler}
          />
        <Layout />      
      </div>
    </Context.Provider>    
  );
}

export default App;
