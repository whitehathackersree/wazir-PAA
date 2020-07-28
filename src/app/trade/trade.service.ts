import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, OperatorFunction } from 'rxjs';
import { Trade } from './trade.model';
import { StorageService } from '../helpers/storage.service';
import { AuthService } from '../auth/auth.service';
import { flatMap, map, tap } from 'rxjs/operators';
import { UserService } from '../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private tradesSubject: BehaviorSubject<Trade[]> = new BehaviorSubject<Trade[]>(this.storage.get("trades") || []);
  public trades$: Observable<Trade[]> = this.tradesSubject.asObservable();

  constructor(
    private storage: StorageService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  public get trades(): Trade[]{
    return this.tradesSubject.value;
  }

  public set trades(trades){
    this.storage.set("trades", trades);
    this.tradesSubject.next(trades);
  }

  create$(trade: Trade): Observable<Trade>{
    let user = this.authService.userValue;
    trade.user = user.id;
    trade.id = this.trades.length+1;
    trade.created_at = new Date();
    this.trades = [trade, ...this.trades];
    return of(trade)
  }

  update$(trade: Trade): Observable<Trade>{
    let trades = [...this.trades];
    let trade_ = trades.filter(p=>p.id==trade.id)[0];
    trade = Object.assign(trade_, trade);
    this.trades = [trade, ...this.trades.filter(p=>p.id!=trade.id)];
    return of(trade)
  }


  get$(id: number): Observable<Trade>{
    let tradeq = this.trades.filter(p=>id==p.id);
    return tradeq?of(tradeq[0]):of(null);
  }

  query$(): Observable<Trade[]>{
    return this.trades$
  }

  delete(tradeId: number){
    this.trades = [...this.trades.filter(p=>p.id!=tradeId)];
  }

  attachUser = (): OperatorFunction<Trade, Trade> => {
    let trade_:Trade;
    return input$ => input$.pipe(
      tap(trade=>trade_=Object.assign({}, trade)),
      flatMap((trade: Trade)=>this.userService.get$(trade.user).pipe(
          map(user=>{
            trade_.user = user;
            return trade_;
          })
        )
      )
    );
  }
}
