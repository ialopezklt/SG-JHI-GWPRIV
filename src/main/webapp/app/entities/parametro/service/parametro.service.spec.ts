import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IParametro, Parametro } from '../parametro.model';

import { ParametroService } from './parametro.service';

describe('Parametro Service', () => {
  let service: ParametroService;
  let httpMock: HttpTestingController;
  let elemDefault: IParametro;
  let expectedResult: IParametro | IParametro[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ParametroService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      parametroId: 0,
      valor: 'AAAAAAA',
      descripcion: 'AAAAAAA',
      cifrado: false,
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

    it('should create a Parametro', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Parametro()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Parametro', () => {
      const returnedFromService = Object.assign(
        {
          parametroId: 1,
          valor: 'BBBBBB',
          descripcion: 'BBBBBB',
          cifrado: true,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Parametro', () => {
      const patchObject = Object.assign(
        {
          valor: 'BBBBBB',
          cifrado: true,
        },
        new Parametro()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Parametro', () => {
      const returnedFromService = Object.assign(
        {
          parametroId: 1,
          valor: 'BBBBBB',
          descripcion: 'BBBBBB',
          cifrado: true,
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

    it('should delete a Parametro', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addParametroToCollectionIfMissing', () => {
      it('should add a Parametro to an empty array', () => {
        const parametro: IParametro = { parametroId: 123 };
        expectedResult = service.addParametroToCollectionIfMissing([], parametro);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(parametro);
      });

      it('should not add a Parametro to an array that contains it', () => {
        const parametro: IParametro = { parametroId: 123 };
        const parametroCollection: IParametro[] = [
          {
            ...parametro,
          },
          { parametroId: 456 },
        ];
        expectedResult = service.addParametroToCollectionIfMissing(parametroCollection, parametro);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Parametro to an array that doesn't contain it", () => {
        const parametro: IParametro = { parametroId: 123 };
        const parametroCollection: IParametro[] = [{ parametroId: 456 }];
        expectedResult = service.addParametroToCollectionIfMissing(parametroCollection, parametro);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(parametro);
      });

      it('should add only unique Parametro to an array', () => {
        const parametroArray: IParametro[] = [{ parametroId: 123 }, { parametroId: 456 }, { parametroId: 86898 }];
        const parametroCollection: IParametro[] = [{ parametroId: 123 }];
        expectedResult = service.addParametroToCollectionIfMissing(parametroCollection, ...parametroArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const parametro: IParametro = { parametroId: 123 };
        const parametro2: IParametro = { parametroId: 456 };
        expectedResult = service.addParametroToCollectionIfMissing([], parametro, parametro2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(parametro);
        expect(expectedResult).toContain(parametro2);
      });

      it('should accept null and undefined values', () => {
        const parametro: IParametro = { parametroId: 123 };
        expectedResult = service.addParametroToCollectionIfMissing([], null, parametro, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(parametro);
      });

      it('should return initial array if no Parametro is added', () => {
        const parametroCollection: IParametro[] = [{ parametroId: 123 }];
        expectedResult = service.addParametroToCollectionIfMissing(parametroCollection, undefined, null);
        expect(expectedResult).toEqual(parametroCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
