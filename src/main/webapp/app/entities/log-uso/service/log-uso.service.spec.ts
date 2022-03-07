import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { TipoDocumento } from 'app/entities/enumerations/tipo-documento.model';
import { ILogUso, LogUso } from '../log-uso.model';

import { LogUsoService } from './log-uso.service';

describe('LogUso Service', () => {
  let service: LogUsoService;
  let httpMock: HttpTestingController;
  let elemDefault: ILogUso;
  let expectedResult: ILogUso | ILogUso[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LogUsoService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      logUsoId: 0,
      usuario: 'AAAAAAA',
      opcion: 'AAAAAAA',
      fechaHora: currentDate,
      tipoDocumento: TipoDocumento.CedulaCiudadania,
      numeroDocumento: 'AAAAAAA',
      pin: 'AAAAAAA',
      clienteSospechoso: 'AAAAAAA',
      datosAnteriores: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fechaHora: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a LogUso', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fechaHora: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaHora: currentDate,
        },
        returnedFromService
      );

      service.create(new LogUso()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LogUso', () => {
      const returnedFromService = Object.assign(
        {
          logUsoId: 1,
          usuario: 'BBBBBB',
          opcion: 'BBBBBB',
          fechaHora: currentDate.format(DATE_TIME_FORMAT),
          tipoDocumento: 'BBBBBB',
          numeroDocumento: 'BBBBBB',
          pin: 'BBBBBB',
          clienteSospechoso: 'BBBBBB',
          datosAnteriores: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaHora: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LogUso', () => {
      const patchObject = Object.assign(
        {
          fechaHora: currentDate.format(DATE_TIME_FORMAT),
        },
        new LogUso()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fechaHora: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LogUso', () => {
      const returnedFromService = Object.assign(
        {
          logUsoId: 1,
          usuario: 'BBBBBB',
          opcion: 'BBBBBB',
          fechaHora: currentDate.format(DATE_TIME_FORMAT),
          tipoDocumento: 'BBBBBB',
          numeroDocumento: 'BBBBBB',
          pin: 'BBBBBB',
          clienteSospechoso: 'BBBBBB',
          datosAnteriores: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaHora: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a LogUso', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addLogUsoToCollectionIfMissing', () => {
      it('should add a LogUso to an empty array', () => {
        const logUso: ILogUso = { logUsoId: 123 };
        expectedResult = service.addLogUsoToCollectionIfMissing([], logUso);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logUso);
      });

      it('should not add a LogUso to an array that contains it', () => {
        const logUso: ILogUso = { logUsoId: 123 };
        const logUsoCollection: ILogUso[] = [
          {
            ...logUso,
          },
          { logUsoId: 456 },
        ];
        expectedResult = service.addLogUsoToCollectionIfMissing(logUsoCollection, logUso);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LogUso to an array that doesn't contain it", () => {
        const logUso: ILogUso = { logUsoId: 123 };
        const logUsoCollection: ILogUso[] = [{ logUsoId: 456 }];
        expectedResult = service.addLogUsoToCollectionIfMissing(logUsoCollection, logUso);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logUso);
      });

      it('should add only unique LogUso to an array', () => {
        const logUsoArray: ILogUso[] = [{ logUsoId: 123 }, { logUsoId: 456 }, { logUsoId: 33860 }];
        const logUsoCollection: ILogUso[] = [{ logUsoId: 123 }];
        expectedResult = service.addLogUsoToCollectionIfMissing(logUsoCollection, ...logUsoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const logUso: ILogUso = { logUsoId: 123 };
        const logUso2: ILogUso = { logUsoId: 456 };
        expectedResult = service.addLogUsoToCollectionIfMissing([], logUso, logUso2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logUso);
        expect(expectedResult).toContain(logUso2);
      });

      it('should accept null and undefined values', () => {
        const logUso: ILogUso = { logUsoId: 123 };
        expectedResult = service.addLogUsoToCollectionIfMissing([], null, logUso, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logUso);
      });

      it('should return initial array if no LogUso is added', () => {
        const logUsoCollection: ILogUso[] = [{ logUsoId: 123 }];
        expectedResult = service.addLogUsoToCollectionIfMissing(logUsoCollection, undefined, null);
        expect(expectedResult).toEqual(logUsoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
