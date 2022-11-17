import { Router } from "express";
import { INotesHandlers } from "./handler";

export default (router: Router, handler: INotesHandlers) => [
  router.get("/notes", handler.getNotesHandler),
  router.get("/notes/:noteId", handler.getNoteHandler),
  router.post("/notes/:type?", handler.postNoteHandler),
  router.put("/notes/:noteId", handler.putNoteHandler),
  router.delete("/notes/:noteId", handler.deleteNoteHandler),
];
