import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  @Output() term = new EventEmitter<string>() 
  searchControl = new FormControl('')
  constructor() {
    this.searchControl.valueChanges.pipe(debounceTime(200)).subscribe((val) =>
      this.term.emit(val)
    )
   }
}
