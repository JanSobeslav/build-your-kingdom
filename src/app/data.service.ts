import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _data = new BehaviorSubject([]);
  private dataStore: any;
  readonly data$ = this._data.asObservable();

  private _settings = new BehaviorSubject([]);
  private settingsStore: any;
  readonly settings$ = this._data.asObservable();

  private data = [
    {
      name: "Hrad",
      link: "castle",
      active: "false",
      level: 1,
      priceGold: 15,
      priceCoins: 1,
      time: 40, //ČAS ZJISTIT
      finishDateTime: "",
      icon: "fab fa-fort-awesome-alt",
    },
    {
      name: "Zlatý důl",
      link: "gold-mine",
      active: "false",
      level: 1,
      priceGold: 20,
      priceCoins: 2,
      time: 35, //ČAS ZJISTIT
      finishDateTime: "",
      icon: "fas fa-cubes"
    },
    {
      name: "Kasárna",
      link: "barracks",
      active: "false",
      level: 0,
      priceGold: 10,
      priceCoins: 1,
      time: 55, //ČAS ZJISTIT
      finishDateTime: "",
      icon: "fas fa-chess-rook",
      soldiers_type: [
        {
          name: "Šermíř",
          link: "swordsman",
          priceGold: 5,
          priceCoins: 1,
          time: 258,
          attack: 3,
          defence: 3,
          finishDateTime: "",
          inProccess: 0,
          icon: "fas fa-chess-pawn"
        },
        {
          name: "Lukostřelec",
          link: "archer",
          priceGold: 6,
          priceCoins: 1,
          time: 278,
          attack: 2,
          defence: 5,
          finishDateTime: "",
          inProccess: 0,
          icon: "fas fa-bullseye"
        },
        {
          name: "Jezdec",
          link: "horseman",
          priceGold: 9,
          priceCoins: 2,
          time: 423,
          attack: 6,
          defence: 4,
          finishDateTime: "",
          inProccess: 0,
          icon: "fas fa-horse-head"
        }
      ],
    },
    {
      name: "Mincovna",
      link: "mint",
      active: "false",
      level: 0,
      priceGold: 28,
      priceCoins: 3,
      time: 65, //ČAS ZJISTIT
      finishDateTime: "",
      icon: "fas fa-coins",
      coin: {
        time: 770,
        price: 10,
        inProccess: 0
      }
    }
  ];

  private settings = {
    townName: "Vesnice",
    userName: null,
    activeLink: "castle",
    activeBuildState: false,
    activeRecruitState: false,
    activeMintState: false,
    buildingUpgradingState: "",
    recruitingUpgradingState: "",
    startGameDate: null,
    hoursFromStart: 0,
    gold: 60,
    coins: 0,
    army: {
      swordsmans: 5,
      archers: 5,
      horsemans: 1
    },
    event_attack: {
      time: 2,
      units: 1,
      arriveDate: "",
      attackState: false,
    },
    speedUp: 1
  };

  constructor() {
    const d = this.load();
    if (d) {
      this.dataStore = d.data;
      this._data.next(this.dataStore);

      this.settingsStore = d.settings;
      this._settings.next(this.settingsStore);
    } else {
      this.dataStore = this.data;
      this._data.next(this.dataStore);

      this.settingsStore = this.settings;
      this._settings.next(this.settingsStore);
    }

    if (!this.settingsStore.startGameDate) {
      this.settingsStore.startGameDate = new Date();
      this._settings.next(this.settingsStore);
    }
    this.save();
  }

  getData() {
    return this._data.asObservable();
  }

  setData(data: any) {
    const index = this.dataStore.findIndex((d: any) => d.link === data.link);
    this.dataStore[index] = data;
    this._data.next(this.dataStore);
    this.save();
  }

  getSettings() {
    return this._settings.asObservable();
  }

  setSettings(v: any) {
    this.settingsStore = { ...this.settingsStore, ...v };
    this._settings.next(this.settingsStore);
    this.save();
  }

  displayBuildTime(t: number, date: null | string = null) {
    if (date !== null) {
      let currentDate = new Date();
      let buildDate = new Date(date);
      t = (buildDate.valueOf() - currentDate.valueOf()) / 1000;
      if (buildDate <= currentDate) return "Dokončeno";
    }
    if (t < 0) t = 0;
    const sec = Math.floor(t);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60);
    let seconds = sec - (hours * 3600) - (minutes * 60);
    return (hours < 10 ? "0" + hours : hours) + ':' + (minutes < 10 ? "0" + minutes : minutes) + ':' + (seconds < 10 ? "0" + seconds : seconds);
  }

  save(): void {
    let d = JSON.stringify({ data: this.dataStore, settings: this.settingsStore });
    localStorage.setItem('_gameData', d);
  }

  load(): any {
    const d = localStorage.getItem('_gameData');
    return d ? JSON.parse(d) : null;
  }
}
