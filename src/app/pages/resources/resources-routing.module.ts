import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourcesComponent } from './resources.component';
import { GreetingsComponent } from './greetings/greetings.component';
import { IntroducesComponent } from './introduces/introduces.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { UrlsComponent } from './urls/urls.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuotationsComponent } from './quotations/quotations.component';
import { ConclusionsComponent } from './conclusions/conclusions.component';
import { TemplatesComponent } from './templates/templates.component';

const routes: Routes = [{
  path: '',
  component: ResourcesComponent,
  children: [
    {
      path: 'templates',
      component: TemplatesComponent,
    },
    {
      path: 'greetings',
      component: GreetingsComponent,
    },
    {
      path: 'introduces',
      component: IntroducesComponent,
    },
    {
      path: 'experiences',
      component: ExperiencesComponent,
    },
    {
      path: 'urls',
      component: UrlsComponent,
    },
    {
      path: 'questions',
      component: QuestionsComponent,
    },
    {
      path: 'quotations',
      component: QuotationsComponent,
    },
    {
      path: 'conclusions',
      component: ConclusionsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule { }

export const routedComponents = [
  ResourcesComponent,
  TemplatesComponent,
  GreetingsComponent,
  IntroducesComponent,
  ExperiencesComponent,
  QuotationsComponent,
  QuestionsComponent,
  UrlsComponent,
  ConclusionsComponent,
];
