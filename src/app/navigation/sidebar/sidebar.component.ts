import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  time = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    setInterval(() => {
      const today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      let s = today.getSeconds();
      this.time = h + ":" + (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s);
    }, 100);
  }

}
