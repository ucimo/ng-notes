import { Injectable } from "@angular/core";
import { Note } from "./note.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NotesService {
  public notesChanged = new Subject<Note[]>();
  private notes: Note[] = [
    new Note("Prva stavka", "Malo sadrzaja."),
    new Note(
      "Drva stavka",
      "Osrednje sadrzaja. Aliquid, optio eligendi! Quisquam voluptatem tempore dolore impedit sapiente excepturi doloremque aliquam repellendus! Explicabo ab placeat inventore vel quo, odit magni perferendis."
    ),
    new Note(
      "Treca stavka",
      "Vise sadrzaja. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, optio eligendi! Quisquam voluptatem tempore dolore impedit sapiente excepturi doloremque aliquam repellendus! Explicabo ab placeat inventore vel quo, odit magni perferendis."
    )
  ];

  constructor() {}

  getNotes() {
    return this.notes.slice();
  }

  getNote(id: number) {
    return this.notes.find(note => note.id === id);
  }

  add(note: Note) {
    this.notes.push(new Note(note.title, note.body));
    this.notesChanged.next(this.notes.slice());
  }

  edit(id: number, newFormData: { title: string; body: string }) {
    let noteIndex;
    this.notes.find((note, i) => {
      noteIndex = i;
      return id === note.id;
    });
    this.notes[noteIndex] = { id, ...newFormData };
    this.notesChanged.next(this.notes.slice());
  }

  delete(id: number) {
    let noteIndex;
    this.notes.find((note, i) => {
      noteIndex = i;
      return id === note.id;
    });
    this.notes.splice(noteIndex, 1);
    this.notesChanged.next(this.notes.slice());
  }
}
