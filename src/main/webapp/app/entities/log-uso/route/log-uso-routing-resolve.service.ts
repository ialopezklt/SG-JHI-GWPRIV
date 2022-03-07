import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILogUso, LogUso } from '../log-uso.model';
import { LogUsoService } from '../service/log-uso.service';

@Injectable({ providedIn: 'root' })
export class LogUsoRoutingResolveService implements Resolve<ILogUso> {
  constructor(protected service: LogUsoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILogUso> | Observable<never> {
    const id = route.params['logUsoId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((logUso: HttpResponse<LogUso>) => {
          if (logUso.body) {
            return of(logUso.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LogUso());
  }
}
