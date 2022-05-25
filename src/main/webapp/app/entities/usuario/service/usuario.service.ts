import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUsuario, getUsuarioIdentifier } from '../usuario.model';

export type EntityResponseType = HttpResponse<IUsuario>;
export type EntityArrayResponseType = HttpResponse<IUsuario[]>;

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/usuarioprivado/', 'backrastreogiros');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  existeUsuario(usuario: IUsuario): Observable<boolean> {
    const urlDestino = this.applicationConfigService.getEndpointFor('api/publico/', 'backrastreogiros');
    return this.http.post<boolean>(urlDestino + 'existeusuario', usuario, { observe: 'body' });
  }

  create(usuario: IUsuario): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(usuario);
    return this.http
      .post<IUsuario>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(usuario: IUsuario): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(usuario);
    return this.http
      .put<IUsuario>(`${this.resourceUrl}/${getUsuarioIdentifier(usuario) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(usuario: IUsuario): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(usuario);
    return this.http
      .patch<IUsuario>(`${this.resourceUrl}/${getUsuarioIdentifier(usuario) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUsuario>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByUsername(username: string): Observable<EntityResponseType> {
    return this.http
      .get<IUsuario>(`${this.resourceUrl}byusername/${username}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUsuario[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addUsuarioToCollectionIfMissing(usuarioCollection: IUsuario[], ...usuariosToCheck: (IUsuario | null | undefined)[]): IUsuario[] {
    const usuarios: IUsuario[] = usuariosToCheck.filter(isPresent);
    if (usuarios.length > 0) {
      const usuarioCollectionIdentifiers = usuarioCollection.map(usuarioItem => getUsuarioIdentifier(usuarioItem)!);
      const usuariosToAdd = usuarios.filter(usuarioItem => {
        const usuarioIdentifier = getUsuarioIdentifier(usuarioItem);
        if (usuarioIdentifier == null || usuarioCollectionIdentifiers.includes(usuarioIdentifier)) {
          return false;
        }
        usuarioCollectionIdentifiers.push(usuarioIdentifier);
        return true;
      });
      return [...usuariosToAdd, ...usuarioCollection];
    }
    return usuarioCollection;
  }

  protected convertDateFromClient(usuario: IUsuario): IUsuario {
    return Object.assign({}, usuario, {
      ultimoIngreso: usuario.ultimoIngreso?.isValid() ? usuario.ultimoIngreso.toJSON() : undefined,
      inicioInactivacion: usuario.inicioInactivacion?.isValid() ? usuario.inicioInactivacion.toJSON() : undefined,
      finInactivacion: usuario.finInactivacion?.isValid() ? usuario.finInactivacion.toJSON() : undefined,
      fechaCreacion: usuario.fechaCreacion?.isValid() ? usuario.fechaCreacion.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.ultimoIngreso = res.body.ultimoIngreso ? dayjs(res.body.ultimoIngreso) : undefined;
      res.body.inicioInactivacion = res.body.inicioInactivacion ? dayjs(res.body.inicioInactivacion) : undefined;
      res.body.finInactivacion = res.body.finInactivacion ? dayjs(res.body.finInactivacion) : undefined;
      res.body.fechaCreacion = res.body.fechaCreacion ? dayjs(res.body.fechaCreacion) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((usuario: IUsuario) => {
        usuario.ultimoIngreso = usuario.ultimoIngreso ? dayjs(usuario.ultimoIngreso) : undefined;
        usuario.inicioInactivacion = usuario.inicioInactivacion ? dayjs(usuario.inicioInactivacion) : undefined;
        usuario.finInactivacion = usuario.finInactivacion ? dayjs(usuario.finInactivacion) : undefined;
        usuario.fechaCreacion = usuario.fechaCreacion ? dayjs(usuario.fechaCreacion) : undefined;
      });
    }
    return res;
  }
}
