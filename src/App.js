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
    refresh();
  }, []);

  function handleClose() {
    setOpen(false);
    setIsNew(true);
    setData({});
    setIdForEdit(null);
  }
  function addNote(data) {
    const notes = JSON.parse(localStorage.getItem("notes"));
    localStorage.setItem("notes", JSON.stringify([...notes, data]));
    refresh();
  }

  function refresh() {
    const notes = JSON.parse(localStorage.getItem("notes"));
    setNotes(notes);
  }
  function handleOpenNewModal() {
    setIsNew(true);
    setOpen(true);
  }

  function openEditNoteModal(data, id) {
    setData(data);
    setIdForEdit(id);
    setIsNew(false);
    setOpen(true);
  }

  function editNote(newData) {
    const notes = JSON.parse(localStorage.getItem("notes"));
    const newNotes = notes.map((data, index) => {
      if (index === id) {
        return newData;
      } else {
        return data;
      }
    });
    localStorage.setItem("notes", JSON.stringify(newNotes));
    refresh();
  }

  function remove(id) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    if (id !== -1) {
      notes.splice(id, 1);
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    refresh();
  }

  function filter(word) {
    //this condition is to avoid receive "" and search "" in list
    if (word) {
      //get input values
      const str = word.toLowerCase();
      //create empty list
      const filteredList = [];

      let notes = JSON.parse(localStorage.getItem("notes"));
      //search in fixed list
      notes.map(note => {
        if (note.title.toLowerCase().search(str) >= 0) {
          //add to list what we found
          filteredList.push(note);
        } else if (note.body.toLowerCase().search(str) >= 0) {
          filteredList.push(note);
        } else if (note.category.toLowerCase().search(str) >= 0) {
          filteredList.push(note);
        }
        return note;
      });
      setNotes(filteredList);
    } else {
      //if input is "" we will have all list
      refresh();
    }
  }

  return (
    <div className="App">
      <SearchBar search={filter}/>
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
