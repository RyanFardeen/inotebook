const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require("express-validator");
const Note = require("../models/Notes");


// ROUTE 1 : For fetching all notes ,login required   GET : /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.messsage);
        res.status(500).send("INTERNAL SERVER ERROR");
    }

})



// ROUTE 2: Auth required for creating Notes   POST : /api/notes/addnote
router.post("/addnote", fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters long").isLength({ min: 5, }),
],
    async (req, res) => {
        const { title, description, tag } = req.body

        // if errors it will return a bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const note = new Note({ title, description, tag, user: req.user.id })
            const savedNote = await note.save()
            res.json(savedNote)
        } catch (error) {
            console.error(error.messsage);
            res.status(500).send("INTERNAL SERVER ERROR");
        }
    })


// ROUTE 3 : updating note based on note id and Login required  PUT : /api/notes/updatenote/:id
router.put("/updatenote/:id", fetchuser, async (req, res) => {

    const { title, description, tag } = req.body

    try {
        //Create a newNote Object
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }


        //Checks whether note with the above id is present or not
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("NOT FOUND") }

        //checks whether id in the note object belongs to the logged in user ,if not return NOT ALLOWED
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("NOT ALLOWED")
        }

        note = await Note.findByIdAndUpdate(req.params.id, newNote)
        res.json(note)

    } catch (error) {
        console.error(error.messsage);
        res.status(500).send("INTERNAL SERVER ERROR");
    }
})



// ROUTE 4 : deleting note based on note id and Login required  DELETE : /api/notes/deletenote/:id
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        //Checks whether note with the above id is present or not
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("NOT FOUND") }

        //checks whether id in the note object belongs to the logged in user ,if not return NOT ALLOWED
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("NOT ALLOWED")
        }

        //delting the note
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success" : "Note has been deleted successfully" , note : note})

    } catch (error) {
        console.error(error.messsage);
        res.status(500).send("INTERNAL SERVER ERROR");
    }
   
})



module.exports = router