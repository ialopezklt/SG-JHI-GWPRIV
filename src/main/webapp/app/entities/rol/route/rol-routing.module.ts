import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RolComponent } from '../list/rol.component';
import { RolDetailComponent } from '../detail/rol-detail.component';
import { RolUpdateComponent } from '../update/rol-update.component';
import { RolRoutingResolveService } from './rol-routing-resolve.service';

const rolRoute: Routes = [
  {
    path: '',
    component: RolComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':rolId/view',
    component: RolDetailComponent,
    resolve: {
      rol: RolRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RolUpdateComponent,
    resolve: {
      rol: RolRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':rolId/edit',
    component: RolUpdateComponent,
    resolve: {
      rol: RolRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rolRoute)],
  exports: [RouterModule],
})
export class RolRoutingModule {}
