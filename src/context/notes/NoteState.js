import { useState } from "react";
import NoteContext  from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"
    const notesInitial = [ ]

    const [notes, setNotes  ] = useState(notesInitial)

     // FETCH ALL NOTES
     const getNotes = async () => {
      // API CALL
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxYmE2MGY4NjE4NjZlNzVhNzE3NjIzIn0sImlhdCI6MTY0NjE0NDA5Nn0.wxR3v5hZaznOGVuD0QRrRTtz-GLBnK9usVRQwkk0_AM'
        }
      });
      const json = await response.json()
      // console.log(json)
      setNotes(json)
    }


    // Add a Note 
    const addNote = async (title, description, tag) => {
      // API CALL
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxYmE2MGY4NjE4NjZlNzVhNzE3NjIzIn0sImlhdCI6MTY0NjE0NDA5Nn0.wxR3v5hZaznOGVuD0QRrRTtz-GLBnK9usVRQwkk0_AM'
        },
        body: JSON.stringify({title, description, tag}) 
      });
      const json = await response.json()
      setNotes(notes.concat(json))
       
      

    }



    // Delete a Note
    const deleteNote = async (id) => {
      // API CALL
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxYmE2MGY4NjE4NjZlNzVhNzE3NjIzIn0sImlhdCI6MTY0NjE0NDA5Nn0.wxR3v5hZaznOGVuD0QRrRTtz-GLBnK9usVRQwkk0_AM'

        }
      });
     const json = await response.json()
      //  console.log(json)
      // console.log("Delete note has been initialized with id " + id);
      const newNotes = notes.filter((note) => { return note._id !== id})
      setNotes(newNotes)
    }





    // Edit a Note
    const editNote = async (id, title, description, tag) => { 
      // API CALL
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxYmE2MGY4NjE4NjZlNzVhNzE3NjIzIn0sImlhdCI6MTY0NjE0NDA5Nn0.wxR3v5hZaznOGVuD0QRrRTtz-GLBnK9usVRQwkk0_AM'

        },
        body: JSON.stringify({title, description, tag})
      });
      // eslint-disable-next-line no-unused-vars
      const json = await response.json()
      // console.log(json)

      let newNotes = JSON.parse(JSON.stringify(notes))
      //logic for editing note using id
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title
          newNotes[index].description = description
          newNotes[index].tag = tag
          break;
        }
      }
      setNotes(newNotes)
    }
    return (
        <NoteContext.Provider  value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;