export interface INote {
  title: string;
  body: string;
  tags: Array<string>;
}
export interface INoteRequestBody extends INote {}
export interface INewNote extends INote {
  id: string;
  createdAt: string;
  updatedAt: string;
}
export interface INoted extends INote {
  id: string;
}
