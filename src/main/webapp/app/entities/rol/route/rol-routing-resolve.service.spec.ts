import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IRol, Rol } from '../rol.model';
import { RolService } from '../service/rol.service';

import { RolRoutingResolveService } from './rol-routing-resolve.service';

describe('Rol routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: RolRoutingResolveService;
  let service: RolService;
  let resultRol: IRol | undefined;

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
    routingResolveService = TestBed.inject(RolRoutingResolveService);
    service = TestBed.inject(RolService);
    resultRol = undefined;
  });

  describe('resolve', () => {
    it('should return IRol returned by find', () => {
      // GIVEN
      service.find = jest.fn(rolId => of(new HttpResponse({ body: { rolId } })));
      mockActivatedRouteSnapshot.params = { rolId: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRol = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRol).toEqual({ rolId: 123 });
    });

    it('should return new IRol if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRol = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultRol).toEqual(new Rol());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Rol })));
      mockActivatedRouteSnapshot.params = { rolId: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRol = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRol).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
