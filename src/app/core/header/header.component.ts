import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBar = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  openDrawer() {
    this.toggleSideBar.emit();
  }

  slideToggleChange(mEvent: MatSlideToggleChange) {
    this.toggleTheme.emit(mEvent.checked);
  }

}
