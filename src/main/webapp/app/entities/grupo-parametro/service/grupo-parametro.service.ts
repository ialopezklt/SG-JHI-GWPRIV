import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGrupoParametro, getGrupoParametroIdentifier } from '../grupo-parametro.model';

export type EntityResponseType = HttpResponse<IGrupoParametro>;
export type EntityArrayResponseType = HttpResponse<IGrupoParametro[]>;

@Injectable({ providedIn: 'root' })
export class GrupoParametroService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/grupo-parametros', 'backrastreogiros');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(grupoParametro: IGrupoParametro): Observable<EntityResponseType> {
    return this.http.post<IGrupoParametro>(this.resourceUrl, grupoParametro, { observe: 'response' });
  }

  update(grupoParametro: IGrupoParametro): Observable<EntityResponseType> {
    return this.http.put<IGrupoParametro>(`${this.resourceUrl}/${getGrupoParametroIdentifier(grupoParametro) as number}`, grupoParametro, {
      observe: 'response',
    });
  }

  partialUpdate(grupoParametro: IGrupoParametro): Observable<EntityResponseType> {
    return this.http.patch<IGrupoParametro>(
      `${this.resourceUrl}/${getGrupoParametroIdentifier(grupoParametro) as number}`,
      grupoParametro,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGrupoParametro>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGrupoParametro[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addGrupoParametroToCollectionIfMissing(
    grupoParametroCollection: IGrupoParametro[],
    ...grupoParametrosToCheck: (IGrupoParametro | null | undefined)[]
  ): IGrupoParametro[] {
    const grupoParametros: IGrupoParametro[] = grupoParametrosToCheck.filter(isPresent);
    if (grupoParametros.length > 0) {
      const grupoParametroCollectionIdentifiers = grupoParametroCollection.map(
        grupoParametroItem => getGrupoParametroIdentifier(grupoParametroItem)!
      );
      const grupoParametrosToAdd = grupoParametros.filter(grupoParametroItem => {
        const grupoParametroIdentifier = getGrupoParametroIdentifier(grupoParametroItem);
        if (grupoParametroIdentifier == null || grupoParametroCollectionIdentifiers.includes(grupoParametroIdentifier)) {
          return false;
        }
        grupoParametroCollectionIdentifiers.push(grupoParametroIdentifier);
        return true;
      });
      return [...grupoParametrosToAdd, ...grupoParametroCollection];
    }
    return grupoParametroCollection;
  }
}
