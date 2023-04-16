import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AiInputComponent } from './ai-input/ai-input.component';
import { IconsComponent } from './icons/icons.component';
import { RatingStarsComponent } from './rating-stars/rating-stars.component';

@NgModule({
  declarations: [
    AppComponent,
    AiInputComponent,
    IconsComponent,
    RatingStarsComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
