import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { AppComponent } from './app.component';
import { PanelComponent } from './panel/panel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SelectionPanelComponent } from './selection-panel/selection-panel.component';
import { BugFormComponent } from './bug-form/bug-form.component';
import { FeatureFormComponent } from './feature-form/feature-form.component';
@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    NavbarComponent,
    DashboardComponent,
    FooterComponent,
    SelectionPanelComponent,
    BugFormComponent,
    FeatureFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
