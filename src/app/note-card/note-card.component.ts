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
  @ViewChild("bodyText") bodyText: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // let style = window.getComputedStyle(this.cardBody.nativeElement, null);
    // // let viewableHeight = parseInt(style.getPropertyValue("height"), 10);
    // // let scrollableHeight = parseInt(style.getPropertyValue("scrollHeight"), 10);
    // console.log(style, "body  text");
    // console.log(viewableHeight, scrollableHeight);
  }
  ngAfterViewInit() {
    // let bodyStyle = window.getComputedStyle(this.body.nativeElement, null);
    // let viewableHeight = parseInt(style.getPropertyValue("height"), 10);
    // let scrollableHeight = parseInt(style.getPropertyValue("scrollHeight"), 10);

    console.log(this.body.nativeElement.style.height, "body  h");
  }

  consoleBody() {
    console.log(this.body, "body  text");
    console.log(this.body.nativeElement.scrollHeight, "body  scrollHeight");
    console.log(this.body.nativeElement.offsetHeight, "body  offsetHeight");
  }
}
