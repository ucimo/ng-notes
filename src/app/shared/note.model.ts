export class Note {
  public title: string;
  public body: string;
  public id?: number;
  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
    this.id = Math.floor(Math.random() * 100000);
  }
}
