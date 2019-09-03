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

  function remove(id){
    var notes = JSON.parse(localStorage.getItem("notes"))
    if (id !== -1) {
      notes.splice(id, 1);
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    refresh();
  }
  return (
    <div className="App">
      <SearchBar />
      <div id="table-container">
        <NoteTable data={notes} edit={openEditNoteModal} remove={remove}/>
      </div>
      <Button color="blue" onClick={handleOpenNewModal}>
        Add Note
      </Button>
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
