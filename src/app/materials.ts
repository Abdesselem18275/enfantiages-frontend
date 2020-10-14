import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';




@NgModule({
  exports: [MatCheckboxModule,MatMenuModule,MatSnackBarModule,MatAutocompleteModule,MatDialogModule,MatListModule,MatTableModule,MatDividerModule, MatButtonModule, MatDividerModule,
            MatIconModule ,MatFormFieldModule,MatInputModule,MatSidenavModule,
            MatProgressBarModule,],
})
export class MaterialModule {}
