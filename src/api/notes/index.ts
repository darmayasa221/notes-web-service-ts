import { Router } from "express";
import NotesHandlers from "@api/notes/handler";
import NotesService from "@services/inMemory/NotesService";
import routes from "./routes";

export default (option: { router: Router }) => {
  const notesServices = new NotesService();
  const notesHandlers = new NotesHandlers(notesServices);
  routes(option.router, notesHandlers);
};
