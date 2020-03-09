import { Pipe, PipeTransform } from "@angular/core";
import { Note } from "./note.model";

@Pipe({
  name: "filterPipe"
})
export class FilterPipePipe implements PipeTransform {
  transform(notes: Note[], uniqueTerms: string): Note[] {
    if (!notes || !uniqueTerms) {
      return notes;
    }

    let filteredNotes = notes.filter(note => {
      for (let term of uniqueTerms) {
        // if this note DOESN'T include ANY (even just one) of unique terms
        if (
          !(
            note.title.toLowerCase().includes(term) ||
            note.body?.toLowerCase().includes(term)
          )
        ) {
          // return false to indicate mismatch in filter method
          // so that pipe doesn't include this note
          return false;
        }
      }
      return true;
    });

    return filteredNotes;
  }
}
