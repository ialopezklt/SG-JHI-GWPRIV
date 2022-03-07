import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IParametro, Parametro } from '../parametro.model';
import { ParametroService } from '../service/parametro.service';

import { ParametroRoutingResolveService } from './parametro-routing-resolve.service';

describe('Parametro routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ParametroRoutingResolveService;
  let service: ParametroService;
  let resultParametro: IParametro | undefined;

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
    routingResolveService = TestBed.inject(ParametroRoutingResolveService);
    service = TestBed.inject(ParametroService);
    resultParametro = undefined;
  });

  describe('resolve', () => {
    it('should return IParametro returned by find', () => {
      // GIVEN
      service.find = jest.fn(parametroId => of(new HttpResponse({ body: { parametroId } })));
      mockActivatedRouteSnapshot.params = { parametroId: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultParametro = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultParametro).toEqual({ parametroId: 123 });
    });

    it('should return new IParametro if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultParametro = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultParametro).toEqual(new Parametro());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Parametro })));
      mockActivatedRouteSnapshot.params = { parametroId: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultParametro = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultParametro).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
