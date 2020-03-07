import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input
} from "@angular/core";

import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { NotesService } from "../shared/notes.service";

@Component({
  selector: "app-note-card",
  templateUrl: "./note-card.component.html",
  styleUrls: ["./note-card.component.scss"]
})
export class NoteCardComponent implements OnInit, AfterViewInit {
  faWindowClose = faWindowClose;

  @Input() title: string;
  @Input() body: string;
  @Input() id: number;

  @ViewChild("bodyContainer") bodyContainer: ElementRef<HTMLElement>;
  @ViewChild("textFadeout") textFadeout: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private notesService: NotesService
  ) { }

  ngOnInit() {
    // let style = window.getComputedStyle(this.bodyContainer.nativeElement, null);
    // let viewableHeight = parseInt(style.getPropertyValue("height"), 10);
    // let scrollableHeight = parseInt(style.getPropertyValue("scrollHeight"), 10);
    // console.log(style, "bodyContainer  text");
    // console.log(viewableHeight, scrollableHeight);
    // const { offsetHeight, scrollHeight } = this.bodyContainer.nativeElement;
    // console.log(offsetHeight, scrollHeight);
    // if (offsetHeight >= scrollHeight) {
    //   // if there is no text overflow
    //   this.renderer.setStyle(this.textFadeout.nativeElement, "display", "none");
    // }
  }
  ngAfterViewInit() {
    const { offsetHeight, scrollHeight } = this.bodyContainer.nativeElement;
    if (offsetHeight >= scrollHeight) {
      // if there is no text overflow
      this.renderer.setStyle(this.textFadeout.nativeElement, "display", "none");
    }
  }

  onManage() {
    this.router.navigate(["/edit/", this.id]);
  }

  onDelete() {
    this.notesService.delete(this.id);
  }
}
