import { Component, OnInit } from "@angular/core";

import { faFileMedical, faWrench } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"]
})
export class MainLayoutComponent implements OnInit {
  faFileMedical = faFileMedical;
  faWrench = faWrench;

  constructor() {}

  ngOnInit(): void {}
}
