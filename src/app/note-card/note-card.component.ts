import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input
} from "@angular/core";

import { faWindowClose } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-note-card",
  templateUrl: "./note-card.component.html",
  styleUrls: ["./note-card.component.scss"]
})
export class NoteCardComponent implements OnInit, AfterViewInit {
  faWindowClose = faWindowClose;

  @Input() title: string;
  @Input() body: string;

  @ViewChild("bodyContainer") bodyContainer: ElementRef<HTMLElement>;
  @ViewChild("textFadeout") textFadeout: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

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

  consoleBody() {
    const { offsetHeight, scrollHeight } = this.bodyContainer.nativeElement;
    console.log(offsetHeight, scrollHeight);
  }
}
