import NewNote, { INewNote } from "@model/notes/NewNote";
import Note, { INote } from "@model/notes/Note";
import Noted, { INoted } from "@model/notes/Noted";
import InvariantError from "Exceptions/InvariantError";
import NotFoundError from "Exceptions/NotFoundError";
import { nanoid } from "nanoid";

export interface INotesService {
  addNoteQuick(): string;
  addNoteSpecific(arg: INote): string;
  getNotes(): Array<INewNote>;
  getNote(noteId: string): INoted;
  editNote(arg: INote, noteId: string): void | Error;
  deleteNote(noteId: string): void | Error;
}

export default class NotesService implements INotesService {
  private notes: Array<INewNote>;

  constructor() {
    this.notes = [];
  }

  addNoteQuick(): string {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const noteData: INewNote = {
      title: "Quick Note",
      tags: ["tag one"],
      body: "first note",
      id,
      createdAt,
      updatedAt,
    };
    this.notes.push(noteData);
    const isSuccess = this.notes.filter((note) => note?.id === id).length > 0;
    if (!isSuccess) {
      throw new InvariantError("catatan gagal di tambahkan");
    }
    return id;
  }

  addNoteSpecific(arg: INote): string {
    // validation payload
    const newArg = new Note(arg);
    const { body, tags, title } = newArg;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const noteData: INewNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updatedAt,
    };
    // validation payload before save data
    const newNote = new NewNote(noteData);
    this.notes.push(newNote);
    const isSuccess = this.notes.filter((note) => note?.id === id).length > 0;
    if (!isSuccess) {
      throw new InvariantError("catatan gagal di tambahkan");
    }
    return id;
  }

  getNotes(): INewNote[] {
    return this.notes;
  }

  getNote(noteId: string): INoted {
    const index: number = this.notes.findIndex((notes) => notes.id === noteId);
    if (index === -1) {
      throw new NotFoundError("Catatan tidak ditemukan");
    }
    const note = this.notes[index];
    const newNoteFormat: INoted = {
      id: note.id,
      title: note.title,
      body: note.body,
      tags: note.tags,
    };
    // validation before send to client
    const noted = new Noted(newNoteFormat);
    return noted;
  }

  editNote(arg: INote, noteId: string): void | Error {
    const index: number = this.notes.findIndex((notes) => notes.id === noteId);
    if (index === -1) {
      throw new NotFoundError("Catatan tidak ditemukan");
    }
    // validation payload
    const note = new Note(arg);
    this.notes[index] = {
      ...this.notes[index],
      ...note,
    };
  }

  deleteNote(noteId: string): void | Error {
    const index: number = this.notes.findIndex((notes) => notes.id === noteId);
    if (index === -1) {
      throw new NotFoundError("Catatan tidak ditemukan");
    }
    this.notes.splice(index, 1);
  }
}
