import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import { NotesService } from "src/app/shared/notes.service";

@Component({
  selector: "app-note-details",
  templateUrl: "./note-details.component.html",
  styleUrls: ["./note-details.component.scss"]
})
export class NoteDetailsComponent implements OnInit {
  id: number;
  editMode = false;
  loading = false;
  @ViewChild("noteForm") noteForm: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = !!params["id"];
    });
  }

  ngAfterViewInit() {
    if (this.editMode) {
      const editNote = this.notesService.getNote(this.id);
      setTimeout(() => {
        this.noteForm.setValue({ title: editNote.title, body: editNote.body });
      }, 50);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      setTimeout(() => {
        console.log("noteForm", this.noteForm);
        // add/edit to sevice
        if (this.editMode) {
          this.notesService.edit(this.id, form.value);
          // toastr
        } else {
          this.notesService.add(form.value);
          // toastr
        }

        this.loading = false;
        this.router.navigate(["/"]);
      }, Math.floor(Math.random() * 2000));
    }
  }

  onCancel() {
    this.router.navigate(["/"]);
  }
}
