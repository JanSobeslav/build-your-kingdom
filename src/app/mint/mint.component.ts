import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-mint',
  templateUrl: './mint.component.html',
  styleUrls: ['./mint.component.css']
})
export class MintComponent implements OnInit {

  coinsRangeInput = 1;
  data: any;
  settings: any;
  coinTime: any;
  noGold: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      [this.data] = data.filter((d: any) => d.link === 'mint');
    });
    this.dataService.getSettings().subscribe(sett => {
      this.settings = sett;
    });
    if (this.settings.activeMintState) {
      this.makingCoins();
    }
  }

  displayBuildTime(t: number): any {
    return this.dataService.displayBuildTime(t);
  }

  time(t: any, next = false): any {
    if (!next) {
      return Math.round(((t - (this.data.level * 0.5)) * +this.coinsRangeInput) / this.settings.speedUp);
    } else {
      return Math.round((t - ((this.data.level + 1)  * 0.5)) / this.settings.speedUp);
    }

  }

  priceGold(): any {
    const price = this.data.coin.price * +this.coinsRangeInput;
    if (price > this.settings.gold) {
      this.noGold = true;
    } else {
      this.noGold = false;
    }
    return price;
  }

  makeCoins(): void {
    if (!this.noGold) {
      this.settings.activeMintState = true;
      this.settings.gold -= this.priceGold();
      let fDate = new Date();
      fDate.setSeconds(fDate.getSeconds() + this.time(this.data.coin.time));
      this.data.finishDateTime = fDate;
      this.data.inProccess = +this.coinsRangeInput;
      this.dataService.setData(this.data);
      this.dataService.setSettings(this.settings);
      this.makingCoins();
    }
    
  }

  makingCoins(): void {
    const countdown = setInterval(() => {
      this.coinTime = this.dataService.displayBuildTime(0, this.data.finishDateTime);
      if (this.coinTime == "Dokončeno") {
        this.settings.activeMintState = false;
        this.settings.coins += this.data.inProccess;
        this.data.inProccess = 0;
        this.dataService.setSettings(this.settings);
        this.dataService.setData(this.data);
        clearInterval(countdown);
      }
    }, 100);
  }

}
