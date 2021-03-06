import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IUsuario, Usuario } from '../usuario.model';
import { UsuarioService } from '../service/usuario.service';

import { UsuarioRoutingResolveService } from './usuario-routing-resolve.service';

describe('Usuario routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: UsuarioRoutingResolveService;
  let service: UsuarioService;
  let resultUsuario: IUsuario | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(UsuarioRoutingResolveService);
    service = TestBed.inject(UsuarioService);
    resultUsuario = undefined;
  });

  describe('resolve', () => {
    it('should return IUsuario returned by find', () => {
      // GIVEN
      service.find = jest.fn(usuarioId => of(new HttpResponse({ body: { usuarioId } })));
      mockActivatedRouteSnapshot.params = { usuarioId: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUsuario = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultUsuario).toEqual({ usuarioId: 123 });
    });

    it('should return new IUsuario if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUsuario = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultUsuario).toEqual(new Usuario());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Usuario })));
      mockActivatedRouteSnapshot.params = { usuarioId: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUsuario = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultUsuario).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
