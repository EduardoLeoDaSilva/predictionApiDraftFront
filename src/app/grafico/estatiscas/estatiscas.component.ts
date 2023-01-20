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
  constructor(private http: HttpClient, private rd: Renderer2, private deriv: DerivClientService) {

  }
  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


  }

  async ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.deriv.authenticate();
    this.realPriceCandle = document.getElementById('candleReal') as HTMLElement;
    this.candleTrained = document.getElementById('candleTrained') as HTMLElement;
    this.candlePredicted = document.getElementById('candlePredicted') as HTMLElement;
    this.graph_plot = document.getElementById('grafico') as HTMLElement;

    this.http.get('http://localhost:3000/api/predictionRNN').subscribe((response) => {
      let tt = response as responseType;
      Plotly.newPlot(this.graph_plot, [{ x: tt.precoReais.epochs, y: tt.precoReais.prices, name: 'Preço Real' }]);
      Plotly.addTraces(this.graph_plot, [{ x: tt.smaTreinado.timestamps_b, y: tt.smaTreinado.sma, name: 'sma treinado' }]);
      Plotly.addTraces(this.graph_plot, [{ x: tt.treinado.timestamps_b, y: tt.treinado.values, name: 'Validação' }]);
      // Plotly.addTraces(this.graph_plot, [{ x: tt.previsto.timestamps_c, y: tt.previsto.values, name: 'previsão' }]);
    });

    // this.http.get('http://localhost:3000/api/predictRNN3').subscribe((res) => {
    //    this.buildRealPrice(res);
    //    this.buildTrained(res);
    //    this.buildValidation(res);
    // })

    this.deriv.subject.subscribe((res: any) => {

      Plotly.newPlot(this.graph_plot, [{ x: res.precoReais.epochs, y: res.precoReais.prices, name: 'Preço Real' }]);
      // Plotly.addTraces(this.graph_plot, [{ x: res.smaTreinado.timestamps_b, y: res.smaTreinado.sma, name: 'sma treinado' }]);
      Plotly.addTraces(this.graph_plot, [{ x: res.treinado.timestamps_b, y: res.treinado.values, name: 'Validação' }]);
      Plotly.addTraces(this.graph_plot, [{ x: res.previsto.timestamps_e, y: res.previsto.values, name: 'previsão' }]);
    })
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
