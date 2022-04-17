const {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
  getNote,
} = require("../Controllers/noteControllers");

const auth = require("../Middleware/auth");
const router = require("express").Router();

router.route("/")
  .get(auth, getNotes)

  .post(auth, createNote);

router.route("/:id")
  .get(auth, getNote)
  .put(auth, updateNote)
  .delete(auth, deleteNote);

module.exports = router;
