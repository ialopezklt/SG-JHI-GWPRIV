import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IPuntoAtencion, PuntoAtencion } from '../punto-atencion.model';
import { PuntoAtencionService } from '../service/punto-atencion.service';

import { PuntoAtencionRoutingResolveService } from './punto-atencion-routing-resolve.service';

describe('PuntoAtencion routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: PuntoAtencionRoutingResolveService;
  let service: PuntoAtencionService;
  let resultPuntoAtencion: IPuntoAtencion | undefined;

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
    routingResolveService = TestBed.inject(PuntoAtencionRoutingResolveService);
    service = TestBed.inject(PuntoAtencionService);
    resultPuntoAtencion = undefined;
  });

  describe('resolve', () => {
    it('should return IPuntoAtencion returned by find', () => {
      // GIVEN
      service.find = jest.fn(puntoAtencionId => of(new HttpResponse({ body: { puntoAtencionId } })));
      mockActivatedRouteSnapshot.params = { puntoAtencionId: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPuntoAtencion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPuntoAtencion).toEqual({ puntoAtencionId: 123 });
    });

    it('should return new IPuntoAtencion if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPuntoAtencion = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPuntoAtencion).toEqual(new PuntoAtencion());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PuntoAtencion })));
      mockActivatedRouteSnapshot.params = { puntoAtencionId: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPuntoAtencion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPuntoAtencion).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
