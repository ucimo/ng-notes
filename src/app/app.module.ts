import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FilterPipePipe } from "./shared/filter-pipe.pipe";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { NotesListComponent } from "./pages/notes-list/notes-list.component";
import { MainLayoutComponent } from "./pages/main-layout/main-layout.component";
import { NoteCardComponent } from "./note-card/note-card.component";
import { NoteDetailsComponent } from "./pages/note-details/note-details.component";

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    MainLayoutComponent,
    NoteCardComponent,
    NoteDetailsComponent,
    FilterPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
