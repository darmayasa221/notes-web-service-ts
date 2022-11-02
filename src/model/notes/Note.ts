import InvariantError from "Exceptions/InvariantError";

export interface INote {
  title: string;
  body: string;
  tags: Array<string>;
}
export interface INoteRequestBody extends INote {}
export default class Note implements INote {
  public title: string;

  public body: string;

  public tags: Array<string>;

  constructor(payload: INote) {
    this.verifyPayload(payload);
    const { title, body, tags } = payload;
    this.title = title;
    this.body = body;
    this.tags = tags;
  }

  private verifyPayload(payload: INote) {
    const { title, body } = payload;
    if (!title || !body) {
      throw new InvariantError("title and body is required");
    }
  }
}
