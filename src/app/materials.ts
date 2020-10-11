import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';




@NgModule({
  exports: [MatCheckboxModule, MatButtonModule, MatDividerModule,
            MatIconModule ,
            MatProgressBarModule,],
})
export class MaterialModule {}
