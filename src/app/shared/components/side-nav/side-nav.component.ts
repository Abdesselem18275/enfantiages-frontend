import { Component, OnInit } from '@angular/core';
type SideNavLinkType = {icon : string , label:string, routerLink:string | any[]}
const LINKS : SideNavLinkType[] = [
  {
    icon : 'category',
    label:'Items',
    routerLink:['/item-store']
  },
  {
    icon : 'people',
    label:'Customers',
    routerLink:['/customers']
  },
  {
    icon : 'analytics',
    label:'Statistics',
    routerLink:['/analytics']
  },
]
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  links :SideNavLinkType[] = LINKS
  constructor() { }

  ngOnInit(): void {
  }

}
