import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from "@angular/animations";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Note } from "src/app/shared/note.model";
import { NotesService } from "src/app/shared/notes.service";

@Component({
  selector: "app-notes-list",
  templateUrl: "./notes-list.component.html",
  styleUrls: ["./notes-list.component.scss"],

  ///////////////////////////////////////
  //  component ANIMATION
  ///////////////////////////////////////

  animations: [
    trigger("itemAnim", [
      // entry animation
      // from none existance (void) in DOM to any state
      transition("void => *", [
        // initial state
        style({
          height: 0,
          opacity: 0,
          transform: "scale(0.85)",
          marginBottom: 0,
          padding: 0 // we might need to 'spread' (top,left...) padding for some browsers
        }),
        // animating spacing
        animate(
          "50ms",
          style({
            height: "*",
            padding: "*"
          })
        ),
        animate(200)
      ]),
      // form any state to void
      transition("* => void", [
        animate(
          50,
          style({
            transform: "scale(1.05)"
          })
        ),
        // make it grow, then shrink
        animate(
          50,
          style({
            transform: "scale(1)",
            opacity: 0.8
          })
        ),
        animate(
          "120ms ease-out",
          style({
            opacity: 0,
            transform: "scale(0.6)"
          })
        ),
        // then animate spacing
        animate(
          "150ms ease-out",
          style({
            height: 0,
            marginBottom: 0,
            padding: 0
          })
        )
      ])
    ]),

    trigger("listAnim", [
      // from any state to any state
      transition("* => *", [
        query(
          // :enter is like a pseudo element, so it is applied on all entering el.
          ":enter",
          [
            style({
              opacity: 0,
              height: 0
            }),
            stagger(100, [animate("200ms ease")])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})

///////////////////////////////////////
//  component LOGIC
///////////////////////////////////////
export class NotesListComponent implements OnInit, OnDestroy {
  faSearch = faSearch;

  notes: Note[] = [];
  noteSubscription: Subscription;
  uniqueFilterTerms: any = [];

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

  getFilteringTerms(query: string) {
    query = query.toLocaleLowerCase().trim();
    // split up the search query into individual words
    let terms: string[] = query.split(" ");
    // remove duplicate terms, by adding array items to a set
    let uniqueFilterTerms = new Set<string>();

    // set by definition doesn't allow duplicate values
    terms.forEach(term => uniqueFilterTerms.add(term));

    // use uniqueTerm to filter out notes with pipe
    this.uniqueFilterTerms = uniqueFilterTerms;
  }

  ngOnDestroy() {
    this.noteSubscription.unsubscribe();
  }
}
