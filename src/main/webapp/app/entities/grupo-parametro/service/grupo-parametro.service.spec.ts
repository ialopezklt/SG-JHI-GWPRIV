import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGrupoParametro, GrupoParametro } from '../grupo-parametro.model';

import { GrupoParametroService } from './grupo-parametro.service';

describe('GrupoParametro Service', () => {
  let service: GrupoParametroService;
  let httpMock: HttpTestingController;
  let elemDefault: IGrupoParametro;
  let expectedResult: IGrupoParametro | IGrupoParametro[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GrupoParametroService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      grupoParametroId: 0,
      nombre: 'AAAAAAA',
      activo: 'AAAAAAA',
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

    it('should create a GrupoParametro', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new GrupoParametro()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GrupoParametro', () => {
      const returnedFromService = Object.assign(
        {
          grupoParametroId: 1,
          nombre: 'BBBBBB',
          activo: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GrupoParametro', () => {
      const patchObject = Object.assign(
        {
          activo: 'BBBBBB',
        },
        new GrupoParametro()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GrupoParametro', () => {
      const returnedFromService = Object.assign(
        {
          grupoParametroId: 1,
          nombre: 'BBBBBB',
          activo: 'BBBBBB',
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

    it('should delete a GrupoParametro', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addGrupoParametroToCollectionIfMissing', () => {
      it('should add a GrupoParametro to an empty array', () => {
        const grupoParametro: IGrupoParametro = { grupoParametroId: 123 };
        expectedResult = service.addGrupoParametroToCollectionIfMissing([], grupoParametro);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupoParametro);
      });

      it('should not add a GrupoParametro to an array that contains it', () => {
        const grupoParametro: IGrupoParametro = { grupoParametroId: 123 };
        const grupoParametroCollection: IGrupoParametro[] = [
          {
            ...grupoParametro,
          },
          { grupoParametroId: 456 },
        ];
        expectedResult = service.addGrupoParametroToCollectionIfMissing(grupoParametroCollection, grupoParametro);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GrupoParametro to an array that doesn't contain it", () => {
        const grupoParametro: IGrupoParametro = { grupoParametroId: 123 };
        const grupoParametroCollection: IGrupoParametro[] = [{ grupoParametroId: 456 }];
        expectedResult = service.addGrupoParametroToCollectionIfMissing(grupoParametroCollection, grupoParametro);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupoParametro);
      });

      it('should add only unique GrupoParametro to an array', () => {
        const grupoParametroArray: IGrupoParametro[] = [{ grupoParametroId: 123 }, { grupoParametroId: 456 }, { grupoParametroId: 65442 }];
        const grupoParametroCollection: IGrupoParametro[] = [{ grupoParametroId: 123 }];
        expectedResult = service.addGrupoParametroToCollectionIfMissing(grupoParametroCollection, ...grupoParametroArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const grupoParametro: IGrupoParametro = { grupoParametroId: 123 };
        const grupoParametro2: IGrupoParametro = { grupoParametroId: 456 };
        expectedResult = service.addGrupoParametroToCollectionIfMissing([], grupoParametro, grupoParametro2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupoParametro);
        expect(expectedResult).toContain(grupoParametro2);
      });

      it('should accept null and undefined values', () => {
        const grupoParametro: IGrupoParametro = { grupoParametroId: 123 };
        expectedResult = service.addGrupoParametroToCollectionIfMissing([], null, grupoParametro, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupoParametro);
      });

      it('should return initial array if no GrupoParametro is added', () => {
        const grupoParametroCollection: IGrupoParametro[] = [{ grupoParametroId: 123 }];
        expectedResult = service.addGrupoParametroToCollectionIfMissing(grupoParametroCollection, undefined, null);
        expect(expectedResult).toEqual(grupoParametroCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
