import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CastleComponent } from './castle/castle.component';
import { GoldMineComponent } from './gold-mine/gold-mine.component';
import { BarracksComponent } from './barracks/barracks.component';
import { MintComponent } from './mint/mint.component';
import { NavigationComponent } from './navigation/navigation/navigation.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { BarracksDialogComponent } from './barracks/barracks-dialog/barracks-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CastleComponent,
    GoldMineComponent,
    BarracksComponent,
    MintComponent,
    NavigationComponent,
    SidebarComponent,
    BarracksDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
