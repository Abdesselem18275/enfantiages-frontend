import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'enfantiages';
  @ViewChild('drawer') drawer : MatDrawer
  constructor(private router : Router,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon('under-construction-page', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/under-construction-page.svg'))

  }
  ngAfterViewInit(): void {
    this.router.events.subscribe(() => {
      if(this.drawer) {
        this.drawer.close()

      }
   });
  }
  toggleSideNav() {
    this.drawer.toggle()
  }
}
