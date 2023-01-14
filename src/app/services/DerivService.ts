import { Injectable } from "@angular/core";
import { WebSocket } from 'ws';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DerivClientService {

  private ws: WebSocket | null = null;

  private startConnection() {
    this.ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?' + `app_id=31293`)

    //Event subscriptions
    //open
    this.ws.on("open", () => {
      this.authenticate();
      setTimeout(() => {
        this.getOlhcByPeriod('latest', 600)
      }, 10000)
    })
    //message
    this.ws.on("message", async (res) => {
      const eventRawObj = JSON.parse(res.toString()) as any;

      let { candles } = eventRawObj;
      if(candles){
      this.http.post('http://localhost:3000/api/predictFutureOlhc', { olhc: candles[1] }).subscribe((res) => {
          console.log(res);
      })
    }

    });


  }

  constructor(private http: HttpClient) {
    this.startConnection();
  }

  authenticate() {
    let authObj = { authorize: '6mdGWXGXwaDyMtC' }
    this.ws?.send(JSON.stringify(authObj));
  }

  sendRequest(request: any) {
    console.log(JSON.stringify(request))
    this.ws?.send(JSON.stringify(request));
  }

  getOlhcByPeriod(lastEpochWanted: string, granurality: number) {
    let request = {
      ticks_history: "R_50",
      adjust_start_time: 1,
      end: lastEpochWanted,
      style: "candles",
      granularity: 600,
      count: 1000
    };
    this.ws?.send(JSON.stringify(request));
  }
}
