import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-castle',
  templateUrl: './castle.component.html',
  styleUrls: ['./castle.component.css']
})
export class CastleComponent implements OnInit {

  data: any;
  settings: any;
  castle: any;
  upgradingTime: any;
  radioValue = 'inputGold';
  canUpgrade = true;


  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    });
    this.dataService.getSettings().subscribe(sett => {
      this.settings = sett;
    });

    [this.castle] = this.data.filter((b: any) => b.link === 'castle');

    if (this.settings.activeBuildState) {
      const [b] = this.data.filter((b: any) => b.link === this.settings.buildingUpgradingState);
      this.upgrading(b);
    }

  }

  upgradeToNewLevel(building: any, time: number): void {
    if (this.radioValue === 'inputGold') {
      if (this.settings.gold >= building.priceGold) {
        this.settings.gold -= building.priceGold;
      } else {
        this.canUpgrade = false;
        setTimeout(() => {
          this.canUpgrade = true;
        }, 5000);
      }
    } else {
      if (this.settings.coins >= building.priceCoins) {
        this.settings.coins -= building.priceCoins;;
      } else {
        this.canUpgrade = false;
        setTimeout(() => {
          this.canUpgrade = true;
        }, 5000);
      }
    }
    if (this.canUpgrade) {
      this.settings.activeBuildState = true;
      this.settings.buildingUpgradingState = building.link;
      let date = new Date();
      date.setSeconds(date.getSeconds() + time);
      building.finishDateTime = date;
      this.dataService.setSettings(this.settings);
      this.dataService.setData(building);
      this.upgrading(building);
    }
  }

  displayBuildTime(t: number): any {
    return this.dataService.displayBuildTime(t);
  }

  time(building: any): number {
    return (building.time * Math.pow(building.level > 0 ? building.level : building.level + 1, 3) - Math.pow(this.castle.level, 3))
  }

  upgrading(building: any) {
    const interval = setInterval(() => {
      this.upgradingTime = this.dataService.displayBuildTime(1, building.finishDateTime);
      if (this.upgradingTime === 'Dokončeno') {
        building.level++;
        this.settings.activeBuildState = false;
        this.settings.buildingUpgradingState = "";
        building.finishDateTime = "";
        this.dataService.setSettings(this.settings);
        this.dataService.setData(building);
        clearInterval(interval);
      }
    }, 100);
  }

}
