import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-barracks-dialog',
  templateUrl: './barracks-dialog.component.html',
  styleUrls: ['./barracks-dialog.component.css']
})
export class BarracksDialogComponent implements OnInit {
  unit: any;
  data: any;
  selectedTab: boolean = true;
  recruitNum: string = "1";
  settings: any;
  noGold: boolean = false;
  noCoins: boolean = false;
  radioValue = 'inputGold';

  constructor(public dialogRef: MatDialogRef<BarracksDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public d: any,
              private dataService: DataService,) { 
                if (d) {
                  this.unit = d.unit;
                  this.data = d.data;
                }
              }

  ngOnInit(): void {
    this.dataService.getSettings().subscribe(resp => {
      this.settings = resp;
    });
  }

  priceGold(): number {
    const price = this.unit.priceGold * +this.recruitNum;
    if (this.settings.gold < price) {
      this.noGold = true;
    } else {
      this.noGold = false;
    }
    return price;
  }

  priceCoins(): number {
    const price = Math.ceil((this.unit.priceGold * +this.recruitNum) / 10);
    if (this.settings.coins < price) {
      this.noCoins = true;
    } else {
      this.noCoins = false;
    }
    return price;
  }

  displayBuildTime(t: number): any {
    return this.dataService.displayBuildTime(t);
  }

  recruit(): void {
    if ((!this.noGold && this.radioValue === 'inputGold') || (!this.noCoins && this.radioValue === 'inputCoins')) {
      this.unit.inProccess = +this.recruitNum;
      let fDate = new Date();
      fDate.setSeconds(fDate.getSeconds() + ((this.unit.time * +this.recruitNum) / this.settings.speedUp));
      this.unit.finishDateTime = fDate;
      this.settings.activeRecruitState = true;
      this.settings.recruitingUpgradingState = this.unit.link;
      this.radioValue === 'inputGold' ? this.settings.gold -= this.priceGold() : this.settings.coins -= this.priceCoins();

      this.dataService.setSettings(this.settings);
      this.dataService.setData({link: 'baracks', soldiers_type: this.unit});
      this.dialogRef.close();
    }
  }

  time(): number {
    return this.unit.time - (Math.pow(this.data.level, 2));
  }

}
