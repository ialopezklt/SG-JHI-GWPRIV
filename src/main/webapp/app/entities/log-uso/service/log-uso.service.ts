import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILogUso, getLogUsoIdentifier } from '../log-uso.model';

export type EntityResponseType = HttpResponse<ILogUso>;
export type EntityArrayResponseType = HttpResponse<ILogUso[]>;

@Injectable({ providedIn: 'root' })
export class LogUsoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/log-usos', 'backrastreogiros');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(logUso: ILogUso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logUso);
    return this.http
      .post<ILogUso>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(logUso: ILogUso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logUso);
    return this.http
      .put<ILogUso>(`${this.resourceUrl}/${getLogUsoIdentifier(logUso) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(logUso: ILogUso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logUso);
    return this.http
      .patch<ILogUso>(`${this.resourceUrl}/${getLogUsoIdentifier(logUso) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILogUso>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILogUso[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLogUsoToCollectionIfMissing(logUsoCollection: ILogUso[], ...logUsosToCheck: (ILogUso | null | undefined)[]): ILogUso[] {
    const logUsos: ILogUso[] = logUsosToCheck.filter(isPresent);
    if (logUsos.length > 0) {
      const logUsoCollectionIdentifiers = logUsoCollection.map(logUsoItem => getLogUsoIdentifier(logUsoItem)!);
      const logUsosToAdd = logUsos.filter(logUsoItem => {
        const logUsoIdentifier = getLogUsoIdentifier(logUsoItem);
        if (logUsoIdentifier == null || logUsoCollectionIdentifiers.includes(logUsoIdentifier)) {
          return false;
        }
        logUsoCollectionIdentifiers.push(logUsoIdentifier);
        return true;
      });
      return [...logUsosToAdd, ...logUsoCollection];
    }
    return logUsoCollection;
  }

  protected convertDateFromClient(logUso: ILogUso): ILogUso {
    return Object.assign({}, logUso, {
      fechaHora: logUso.fechaHora?.isValid() ? logUso.fechaHora.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaHora = res.body.fechaHora ? dayjs(res.body.fechaHora) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((logUso: ILogUso) => {
        logUso.fechaHora = logUso.fechaHora ? dayjs(logUso.fechaHora) : undefined;
      });
    }
    return res;
  }
}
