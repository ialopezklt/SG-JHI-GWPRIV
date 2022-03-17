import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPuntoAtencion, PuntoAtencion } from '../punto-atencion.model';

import { PuntoAtencionService } from './punto-atencion.service';

describe('PuntoAtencion Service', () => {
  let service: PuntoAtencionService;
  let httpMock: HttpTestingController;
  let elemDefault: IPuntoAtencion;
  let expectedResult: IPuntoAtencion | IPuntoAtencion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PuntoAtencionService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      puntoAtencionId: 0,
      departamento: 'AAAAAAA',
      ciudad: 'AAAAAAA',
      direccion: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a PuntoAtencion', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new PuntoAtencion()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PuntoAtencion', () => {
      const returnedFromService = Object.assign(
        {
          puntoAtencionId: 1,
          departamento: 'BBBBBB',
          ciudad: 'BBBBBB',
          direccion: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PuntoAtencion', () => {
      const patchObject = Object.assign(
        {
          departamento: 'BBBBBB',
          ciudad: 'BBBBBB',
        },
        new PuntoAtencion()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PuntoAtencion', () => {
      const returnedFromService = Object.assign(
        {
          puntoAtencionId: 1,
          departamento: 'BBBBBB',
          ciudad: 'BBBBBB',
          direccion: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a PuntoAtencion', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPuntoAtencionToCollectionIfMissing', () => {
      it('should add a PuntoAtencion to an empty array', () => {
        const puntoAtencion: IPuntoAtencion = { puntoAtencionId: 123 };
        expectedResult = service.addPuntoAtencionToCollectionIfMissing([], puntoAtencion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(puntoAtencion);
      });

      it('should not add a PuntoAtencion to an array that contains it', () => {
        const puntoAtencion: IPuntoAtencion = { puntoAtencionId: 123 };
        const puntoAtencionCollection: IPuntoAtencion[] = [
          {
            ...puntoAtencion,
          },
          { puntoAtencionId: 456 },
        ];
        expectedResult = service.addPuntoAtencionToCollectionIfMissing(puntoAtencionCollection, puntoAtencion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PuntoAtencion to an array that doesn't contain it", () => {
        const puntoAtencion: IPuntoAtencion = { puntoAtencionId: 123 };
        const puntoAtencionCollection: IPuntoAtencion[] = [{ puntoAtencionId: 456 }];
        expectedResult = service.addPuntoAtencionToCollectionIfMissing(puntoAtencionCollection, puntoAtencion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(puntoAtencion);
      });

      it('should add only unique PuntoAtencion to an array', () => {
        const puntoAtencionArray: IPuntoAtencion[] = [{ puntoAtencionId: 123 }, { puntoAtencionId: 456 }, { puntoAtencionId: 27694 }];
        const puntoAtencionCollection: IPuntoAtencion[] = [{ puntoAtencionId: 123 }];
        expectedResult = service.addPuntoAtencionToCollectionIfMissing(puntoAtencionCollection, ...puntoAtencionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const puntoAtencion: IPuntoAtencion = { puntoAtencionId: 123 };
        const puntoAtencion2: IPuntoAtencion = { puntoAtencionId: 456 };
        expectedResult = service.addPuntoAtencionToCollectionIfMissing([], puntoAtencion, puntoAtencion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(puntoAtencion);
        expect(expectedResult).toContain(puntoAtencion2);
      });

      it('should accept null and undefined values', () => {
        const puntoAtencion: IPuntoAtencion = { puntoAtencionId: 123 };
        expectedResult = service.addPuntoAtencionToCollectionIfMissing([], null, puntoAtencion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(puntoAtencion);
      });

      it('should return initial array if no PuntoAtencion is added', () => {
        const puntoAtencionCollection: IPuntoAtencion[] = [{ puntoAtencionId: 123 }];
        expectedResult = service.addPuntoAtencionToCollectionIfMissing(puntoAtencionCollection, undefined, null);
        expect(expectedResult).toEqual(puntoAtencionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
