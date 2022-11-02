import { INote } from "./Note";

export interface INoted extends INote {
  id: string;
}

export default class Noted implements INoted {
  public id: string;

  public title: string;

  public body: string;

  public tags: Array<string>;

  constructor(payload: INoted) {
    this.verifyPayload(payload);
    const { id, title, body, tags } = payload;
    this.id = id;
    this.title = title;
    this.body = body;
    this.tags = tags;
  }

  private verifyPayload(payload: INoted) {
    const { id, title, body } = payload;
    if (!id || !title || !body) {
      throw new Error("NOTED.NOT_CONTAINT_NEEDED_PROPERTY");
    }
  }
}
