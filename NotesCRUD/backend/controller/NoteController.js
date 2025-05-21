import { hasSubscribers } from "diagnostics_channel";
import Note from "../model/NoteModel.js";

export const getNote = async(req, res)=>{
    try {
        const response = await Note.findAll();
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}

export const createNote = async(req, res)=>{
    try {
        await Note.create(req.body);
        res.status(201).json({msg: "note created"})
    } catch (error) {
        console.log(error.message);
    }
}

//update
export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;

        // Cek apakah note dengan ID tersebut ada
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).json({ message: "Note tidak ditemukan" });
        }

        // Lakukan update
        await Note.update(req.body, { where: { id } });

        res.status(200).json({ message: "Note berhasil diubah" });
    } catch (error) {
        console.error("Error saat update:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

//delete
export const deleteNote = async (req, res) => {
    await Note.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({
        message: "note berhasil dihapus"
    })

}