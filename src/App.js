import React, { useEffect } from "react";
import "./App.css";
import SearchBar from "./components/searchBar";
import { Button } from "react-desktop/macOs";
import NoteModal from "./components/noteModal";
import NoteTable from "./components/table";

function App() {
  const [open, setOpen] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [isNew, setIsNew] = React.useState(true);
  const [data, setData] = React.useState({});
  const [id, setIdForEdit] = React.useState(null);

  useEffect(() => {
    //get data at begin
    refresh();
  }, []);

  function handleClose() {
    setOpen(false);
    //clear the state from data
    setData({});
    //cleare the id for edit if selected
    setIdForEdit(null);
  }

  //this function calls when button add will pressed
  function addNote(data) {
    //get all notes from local storage
    const notes = JSON.parse(localStorage.getItem("notes"));
    //add new note to storage
    localStorage.setItem("notes", JSON.stringify([...notes, data]));
    refresh();
  }

  //this function will refresh data in state
  function refresh() {
    //get all notes from local storage
    const notes = JSON.parse(localStorage.getItem("notes"));
    //add all notes to state
    setNotes(notes);
  }

  //helps to show new note modal
  function handleOpenNewModal() {
    setIsNew(true);
    setOpen(true);
  }

  //helps to show edit modal
  function openEditNoteModal(data, id) {
    //keep data for edit to show in moldals inputs
    setData(data);
    //keep the records id to upddate the list
    setIdForEdit(id);
    setIsNew(false);
    setOpen(true);
  }

  function editNote(newData) {
    //get all notes from local storage
    const notes = JSON.parse(localStorage.getItem("notes"));
    //create new list with new data
    //send list into loop and change data where id === index
    const newNotes = notes.map((data, index) => {
      if (index === id) {
        return newData;
      } else {
        return data;
      }
    });
    //send new data to local storage
    localStorage.setItem("notes", JSON.stringify(newNotes));
    refresh();
  }

  function remove(id) {
    //get all notes from storage
    let notes = JSON.parse(localStorage.getItem("notes"));
    //check for valid id from user
    if (id !== -1) {
      //remove the element
      notes.splice(id, 1);
    }
    //set new list to local storage
    localStorage.setItem("notes", JSON.stringify(notes));
    refresh();
  }

  function filter(word) {
    
      //this condition is to avoid receive "" and search "" in list
      if (word) {
        //check at least we have 3 leters to start search
        if (word.length >= 3) {
          //set time out to give user time to complete the word is going to type
        setTimeout(() => {
          //get input values
          const str = word.toLowerCase();
          //create empty list
          const filteredList = [];
          //get the list from local storage
          let notes = JSON.parse(localStorage.getItem("notes"));
          //search in fixed list
          notes.map(note => {
            if (note.title.toLowerCase().search(str) >= 0) {
              //add to list what we found
              filteredList.push(note);
            } else if (note.body.toLowerCase().search(str) >= 0) {
              //add to list what we found
              filteredList.push(note);
            } else if (note.category.toLowerCase().search(str) >= 0) {
              //add to list what we found
              filteredList.push(note);
            }
            return note;
          });
          setNotes(filteredList);
        }, 1500);
      }
      } else {
        //if input is "" we will have all list
        refresh();
      }
    
  }

  return (
    <div className="App">
      <SearchBar search={filter} />
      <Button color="blue" onClick={handleOpenNewModal} style={{ margin: 10 }}>
        Add Note
      </Button>
      <div id="table-container">
        <NoteTable data={notes} edit={openEditNoteModal} remove={remove} />
      </div>
      <NoteModal
        open={open}
        close={handleClose}
        addNote={addNote}
        editNote={editNote}
        isNew={isNew}
        data={data}
        id={id}
      />
    </div>
  );
}

export default App;
