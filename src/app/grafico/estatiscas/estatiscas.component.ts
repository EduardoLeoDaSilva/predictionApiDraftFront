import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
// import * as Plotly from 'plotly.js';
// import * as Plotly from 'plotly.js';
import * as Plotly from 'plotly.js-dist-min'
import { DerivClientService } from 'src/app/services/DerivService';
// import { DerivClientService } from 'src/app/services/DerivService';
type responseType = {
  precoReais: any;
  smaTreinado: any;
  treinado: any;
  previsto: any
}

type responseType2 = {
  precoReais: any;
  smaTreinado: any;
  treinado: any;
  previsto: any
}

@Component({
  templateUrl: './estatiscas.component.html',
  styleUrls: ['./estatiscas.component.css']
})
export class EstatiscasComponent implements OnInit, AfterViewInit {


  realPriceCandle: any;
  candleTrained: any;
  candlePredicted: any;
  graph_plot: any;
  candles_predicted: any[] = [];
  constructor(private http: HttpClient, private rd: Renderer2, private deriv: DerivClientService) {

  }
  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


  }

  async ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.realPriceCandle = document.getElementById('candleReal') as HTMLElement;
    this.candleTrained = document.getElementById('candleTrained') as HTMLElement;
    this.candlePredicted = document.getElementById('candlePredicted') as HTMLElement;
    this.graph_plot = document.getElementById('grafico') as HTMLElement;


    this.getTrainingAndValidations()


    // this.http.get('http://localhost:3000/api/predictionRNN').subscribe((response) => {
    //   let tt = response as responseType;
    //   Plotly.newPlot(this.graph_plot, [{ x: tt.precoReais.epochs, y: tt.precoReais.prices, name: 'Preço Real' }]);
    //   Plotly.addTraces(this.graph_plot, [{ x: tt.smaTreinado.timestamps_b, y: tt.smaTreinado.sma, name: 'sma treinado' }]);
    //   Plotly.addTraces(this.graph_plot, [{ x: tt.treinado.timestamps_b, y: tt.treinado.values, name: 'Validação' }]);
    //   // Plotly.addTraces(this.graph_plot, [{ x: tt.previsto.timestamps_c, y: tt.previsto.values, name: 'previsão' }]);
    // });

    // this.http.get('http://localhost:3000/api/predictRNN3').subscribe((res) => {
    //    this.buildRealPrice(res);
    //    this.buildTrained(res);
    //    this.buildValidation(res);
    // })

    //obtendo cotações deriv em tempo real e prevendo e rednereziando na pagina
    // this.deriv.subject.subscribe((res: any) => {

    //   Plotly.newPlot(this.graph_plot, [{ x: res.precoReais.epochs, y: res.precoReais.prices, name: 'Preço Real' }]);
    //   // Plotly.addTraces(this.graph_plot, [{ x: res.smaTreinado.timestamps_b, y: res.smaTreinado.sma, name: 'sma treinado' }]);
    //   Plotly.addTraces(this.graph_plot, [{ x: res.treinado.timestamps_b, y: res.treinado.values, name: 'Validação' }]);
    //   Plotly.addTraces(this.graph_plot, [{ x: res.previsto.timestamps_e, y: res.previsto.values, name: 'previsão' }]);
    // })
  }

  formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  // getTrainingAndValidations(){

  //   this.http.get('http://localhost:3000/api/predictionRNN').subscribe((response:any) => {


  //   var real = {

  //     x: ['2023-01-25','2023-01-26','2023-01-27','2023-01-28','2023-01-29','2023-01-30','2023-01-31','2023-02-01','2023-02-02','2023-02-03','2023-02-04','2023-02-05','2023-02-06','2023-02-07','2023-02-08','2023-02-09','2023-02-10','2023-02-11','2023-02-12','2023-02-13','2023-02-14','2023-02-15','2023-02-16','2023-02-17','2023-02-18','2023-02-19','2023-02-20','2023-02-21','2023-02-22','2023-02-23'],

  //     close: response.real.close,

  //     decreasing: {line: {color: 'red'}},

  //     high: response.real.high,

  //     increasing: {line: {color: 'green'}},

  //     line: {color: 'rgba(31,119,180,1)'},
  //     name: 'Real',
  //     low: response.real.low,

  //     open: response.real.open,

  //     type: 'candlestick',
  //     xaxis: 'x',
  //     yaxis: 'y'
  //   };

  //   var validation:any = {

  //     x: ['2023-01-31','2023-02-01','2023-02-02','2023-02-03','2023-02-04','2023-02-05','2023-02-06','2023-02-07','2023-02-08','2023-02-09','2023-02-10','2023-02-11','2023-02-12','2023-02-13','2023-02-14','2023-02-15'],

  //     close: response.validation.close,

  //     decreasing: {line: {color: 'red'}},
  //     name: 'Validação',
  //     high: response.validation.high,

  //     increasing: {line: {color: 'green'}},

  //     line: {color: 'rgba(31,119,180,1)'},

  //     low: response.validation.low,

  //     open: response.validation.open,

  //     type: 'candlestick',
  //     xaxis: 'x',
  //     yaxis: 'y'
  //   };

  //   var prediction:any = {

  //     x: ['2023-02-15','2023-02-16','2023-02-17','2023-02-18','2023-02-19','2023-02-20','2023-02-21','2023-02-22','2023-02-23'],

  //     close: response.prediction.close,

  //     decreasing: {line: {color: 'red'}},
  //     name: 'Previsão',
  //     high: response.prediction.high,

  //     increasing: {line: {color: 'green'}},

  //     line: {color: 'rgba(31,119,180,1)'},

  //     low: response.prediction.low,

  //     open: response.prediction.open,

  //     type: 'candlestick',
  //     xaxis: 'x',
  //     yaxis: 'y'
  //   };

  //   var data:any = [real,validation,prediction];

  //   // var layout = {
  //   //   dragmode: 'zoom',
  //   //   margin: {
  //   //     r: 10,
  //   //     t: 25,
  //   //     b: 40,
  //   //     l: 60
  //   //   },
  //   //   showlegend: false,
  //   //   xaxis: {
  //   //     autorange: true,
  //   //     rangeslider: {range: ['2017-01-17 12:00', '2017-02-10 12:00']},
  //   //     title: 'Date',
  //   //     type: 'date'
  //   //   },
  //   //   yaxis: {
  //   //     autorange: true,
  //   //     type: 'linear'
  //   //   },

  //   //   annotations: [
  //   //     {
  //   //       x: '2017-01-31',
  //   //       y: 0.9,
  //   //       xref: 'x',
  //   //       yref: 'paper',
  //   //       text: 'largest movement',
  //   //       font: {color: 'magenta'},
  //   //       showarrow: true,
  //   //       xanchor: 'right',
  //   //       ax: -20,
  //   //       ay: 0
  //   //     }
  //   //   ],

  //   //   shapes: [
  //   //       {
  //   //           type: 'rect',
  //   //           xref: 'x',
  //   //           yref: 'paper',
  //   //           x0: '2017-01-31',
  //   //           y0: 0,
  //   //           x1: '2017-02-01',
  //   //           y1: 1,
  //   //           fillcolor: '#d3d3d3',
  //   //           opacity: 0.2,
  //   //           line: {
  //   //               width: 0
  //   //           }
  //   //       }
  //   //     ]
  //   // };

  //   Plotly.newPlot(this.candlePredicted, data);






  //     // let tt = response as responseType;
  //     // Plotly.newPlot(this.candlePredicted, [{ x: tt.precoReais.epochs, y: tt.precoReais.prices, name: 'Preço Real' }]);
  //     // Plotly.addTraces(this.candlePredicted, [{ x: tt.smaTreinado.timestamps_b, y: tt.smaTreinado.sma, name: 'sma treinado' }]);
  //     // Plotly.addTraces(this.candlePredicted, [{ x: tt.treinado.timestamps_b, y: tt.treinado.values, name: 'Validação' }]);
  //     // Plotly.addTraces(this.graph_plot, [{ x: tt.previsto.timestamps_c, y: tt.previsto.values, name: 'previsão' }]);
  //   });
  // }


  getTrainingAndValidations() {

    this.http.get('http://localhost:3000/api/predictionRNN').subscribe((response: any) => {


      var real = {

        x: response.real.timestamps,

        close: response.real.close,

        decreasing: { line: { color: 'red' } },

        high: response.real.high,

        increasing: { line: { color: 'green' } },

        line: { color: 'rgba(31,119,180,1)' },
        name: 'Real',
        low: response.real.low,

        open: response.real.open,

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      };

      var validation: any = {

        x: response.validation.timestamps,

        close: response.validation.close,

        decreasing: { line: { color: 'red' } },
        name: 'Validação',
        high: response.validation.high,

        increasing: { line: { color: 'green' } },

        line: { color: 'rgba(31,119,180,1)' },

        low: response.validation.low,

        open: response.validation.open,

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      };

      var prediction: any = {

        x: response.prediction.timestamps,

        close: response.prediction.close,

        decreasing: { line: { color: 'red' } },
        name: 'Previsão',
        high: response.prediction.high,

        increasing: { line: { color: 'green' } },

        line: { color: 'rgba(31,119,180,1)' },

        low: response.prediction.low,

        open: response.prediction.open,

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      };

      var data: any = [real, validation, prediction];

      // var layout = {
      //   dragmode: 'zoom',
      //   margin: {
      //     r: 10,
      //     t: 25,
      //     b: 40,
      //     l: 60
      //   },
      //   showlegend: false,
      //   xaxis: {
      //     autorange: true,
      //     rangeslider: {range: ['2017-01-17 12:00', '2017-02-10 12:00']},
      //     title: 'Date',
      //     type: 'date'
      //   },
      //   yaxis: {
      //     autorange: true,
      //     type: 'linear'
      //   },

      //   annotations: [
      //     {
      //       x: '2017-01-31',
      //       y: 0.9,
      //       xref: 'x',
      //       yref: 'paper',
      //       text: 'largest movement',
      //       font: {color: 'magenta'},
      //       showarrow: true,
      //       xanchor: 'right',
      //       ax: -20,
      //       ay: 0
      //     }
      //   ],

      //   shapes: [
      //       {
      //           type: 'rect',
      //           xref: 'x',
      //           yref: 'paper',
      //           x0: '2017-01-31',
      //           y0: 0,
      //           x1: '2017-02-01',
      //           y1: 1,
      //           fillcolor: '#d3d3d3',
      //           opacity: 0.2,
      //           line: {
      //               width: 0
      //           }
      //       }
      //     ]
      // };

      Plotly.newPlot(this.candleTrained, data);






      // let tt = response as responseType;
      // Plotly.newPlot(this.candlePredicted, [{ x: tt.precoReais.epochs, y: tt.precoReais.prices, name: 'Preço Real' }]);
      // Plotly.addTraces(this.candlePredicted, [{ x: tt.smaTreinado.timestamps_b, y: tt.smaTreinado.sma, name: 'sma treinado' }]);
      // Plotly.addTraces(this.candlePredicted, [{ x: tt.treinado.timestamps_b, y: tt.treinado.values, name: 'Validação' }]);
      // Plotly.addTraces(this.graph_plot, [{ x: tt.previsto.timestamps_c, y: tt.previsto.values, name: 'previsão' }]);
    });
  }


  getPredictions() {

    this.deriv.authenticate();

    // obtendo cotações deriv em tempo real e prevendo e rednereziando na pagina
    this.deriv.subject.subscribe((res: any) => {

      if (!this.candles_predicted.some((x) => x.timestamp == res.prediction.timestamp))
        this.candles_predicted.push(res.prediction);


      var real = {

        x: res.real.timestamps,

        close: res.real.close,

        decreasing: { line: { color: 'red' } },

        high: res.real.high,

        increasing: { line: { color: 'green' } },

        line: { color: 'rgba(31,119,180,1)' },
        name: 'Real',
        low: res.real.low,

        open: res.real.open,

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      };

      var prediction: any = {

        x: this.candles_predicted.map((x) => x.timestamp),

        close: this.candles_predicted.map((x) => x.close),

        decreasing: { line: { color: 'red' } },
        name: 'Predição',
        high: this.candles_predicted.map((x) => x.high),

        increasing: { line: { color: 'green' } },

        line: { color: 'rgba(31,119,180,1)' },

        low: this.candles_predicted.map((x) => x.low),

        open: this.candles_predicted.map((x) => x.open),

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      };

      var data: any = [real, prediction];

      Plotly.newPlot(this.candlePredicted, data);
    })
  }


  getCandlesPredictions() {

    // this.deriv.authenticate();

    // obtendo cotações deriv em tempo real e prevendo e rednereziando na pagina
    this.http.get('http://localhost:3000/api/predictionNextOlhc', {
      headers: { 'Content-type': 'application/json' }
    }).subscribe((res: any) => {





      var real = {

        x: res.real.timestamps,

        close: res.real.close,

        decreasing: { line: { color: 'red' } },

        high: res.real.high,

        increasing: { line: { color: 'green' } },

        line: { color: 'rgba(31,119,180,1)' },
        name: 'Real',
        low: res.real.low,

        open: res.real.open,

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      };

      var prediction: any = {

        x: res.prediction.timestamps,

        close: res.prediction.close,

        decreasing: { line: { color: 'red' } },
        name: 'Predição',
        high: res.prediction.high,

        increasing: { line: { color: 'green' } },

        line: { color: 'rgba(31,119,180,1)' },

        low: res.prediction.low,

        open: res.prediction.open,

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      };

      var data: any = [real, prediction];

      Plotly.newPlot(this.graph_plot, data);
      console.log(res);
    })
  }



  chunkArray(array: []) {
    const chunkSize = 4;
    let newArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      newArray.push(chunk);
    }
    return newArray;
  }

  buildRealPrice(input: any) {

    let tt = input as responseType2;


    Plotly.newPlot(this.realPriceCandle, [{


      x: tt.precoReais.epochs as string[],

      close: tt.precoReais.prices.map((t: any) => t.close) as number[],

      decreasing: { line: { color: '#7F7F7F' } },

      high: tt.precoReais.prices.map((t: any) => t.high) as number[],

      increasing: { line: { color: '#17BECF' } },

      line: { color: 'rgba(31,119,180,1)' },

      low: tt.precoReais.prices.map((t: any) => t.low) as number[],

      open: tt.precoReais.prices.map((t: any) => t.open) as number[],

      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y'
    }], {
      dragmode: 'zoom',
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60
      },
      showlegend: false,
      xaxis: {
        autorange: true,
        domain: [0, 1],
        // range: ['2017-01-03 12:00', '2017-02-15 12:00'],
        // rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']},
        title: 'Date',
        type: 'date'
      },
      yaxis: {
        autorange: true,
        domain: [0, 1],
        // range: [114.609999778, 137.410004222],
        type: 'linear'
      }
    });
  }

  buildTrained(input: any) {

    let tt = input as responseType2;

    let splitIn4 = this.chunkArray(input.treinado.values);

    Plotly.newPlot(this.candleTrained, [{


      x: tt.treinado.timestamps_b as string[],

      close: splitIn4.map((t: any) => t[3]) as number[],

      decreasing: { line: { color: '#7F7F7F' } },

      high: splitIn4.map((t: any) => t[2]) as number[],

      increasing: { line: { color: '#17BECF' } },

      line: { color: 'rgba(31,119,180,1)' },

      low: splitIn4.map((t: any) => t[1]) as number[],

      open: splitIn4.map((t: any) => t[0]) as number[],

      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y'
    }], {
      dragmode: 'zoom',
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60
      },
      showlegend: false,
      xaxis: {
        autorange: true,
        domain: [0, 1],
        // range: ['2017-01-03 12:00', '2017-02-15 12:00'],
        // rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']},
        title: 'Date',
        type: 'date'
      },
      yaxis: {
        autorange: true,
        domain: [0, 1],
        // range: [114.609999778, 137.410004222],
        type: 'linear'
      }
    });
  }


  buildValidation(input: any) {

    let tt = input as responseType2;

    let splitIn4 = this.chunkArray(tt.previsto.values);

    Plotly.newPlot(this.candlePredicted, [{


      x: tt.previsto.timestamps_c as string[],

      close: splitIn4.map((t: any) => t[3]) as number[],

      decreasing: { line: { color: '#7F7F7F' } },

      high: splitIn4.map((t: any) => t[2]) as number[],

      increasing: { line: { color: '#17BECF' } },

      line: { color: 'rgba(31,119,180,1)' },

      low: splitIn4.map((t: any) => t[1]) as number[],

      open: splitIn4.map((t: any) => t[0]) as number[],

      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y'
    }], {
      dragmode: 'zoom',
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60
      },
      showlegend: false,
      xaxis: {
        autorange: true,
        domain: [0, 1],
        // range: ['2017-01-03 12:00', '2017-02-15 12:00'],
        // rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']},
        title: 'Date',
        type: 'date'
      },
      yaxis: {
        autorange: true,
        domain: [0, 1],
        // range: [114.609999778, 137.410004222],
        type: 'linear'
      }
    });
  }


}
