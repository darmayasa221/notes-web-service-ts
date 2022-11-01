import { INote } from "@model/notes/index";
import { TypeResponse } from "@model/response";
import { INotesService } from "@services/inMemory/NotesService";
import { Request, response, Response } from "express";

export interface INotesHandlers {
  getNotesHandler(req: Request, res: Response<TypeResponse>): void;
  getNoteHandler(req: Request, res: Response<TypeResponse>): void;
  postNotesHandler(req: Request, res: Response<TypeResponse>): void;
  putNoteHandler(req: Request, res: Response<TypeResponse>): void;
  deleteNoteHandler(req: Request, res: Response<TypeResponse>): void;
}
export default class NotesHandlers implements INotesHandlers {
  private service: INotesService;

  constructor(service: INotesService) {
    this.service = service;
    this.getNoteHandler = this.getNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.postNotesHandler = this.postNotesHandler.bind(this);
    this.putNoteHandler = this.putNoteHandler.bind(this);
    this.deleteNoteHandler = this.deleteNoteHandler.bind(this);
  }

  getNoteHandler(
    req: Request<{ noteId: string }>,
    res: Response<TypeResponse>,
  ): void {
    const { noteId } = req.params;
    const note = this.service.getNote(noteId);
    res.status(200).json({ status: "success", data: { note } });
  }

  getNotesHandler(req: Request, res: Response<TypeResponse>): void {
    const notes = this.service.getNotes();
    res.status(200).json({ status: "success", data: { notes } });
  }

  postNotesHandler(req: Request, res: Response<TypeResponse>): void {
    const note: INote = req.body;
    const noteId = this.service.addNote(note);
    res.status(201).json({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: { noteId },
    });
  }

  putNoteHandler(
    req: Request<{ noteId: string }>,
    res: Response<TypeResponse>,
  ): void {
    const { noteId } = req.params;
    const note: INote = req.body;
    this.service.editNote(note, noteId);
    res.status(200).json({
      status: "success",
      message: "Catatan berhasil diperbarui",
    });
  }

  deleteNoteHandler(
    req: Request<{ noteId: string }>,
    res: Response<TypeResponse>,
  ): void {
    const { noteId } = req.params;
    this.service.deleteNote(noteId);
    res.status(200).json({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
  }
}
