import { Injectable } from "@angular/core";
import { Note } from "./note.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NotesService {
  public notesChanged = new Subject<Note[]>();
  private notes: Note[] = [];

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
    this.updateLocalStorage();
  }

  edit(id: number, newFormData: { title: string; body: string }) {
    let noteIndex;
    this.notes.find((note, i) => {
      noteIndex = i;
      return id === note.id;
    });
    this.notes[noteIndex] = { id, ...newFormData };
    this.notesChanged.next(this.notes.slice());
    this.updateLocalStorage();
  }

  delete(id: number) {
    let noteIndex;
    this.notes.find((note, i) => {
      noteIndex = i;
      return id === note.id;
    });
    this.notes.splice(noteIndex, 1);
    this.notesChanged.next(this.notes.slice());
    this.updateLocalStorage();
  }

  checkLocalStorage() {
    if (!localStorage.notes) {
      const startingNotes = [
        new Note(
          "Zeroth note",
          "These notes are now in your local starge. You won't be able to see them again if you delete them, unless you manually clear the whole storage."
        ),
        new Note("First note", "Little content, no text fadeout."),
        new Note(
          "Second note",
          "Delete me! Observe the angular animation's beauty."
        ),
        new Note(
          "Third note",
          "When creating a new note, save button has a fake loading in order to provide 'waiting for server' feel."
        ),
        new Note(
          "Fourth note",
          "Bigger content, fadeout applied. /nLorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, optio eligendi! Quisquam voluptatem tempore dolore impedit sapiente excepturi doloremque aliquam repellendus! Explicabo ab placeat inventore vel quo, odit magni perferendis."
        )
      ];
      localStorage.setItem("notes", JSON.stringify(startingNotes));
      this.notes = [...startingNotes];
    } else {
      let localStorageString = localStorage.getItem("notes");
      this.notes = JSON.parse(localStorageString);
    }
    console.log(localStorage.notes);
  }

  updateLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }
}
