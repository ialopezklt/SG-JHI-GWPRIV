import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPuntoAtencion, PuntoAtencion } from '../punto-atencion.model';
import { PuntoAtencionService } from '../service/punto-atencion.service';

@Injectable({ providedIn: 'root' })
export class PuntoAtencionRoutingResolveService implements Resolve<IPuntoAtencion> {
  constructor(protected service: PuntoAtencionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPuntoAtencion> | Observable<never> {
    const id = route.params['puntoAtencionId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((puntoAtencion: HttpResponse<PuntoAtencion>) => {
          if (puntoAtencion.body) {
            return of(puntoAtencion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PuntoAtencion());
  }
}
