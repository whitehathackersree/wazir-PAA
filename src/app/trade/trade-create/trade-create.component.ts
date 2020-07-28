import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TradeService } from '../trade.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Trade } from '../trade.model';

@Component({
  selector: 'app-trade-create',
  templateUrl: './trade-create.component.html',
  styleUrls: ['./trade-create.component.css']
})
export class TradeCreateComponent implements OnInit {

  form: FormGroup = this.fb.group({
    title: [null, Validators.required],
    body: [null, Validators.required]
  });

  trade: Trade;

  constructor(
    public dialogRef: MatDialogRef<TradeCreateComponent>,
    private fb: FormBuilder,
    private tradeService: TradeService,
    @Inject(MAT_DIALOG_DATA) data: Trade
  ) {
    this.trade = data;
  }

  ngOnInit(): void {
    if(this.trade){
      this.form.controls.title.setValue(this.trade.title);
      this.form.controls.body.setValue(this.trade.body);
    }
  }

  submit(){
    this.tradeService.create$(this.form.value).subscribe(r=>{
      this.dialogRef.close(r);
    })
  }

  update(){
    let payload = this.form.value;
    payload.id = this.trade.id;
    this.tradeService.update$(<Trade>payload).subscribe(r=>{
      this.dialogRef.close(r);
    })
  }

}
