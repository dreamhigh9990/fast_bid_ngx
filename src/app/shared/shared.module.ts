import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GreetingsService, IntroducesService, ConclusionsService, ExperiencesService, QuestionsService, QuotationsService, UrlsService, BidService, AccountsService, JobsService } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  entryComponents: [ ],
  providers: [
    GreetingsService,
    IntroducesService,
    ConclusionsService,
    ExperiencesService,
    UrlsService,
    QuestionsService,
    QuotationsService,
    BidService,
    AccountsService,
    JobsService,
  ],
})
export class SharedModule {}
