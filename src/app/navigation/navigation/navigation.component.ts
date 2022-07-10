import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  editTownName = false;
  speed = 1;
  settings: any;
  data: any;
  isDelivered: boolean = false;
  today: Date = new Date();
  startDate: Date = new Date();

  constructor(private dataServise: DataService) {

  }

  ngOnInit(): void {
    this.dataServise.getSettings().subscribe(sett => {
      this.settings = sett;
      this.startDate = new Date(this.settings.startGameDate);
    });
    this.dataServise.getData().subscribe(data => {
      [this.data] = data.filter((d: any) => d.link === 'gold-mine');
    });
    this.speed = this.settings.speedUp;

    const startDate = new Date(this.settings.startGameDate);
    setInterval(() => {
      this.today = new Date();
      setTimeout(() => { this.isDelivered = false; }, 1000);
      if ((this.today.getMinutes() == startDate.getMinutes()) && this.today.getSeconds() == startDate.getSeconds() && !this.isDelivered) {
        this.isDelivered = true;
        this.settings.gold += (Math.pow(this.data.level, 2));
        this.delivery();
      }
      if (this.settings.startGameDate) {
        let startDate1 = new Date(this.settings.startGameDate);
        startDate1.setHours(startDate1.getHours() + this.settings.hoursFromStart);
        let _startDate1 = new Date(startDate1);
        let _today = new Date(this.today);

        _startDate1.setUTCHours(0, 0, 0, 0);
        _today.setUTCHours(0, 0, 0, 0);
        const actualDiffHours = Math.floor((+this.today - +startDate1) / 3600000);
        if (actualDiffHours > 0) {
          this.settings.gold += (Math.pow(this.data.level, 2)) * actualDiffHours;
          this.delivery(actualDiffHours);
        }
      }
    }, 1000);
  }

  changeTitle(): void {
    this.editTownName = false;
    this.dataServise.setSettings({ townName: this.settings.townName });
  }

  speedUp(): void {
    this.speed < 3 ? this.speed++ : this.speed = 1;
    this.dataServise.setSettings({ speedUp: this.speed });
  }

  delivery(actualDiffHours: number = 0): void {
    if (actualDiffHours === 0) {
      this.settings.hoursFromStart++;
    } else {
      this.settings.hoursFromStart += actualDiffHours;
    }
    this.dataServise.setSettings(this.settings);
  }

}
