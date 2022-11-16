export default abstract class ClientError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "ClientError";
    this.message = message;
    this.statusCode = statusCode;
  }
}
