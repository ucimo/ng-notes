import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Note } from "src/app/shared/note.model";
import { NotesService } from "src/app/shared/notes.service";

@Component({
  selector: "app-notes-list",
  templateUrl: "./notes-list.component.html",
  styleUrls: ["./notes-list.component.scss"]
})
export class NotesListComponent implements OnInit, OnDestroy {
  faSearch = faSearch;

  notes: Note[] = [];
  noteSubscription: Subscription;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notes = this.notesService.getNotes();
    this.noteSubscription = this.notesService.notesChanged.subscribe(
      (notes: Note[]) => {
        this.notes = notes;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.noteSubscription.unsubscribe();
  }
}
