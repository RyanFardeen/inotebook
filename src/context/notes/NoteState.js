import { useState } from "react";
import NoteContext  from "./noteContext";


const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "621e30d4aa23e28f35accb71",
          "user": "621ba60f861866e75a717623",
          "title": "3rd Project",
          "description": "This is my 3rd Project",
          "tag": "public",
          "date": "2022-03-01T14:42:28.465Z",
          "__v": 0
        },
        {
          "_id": "621e30d4aa23e28f35accb71",
          "user": "621ba60f861866e75a717623",
          "title": "3rd Project",
          "description": "This is my 3rd Project",
          "tag": "public",
          "date": "2022-03-01T14:42:28.465Z",
          "__v": 0
        },
        {
          "_id": "621e30d4aa23e28f35accb71",
          "user": "621ba60f861866e75a717623",
          "title": "3rd Project",
          "description": "This is my 3rd Project",
          "tag": "public",
          "date": "2022-03-01T14:42:28.465Z",
          "__v": 0
        },
        {
          "_id": "621e30d4aa23e28f35accb71",
          "user": "621ba60f861866e75a717623",
          "title": "3rd Project",
          "description": "This is my 3rd Project",
          "tag": "public",
          "date": "2022-03-01T14:42:28.465Z",
          "__v": 0
        },
        {
          "_id": "621e30d4aa23e28f35accb71",
          "user": "621ba60f861866e75a717623",
          "title": "3rd Project",
          "description": "This is my 3rd Project",
          "tag": "public",
          "date": "2022-03-01T14:42:28.465Z",
          "__v": 0
        },
        {
          "_id": "621e30d4aa23e28f35accb71",
          "user": "621ba60f861866e75a717623",
          "title": "3rd Project",
          "description": "This is my 3rd Project",
          "tag": "public",
          "date": "2022-03-01T14:42:28.465Z",
          "__v": 0
        },
        {
          "_id": "621e30d4aa23e28f35accb71",
          "user": "621ba60f861866e75a717623",
          "title": "3rd Project",
          "description": "This is my 3rd Project",
          "tag": "public",
          "date": "2022-03-01T14:42:28.465Z",
          "__v": 0
        },
        {
          "_id": "621e30d4aa23e28f35accb71",
          "user": "621ba60f861866e75a717623",
          "title": "3rd Project",
          "description": "This is my 3rd Project",
          "tag": "public",
          "date": "2022-03-01T14:42:28.465Z",
          "__v": 0
        },
        {
          "_id": "621e30d4aa23e28f35accb71",
          "user": "621ba60f861866e75a717623",
          "title": "3rd Project",
          "description": "This is my 3rd Project",
          "tag": "public",
          "date": "2022-03-01T14:42:28.465Z",
          "__v": 0
        },
        {
          "_id": "6220bc0c22d405cea0af5ba9",
          "user": "621ba60f861866e75a717623",
          "title": "1rd Project",
          "description": "This is my 1rd Project",
          "tag": "personal",
          "date": "2022-03-03T13:01:00.907Z",
          "__v": 0
        }
      ]

    const [notes, setNotes  ] = useState(notesInitial)
    
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;