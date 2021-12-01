import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PanelComponent } from './panel/panel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { SelectionPanelComponent } from './selection-panel/selection-panel.component';
import { BugFormComponent } from './bug-form/bug-form.component';
import { FeatureFormComponent } from './feature-form/feature-form.component';
import { ReviewComponent } from './review/review.component';
import { CommentsComponent } from './comments/comments.component';
import { HomeComponent } from './home/home.component';
import { CommentsSearchPanelComponent } from './comments-search-panel/comments-search-panel.component';
import { CommentsDisplayPanelComponent } from './comments-display-panel/comments-display-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    NavbarComponent,
    DashboardComponent,
    FooterComponent,
    SelectionPanelComponent,
    BugFormComponent,
    FeatureFormComponent,
    CommentsComponent,
    ReviewComponent,
    HomeComponent,
    CommentsSearchPanelComponent,
    CommentsDisplayPanelComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'formSubmission', component: PanelComponent},
      {path: 'commentSubmission', component: ReviewComponent},
      {path: 'home', component: HomeComponent},
      {path: '', redirectTo: '/home', pathMatch: 'full'},
    ]),
    FormsModule,
    HttpClientModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
