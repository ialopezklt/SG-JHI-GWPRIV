import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IGrupoParametro, GrupoParametro } from '../grupo-parametro.model';
import { GrupoParametroService } from '../service/grupo-parametro.service';

import { GrupoParametroRoutingResolveService } from './grupo-parametro-routing-resolve.service';

describe('GrupoParametro routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: GrupoParametroRoutingResolveService;
  let service: GrupoParametroService;
  let resultGrupoParametro: IGrupoParametro | undefined;

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
    routingResolveService = TestBed.inject(GrupoParametroRoutingResolveService);
    service = TestBed.inject(GrupoParametroService);
    resultGrupoParametro = undefined;
  });

  describe('resolve', () => {
    it('should return IGrupoParametro returned by find', () => {
      // GIVEN
      service.find = jest.fn(grupoParametroId => of(new HttpResponse({ body: { grupoParametroId } })));
      mockActivatedRouteSnapshot.params = { grupoParametroId: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultGrupoParametro = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultGrupoParametro).toEqual({ grupoParametroId: 123 });
    });

    it('should return new IGrupoParametro if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultGrupoParametro = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultGrupoParametro).toEqual(new GrupoParametro());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as GrupoParametro })));
      mockActivatedRouteSnapshot.params = { grupoParametroId: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultGrupoParametro = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultGrupoParametro).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
