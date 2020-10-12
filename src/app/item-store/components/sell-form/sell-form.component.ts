import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemFormFactoryService } from '../../service/item-form-factory-service/item-form-factory.service';
@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.scss']
})
export class SellFormComponent implements OnInit {
  sellForm : FormGroup
  constructor(private iffs : ItemFormFactoryService) {
    this.sellForm = this.iffs.sellForm
  }

  ngOnInit(): void {
  }

}
