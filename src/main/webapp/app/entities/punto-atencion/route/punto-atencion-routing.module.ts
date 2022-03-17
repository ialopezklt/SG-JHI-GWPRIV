import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PuntoAtencionComponent } from '../list/punto-atencion.component';
import { PuntoAtencionDetailComponent } from '../detail/punto-atencion-detail.component';
import { PuntoAtencionUpdateComponent } from '../update/punto-atencion-update.component';
import { PuntoAtencionRoutingResolveService } from './punto-atencion-routing-resolve.service';

const puntoAtencionRoute: Routes = [
  {
    path: '',
    component: PuntoAtencionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':puntoAtencionId/view',
    component: PuntoAtencionDetailComponent,
    resolve: {
      puntoAtencion: PuntoAtencionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PuntoAtencionUpdateComponent,
    resolve: {
      puntoAtencion: PuntoAtencionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':puntoAtencionId/edit',
    component: PuntoAtencionUpdateComponent,
    resolve: {
      puntoAtencion: PuntoAtencionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(puntoAtencionRoute)],
  exports: [RouterModule],
})
export class PuntoAtencionRoutingModule {}
