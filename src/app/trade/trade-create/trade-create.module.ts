import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeCreateComponent } from './trade-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TradeCreateComponent
  ],
  entryComponents: [
    TradeCreateComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TradeCreateComponent
  ]
})
export class TradeCreateModule { }
