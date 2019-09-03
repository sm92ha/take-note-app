import React from "react";
import { Button, TextInput } from "react-desktop/macOs";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik } from "formik";

export default function NoteModal(props) {
  const handleClose = () => {
    document.getElementById("title").value = "";
    document.getElementById("body").value = "";
    props.close();
  };
  const submit = values => {
    props.isNew ? props.addNote(values) : props.editNote(values);
    handleClose();
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.isNew ? "Add" : "Edit"} Note
      </DialogTitle>
      <DialogContent>
        <div style={{ width: 500, height: "100%" }}>
          <Formik
            initialValues={{
              title: props.isNew ? "" : props.data.title,
              category: props.isNew ? "not set" : props.data.category,
              body: props.isNew ? "" : props.data.body
            }}
            onSubmit={submit}
            render={({ values, handleChange, handleSubmit }) => (
              <div>
                <TextInput
                  id="title"
                  label="Title"
                  placeholder="Title"
                  value={values.title}
                  onChange={handleChange}
                />
                <div style={{ fontSize: 12 }}>Note Category</div>
                <select
                  id="category"
                  value={values.category}
                  onChange={handleChange}
                >
                  <option value="not set">not set</option>
                  <option value="daily">daily</option>
                  <option value="important">important</option>
                  <option value="home">home</option>
                  <option value="work">work</option>
                </select>
                <div style={{ fontSize: 12 }}>Note Body</div>
                <textarea
                  onChange={handleChange}
                  id="body"
                  rows="15"
                  cols="80"
                  value={values.body}
                  placeholder="Note Body"
                />
                <DialogActions>
                  <Button onClick={handleClose} color="blue">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} color="blue">
                    {props.isNew ? "Add" : "Edit"}
                  </Button>
                </DialogActions>
              </div>
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
