import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPuntoAtencion, getPuntoAtencionIdentifier } from '../punto-atencion.model';
import { SessionStorageService } from 'ngx-webstorage';

export type EntityResponseType = HttpResponse<IPuntoAtencion>;
export type EntityArrayResponseType = HttpResponse<IPuntoAtencion[]>;
export type CiudadesResponseType = HttpResponse<ICiudades[]>;

@Injectable({ providedIn: 'root' })
export class PuntoAtencionService {
  protected fullJsonCiudadesDeptos: ICiudades[];
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/punto-atencion', 'backrastreogiros');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected sesionStorageService: SessionStorageService
  ) {
    this.fullJsonCiudadesDeptos = [];
  }

  create(puntoAtencion: IPuntoAtencion): Observable<EntityResponseType> {
    return this.http.post<IPuntoAtencion>(this.resourceUrl, puntoAtencion, { observe: 'response' });
  }

  update(puntoAtencion: IPuntoAtencion): Observable<EntityResponseType> {
    return this.http.put<IPuntoAtencion>(`${this.resourceUrl}/${getPuntoAtencionIdentifier(puntoAtencion) as number}`, puntoAtencion, {
      observe: 'response',
    });
  }

  partialUpdate(puntoAtencion: IPuntoAtencion): Observable<EntityResponseType> {
    return this.http.patch<IPuntoAtencion>(`${this.resourceUrl}/${getPuntoAtencionIdentifier(puntoAtencion) as number}`, puntoAtencion, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPuntoAtencion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPuntoAtencion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPuntoAtencionToCollectionIfMissing(
    puntoAtencionCollection: IPuntoAtencion[],
    ...puntoAtencionsToCheck: (IPuntoAtencion | null | undefined)[]
  ): IPuntoAtencion[] {
    const puntoAtencions: IPuntoAtencion[] = puntoAtencionsToCheck.filter(isPresent);
    if (puntoAtencions.length > 0) {
      const puntoAtencionCollectionIdentifiers = puntoAtencionCollection.map(
        puntoAtencionItem => getPuntoAtencionIdentifier(puntoAtencionItem)!
      );
      const puntoAtencionsToAdd = puntoAtencions.filter(puntoAtencionItem => {
        const puntoAtencionIdentifier = getPuntoAtencionIdentifier(puntoAtencionItem);
        if (puntoAtencionIdentifier == null || puntoAtencionCollectionIdentifiers.includes(puntoAtencionIdentifier)) {
          return false;
        }
        puntoAtencionCollectionIdentifiers.push(puntoAtencionIdentifier);
        return true;
      });
      return [...puntoAtencionsToAdd, ...puntoAtencionCollection];
    }
    return puntoAtencionCollection;
  }

  /*
  getDepartamentos(): ICiudades[] {
    console.log("ntro a geDepartamentos");
    const resp: ICiudades[] = [];
    return this.cargaFullJsonCiudades().subscribe(x => x.body?.forEach((ciu)=> resp.find() ciu.departamento) );
    
            .subscribe({
              next: (dat) => { this.fullJsonCiudadesDeptos = dat.body!; 
                console.log("hubo respuesta")
                    return this.fullJsonCiudadesDeptos },
              error: () => { this.fullJsonCiudadesDeptos = []; 
                console.log("hubo error");
                return this.fullJsonCiudadesDeptos }
            }).

  }
*/
  getCiudadesPorDepartamento(departamento: string): ICiudades[] {
    if (this.fullJsonCiudadesDeptos.length === 0) {
      return this.fullJsonCiudadesDeptos;
    }
    const ciudadesSeleccionadas: ICiudades[] = [];
    this.fullJsonCiudadesDeptos.forEach(ciudad => {
      if (ciudad.departamento === departamento) {
        ciudadesSeleccionadas.push(ciudad);
      }
    });
    return ciudadesSeleccionadas;
  }

  getJsonDatosGov(): Observable<ICiudades[]> {
    return this.http.get<ICiudades[]>('https://www.datos.gov.co/resource/xdk5-pm3f.json?$limit=2000', { observe: 'body' });
  }

  getFullJsonDepartamentosCiudades(): Observable<ICiudades[]> {
    if (this.fullJsonCiudadesDeptos.length !== 0) {
      return of(this.fullJsonCiudadesDeptos);
    }
    return this.getJsonDatosGov().pipe(
      map((resp: ICiudades[]) => {
        this.sesionStorageService.store('JsonDataGov', resp);
        this.fullJsonCiudadesDeptos = this.sesionStorageService.retrieve('JsonDataGov');
        return this.fullJsonCiudadesDeptos;
      })
    );
  }
}

export interface ICiudades {
  region: string;
  departamento: string;
  c_digo_dane_del_departamento: string;
  c_digo_dane_del_municipio: string;
  municipio: string;
}
