import express from "express";
import { createNote, deleteNote, getNote, updateNote } from "../controller/NoteController.js";

const router = express.Router();

router.get('/note', getNote);
router.post('/tambah-note', createNote);
router.put('/edit-note/:id', updateNote);
router.delete('/delete-note/:id', deleteNote);

export default router;