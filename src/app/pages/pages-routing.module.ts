import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { MybidComponent } from './mybid/mybid.component';
import { AuthGuard } from '../shared';
import { BidHistoryComponent } from './history/history.component';
import { AccountsComponent } from './accounts/accounts.component';
import { JobsComponent } from './jobs/jobs.component';
import { MessagesComponent } from './messages/messages.component';
const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  component: PagesComponent,
  children: [
    {
      path: 'jobs',
      component: JobsComponent,
    },
    {
      path: 'mybid',
      component: MybidComponent,
    },
    {
      path: 'mybid/:taskid',
      component: MybidComponent
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'history',
      component: BidHistoryComponent,
    },
    {
      path: 'accounts',
      component: AccountsComponent,
    },
    {
      path: 'messages',
      component: MessagesComponent,
    },
    {
      path: 'resources',
      loadChildren: () => import('./resources/resources.module')
        .then(m => m.ResourcesModule),
    },
    {
      path: '',
      redirectTo: 'mybid',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
