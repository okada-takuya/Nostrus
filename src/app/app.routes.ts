import { Routes } from '@angular/router';
import { TimeLineComponent } from './features/pages/time-line/time-line.component';

export const routes: Routes = [
  { path: '', redirectTo: '/time-line', pathMatch: 'full' },
  { path: 'time-line', component: TimeLineComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
];
