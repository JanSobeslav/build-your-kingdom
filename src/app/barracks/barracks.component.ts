import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { BarracksDialogComponent } from './barracks-dialog/barracks-dialog.component';

@Component({
  selector: 'app-barracks',
  templateUrl: './barracks.component.html',
  styleUrls: ['./barracks.component.css']
})
export class BarracksComponent implements OnInit {

  data: any;
  settings: any;
  recruitingTime: any;

  constructor(private dataService: DataService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      [this.data] = data.filter((d: any) => d.link === 'barracks');
    });
    this.dataService.getSettings().subscribe(sett => {
      this.settings = sett;
    });
    if (this.settings.activeRecruitState) {
      const [unit] = this.data.soldiers_type.filter((b: any) => b.link === this.settings.recruitingUpgradingState);
      this.recruiting(unit);
    }
  }

  displayBuildTime(t: number): any {
    return this.dataService.displayBuildTime(t);
  }

  openDialog(unit: any): void {
    const dialogRef = this.dialog.open(BarracksDialogComponent, {
      width: '35%',
      data: { unit, data: this.data },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  time(unit: any): number {
    return unit.time - (Math.pow(this.data.level, 2));
  }

  recruiting(unit: any): void {
    const interval = setInterval(() => {
      let bTime = this.dataService.displayBuildTime(0, unit.finishDateTime);
      if (bTime == "Dokončeno") {
        this.settings.recruitingUpgradingState = "";
        this.settings.activeRecruitState = false;
        switch (unit.link) {
          case 'swordsman':
            this.settings.army.swordsmans += unit.inProccess;
            break;
          case 'archer':
            this.settings.army.archers += unit.inProccess;
            break;
          case 'horseman':
            this.settings.army.horsemans += unit.inProccess;
            break;
        }
        unit.inProccess = 0;
        this.dataService.setSettings(this.settings);
        clearInterval(interval);
        this.recruitingTime = this.dataService.displayBuildTime(unit.time);
      } else {
        this.recruitingTime = bTime;
      }
    }, 100);
  }
  numberOfSol(link: string): any {
    switch (link) {
      case 'swordsman':
        return +this.settings.army.swordsmans;
      case 'archer':
        return +this.settings.army.archers;
      case 'horseman':
        return +this.settings.army.horsemans;
    }
  }
}
