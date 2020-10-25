import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListContactComponent } from './page/list-contact/list-contact.component';
import { ViewContactComponent } from './page/view-contact/view-contact.component';
const routes: Routes = [
  {
    path: 'contact',
    component: ListContactComponent,
  },

  {
    path: 'view/:id',
    component: ViewContactComponent,
  },
  {
    path: '',
    redirectTo: '/contact',
    pathMatch: 'full', //
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
