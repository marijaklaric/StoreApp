import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {
  public year: number;
  constructor() { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

}
