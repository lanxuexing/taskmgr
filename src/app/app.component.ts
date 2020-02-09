import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { darkTheme } from './configs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  toggleTheme = false; // 切换主题，默认白天模式

  constructor(
    private overlayContainer: OverlayContainer
  ) { }

  switchTheme(mEvent: boolean) {
    this.toggleTheme = mEvent;
    // 切换Dialog、Select、menu等等浮窗的主题色，即：叠加
    if (mEvent) {
      this.overlayContainer.getContainerElement().classList.add(darkTheme);
    } else {
      this.overlayContainer.getContainerElement().classList.remove(darkTheme);
    }
  }

  // 切换主题
  onToggleTheme() {
    return this.toggleTheme ? darkTheme : null;
  }

}
