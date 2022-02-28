const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require("express-validator");
const Note = require("../models/Notes");

// ROUTE 1 : For fetching all notes ,login required   GET : /api/notes/fetchallnotes
router.get('/fetchallnotes',fetchuser, async (req, res) => {

    try {
        const notes = await  Note.find({user : req.user.id})
    res.json(notes);
    } catch (error) {
        console.error(error.messsage);
        res.status(500).send("INTERNAL SERVER ERROR");
    }
    
})



// ROUTE 2: Auth required for creating Notes   POST : /api/notes/addnote
router.post("/addnote" ,fetchuser ,[
      body("title", "Enter a valid title").isLength({ min: 3 }),
      body("description", "Description must be atleast 5 characters long").isLength({min: 5,}),
    ] ,
    async (req, res) => {
    const {title, description, tag} = req.body

    // if errors it will return a bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = new Note({title, description, tag, user: req.user.id})
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.messsage);
        res.status(500).send("INTERNAL SERVER ERROR");
    }
})



router.post("/addnote" ,fetchuser ,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters long").isLength({min: 5,}),
  ] ,
  async (req, res) => {
  const {title, description, tag} = req.body


module.exports = router