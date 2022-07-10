import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BarracksComponent } from './barracks/barracks.component';
import { CastleComponent } from './castle/castle.component';
import { GoldMineComponent } from './gold-mine/gold-mine.component';
import { MintComponent } from './mint/mint.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/castle',
    pathMatch: 'full'
  },
  {
    path: 'castle',
    component: CastleComponent
  },
  {
    path: 'gold-mine',
    component: GoldMineComponent
  },
  {
    path: 'barracks',
    component: BarracksComponent
  },
  {
    path: 'mint',
    component: MintComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
