import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LogUsoComponent } from '../list/log-uso.component';
import { LogUsoDetailComponent } from '../detail/log-uso-detail.component';
import { LogUsoUpdateComponent } from '../update/log-uso-update.component';
import { LogUsoRoutingResolveService } from './log-uso-routing-resolve.service';

const logUsoRoute: Routes = [
  {
    path: '',
    component: LogUsoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':logUsoId/view',
    component: LogUsoDetailComponent,
    resolve: {
      logUso: LogUsoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LogUsoUpdateComponent,
    resolve: {
      logUso: LogUsoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':logUsoId/edit',
    component: LogUsoUpdateComponent,
    resolve: {
      logUso: LogUsoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(logUsoRoute)],
  exports: [RouterModule],
})
export class LogUsoRoutingModule {}
