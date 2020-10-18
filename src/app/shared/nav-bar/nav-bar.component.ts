import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Output() sideNavToggeler= new EventEmitter<boolean>(false)
  constructor() { }

  ngOnInit(): void {
  }
  toggelSideNav() {
    this.sideNavToggeler.emit(null)
  }
}
