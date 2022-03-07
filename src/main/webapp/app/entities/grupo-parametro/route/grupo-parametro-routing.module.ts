import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { GrupoParametroComponent } from '../list/grupo-parametro.component';
import { GrupoParametroDetailComponent } from '../detail/grupo-parametro-detail.component';
import { GrupoParametroUpdateComponent } from '../update/grupo-parametro-update.component';
import { GrupoParametroRoutingResolveService } from './grupo-parametro-routing-resolve.service';

const grupoParametroRoute: Routes = [
  {
    path: '',
    component: GrupoParametroComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':grupoParametroId/view',
    component: GrupoParametroDetailComponent,
    resolve: {
      grupoParametro: GrupoParametroRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GrupoParametroUpdateComponent,
    resolve: {
      grupoParametro: GrupoParametroRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':grupoParametroId/edit',
    component: GrupoParametroUpdateComponent,
    resolve: {
      grupoParametro: GrupoParametroRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(grupoParametroRoute)],
  exports: [RouterModule],
})
export class GrupoParametroRoutingModule {}
