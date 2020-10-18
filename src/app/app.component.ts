import { Component, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'enfantiages';
  @ViewChild('drawer') drawer : MatDrawer
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon('under-construction-page', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/under-construction-page.svg'))

  }
  toggleSideNav() {
    this.drawer.toggle()
  }
}
