import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-gold-mine',
  templateUrl: './gold-mine.component.html',
  styleUrls: ['./gold-mine.component.css']
})
export class GoldMineComponent implements OnInit {

  data: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      [this.data] = data.filter((d: any) => d.link === 'gold-mine');
    });
  }

  displayProduction(next = false): number {
    if (!next) {
      return 1 * (Math.pow((this.data.level) , 2));
    } else {
      return 1 * (Math.pow((this.data.level + 1) , 2));
    }
    
  }

}
