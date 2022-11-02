import { INote } from "./Note";

export interface INewNote extends INote {
  id: string;
  createdAt: string;
  updatedAt: string;
}
export default class NewNote implements INewNote {
  public id: string;

  public title: string;

  public body: string;

  public tags: Array<string>;

  public createdAt: string;

  public updatedAt: string;

  constructor(payload: INewNote) {
    this.verifyPayload(payload);
    const { id, title, body, tags, createdAt, updatedAt } = payload;
    this.id = id;
    this.title = title;
    this.body = body;
    this.tags = tags;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  private verifyPayload(paylaod: INewNote) {
    const { id, title, body, createdAt, updatedAt } = paylaod;
    if (!id || !title || !body || !createdAt || !updatedAt) {
      throw new Error("NEW_NOTE.NOT_CONTAINT_NEEDED_PROPERTY");
    }
  }
}
