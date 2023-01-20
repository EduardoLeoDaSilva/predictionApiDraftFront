import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { HttpClient } from '@angular/common/http';
import { tap, catchError, EMPTY, Subject, switchAll } from "rxjs";

@Injectable()
export class DerivClientService {

  private ws: WebSocketSubject<any> | undefined;
   subject = new Subject();

  private startConnection() {
    this.ws = webSocket('wss://ws.binaryws.com/websockets/v3?' + `app_id=31293`)

    //Event subscriptions
    //open


    let tt = false;

    this.ws.subscribe( {
          next: (res) => {
              setTimeout(() => {
                this.getOlhcByPeriod('latest', 600)
                tt = true;
              }, 10000)


            const eventRawObj = res;

            let { candles } = eventRawObj;
            if (candles) {
              console.log(candles[candles.length -2])
              this.http.post('http://localhost:3000/api/predictFutureOlhc', candles[candles.length -2], {
                headers: {'Content-type': 'application/json'}
              }).subscribe((res) => {
                this.subject.next(res);
                console.log(res);
              })
            }
          }
    })



    //message
    // this.ws.subscribe({
    //   next: (res) => {
    //     const eventRawObj = JSON.parse(res.toString()) as any;

    //     let { candles } = eventRawObj;
    //     if (candles) {
    //       this.http.post('http://localhost:3000/api/predictFutureOlhc', { olhc: candles[1] }).subscribe((res) => {
    //         console.log(res);
    //       })
    //     }

    //   }
    // });


  }

  constructor(private http: HttpClient) {
    this.startConnection();
  }

  authenticate() {
    let authObj = { authorize: '6mdGWXGXwaDyMtC' }
    this.ws?.next(authObj);
  }

  sendRequest(request: any) {
    console.log(JSON.stringify(request))
    this.ws?.next(request);
  }

  getOlhcByPeriod(lastEpochWanted: string, granurality: number) {
    let request = {
      ticks_history: "R_50",
      adjust_start_time: 1,
      end: lastEpochWanted,
      style: "candles",
      granularity: granurality,
      count: 100,
    };
    this.ws?.next(request);
  }
}
