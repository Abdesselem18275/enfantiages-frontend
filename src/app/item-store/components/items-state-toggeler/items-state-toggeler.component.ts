import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ItemState } from 'src/app/core/models/item-models';
import { APP_ITEM_STATE_QUERY_PARAM_KEY } from 'src/app/injectables';
@Component({
  selector: 'app-items-state-toggeler',
  templateUrl: './items-state-toggeler.component.html',
  styleUrls: ['./items-state-toggeler.component.scss']
})
export class ItemsStateToggelerComponent implements OnInit {
  toggelerData : {key:string,value:string}[] = [{key:'all',value:ItemState.ALL},{key:'sold',value:ItemState.SOLD},{key:'AVAILABLE',value:ItemState.AVAILABLE}]
  activeOption$ : Observable<string>
  constructor(private router : Router,@Inject(APP_ITEM_STATE_QUERY_PARAM_KEY) private paramKey: string,private route : ActivatedRoute) { 
    this.activeOption$ = this.route.queryParamMap.pipe(
      take(1),
      map(params => params.has(this.paramKey) ? params.get(this.paramKey): ItemState.ALL )
    )
  }

  ngOnInit(): void {
  }
  onChange(event:MatButtonToggleChange) :void {
    console.warn(event.value)
    const navExtra : NavigationExtras = {
      queryParams : {
        [this.paramKey]:event.value,
        ordering : event.value === ItemState.SOLD ? 'sale_date' : ''
      },
      skipLocationChange : false
    }
    this.router.navigate(['/item-store/items-viewer'],navExtra)
  }
}
