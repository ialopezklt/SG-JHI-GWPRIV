import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGrupoParametro, GrupoParametro } from '../grupo-parametro.model';
import { GrupoParametroService } from '../service/grupo-parametro.service';

@Injectable({ providedIn: 'root' })
export class GrupoParametroRoutingResolveService implements Resolve<IGrupoParametro> {
  constructor(protected service: GrupoParametroService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGrupoParametro> | Observable<never> {
    const id = route.params['grupoParametroId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((grupoParametro: HttpResponse<GrupoParametro>) => {
          if (grupoParametro.body) {
            return of(grupoParametro.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GrupoParametro());
  }
}
