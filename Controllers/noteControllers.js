const Notes = require("../Model/noteModel");

const noteController = {
  //get all notes
  getNotes: async (req, res) => {
    try {
      //res.json({id: req.user.id});
      const notes = await Notes.find({ user_id: req.user.id });
      res.json(notes);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //create note
  createNote: async (req, res) => {
    try {
      const { title, content, date } = req.body;
      const newNote = new Notes({
        title,
        content,
        date,
        user_id: req.user.id,
        name: req.user.name,
      });
      //res.json({ user_id: req.user.id, name: req.user.name });
      //res.json(newNote)
      await newNote.save();
      res.json({ msg: "Note created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //delete note
  deleteNote: async (req, res) => {
    try {
      await Notes.findByIdAndDelete(req.params.id);
      res.json({ msg: "Note deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //update note
  updateNote: async (req, res) => {
    try {
      const { title, content, date } = req.body;
      await Notes.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          content,
          date,
        }
      );
      res.json({ msg: "Note updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //get praticular note
  getNote: async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      res.json(note);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = noteController;
