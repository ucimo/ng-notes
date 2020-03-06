import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit
} from "@angular/core";

import { faWindowClose } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-note-card",
  templateUrl: "./note-card.component.html",
  styleUrls: ["./note-card.component.scss"]
})
export class NoteCardComponent implements OnInit, AfterViewInit {
  faWindowClose = faWindowClose;

  @ViewChild("body") body: ElementRef<HTMLElement>;
  @ViewChild("textFadeout") textFadeout: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // let style = window.getComputedStyle(this.body.nativeElement, null);
    // let viewableHeight = parseInt(style.getPropertyValue("height"), 10);
    // let scrollableHeight = parseInt(style.getPropertyValue("scrollHeight"), 10);
    // console.log(style, "body  text");
    // console.log(viewableHeight, scrollableHeight);
    // console.log(
    //   this.body.nativeElement.offsetHeight,
    //   "on init body  offsetHeight",
    //   this.body.nativeElement.scrollHeight,
    //   "on init body  scrollHeight"
    // );
  }
  ngAfterViewInit() {
    const { offsetHeight, scrollHeight } = this.body.nativeElement;
    console.log(offsetHeight, scrollHeight);
    if (offsetHeight > scrollHeight) {
      // if there is no text overflow
      this.renderer.setStyle(this.textFadeout.nativeElement, "display", "none");
    }
  }

  consoleBody() {
    const { offsetHeight, scrollHeight } = this.body.nativeElement;
    console.log(offsetHeight, scrollHeight);
  }
}
