import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { TipoUsuario } from 'app/entities/enumerations/tipo-usuario.model';
import { TipoDocumento } from 'app/entities/enumerations/tipo-documento.model';
import { IUsuario, Usuario } from '../usuario.model';

import { UsuarioService } from './usuario.service';

describe('Usuario Service', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;
  let elemDefault: IUsuario;
  let expectedResult: IUsuario | IUsuario[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      usuarioId: 0,
      tipoUsuario: TipoUsuario.Interno,
      username: 'AAAAAAA',
      clave: 'AAAAAAA',
      activo: 'AAAAAAA',
      correo: 'AAAAAAA',
      celular: 0,
      tipoDocumento: TipoDocumento.CedulaCiudadania,
      numeroDocumento: 'AAAAAAA',
      primerNombre: 'AAAAAAA',
      segundoNombre: 'AAAAAAA',
      primerApellido: 'AAAAAAA',
      segundoApellido: 'AAAAAAA',
      ultimoIngreso: currentDate,
      inicioInactivacion: currentDate,
      finInactivacion: currentDate,
      fechaCreacion: currentDate,
      creadoPor: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          ultimoIngreso: currentDate.format(DATE_TIME_FORMAT),
          inicioInactivacion: currentDate.format(DATE_TIME_FORMAT),
          finInactivacion: currentDate.format(DATE_TIME_FORMAT),
          fechaCreacion: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Usuario', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          ultimoIngreso: currentDate.format(DATE_TIME_FORMAT),
          inicioInactivacion: currentDate.format(DATE_TIME_FORMAT),
          finInactivacion: currentDate.format(DATE_TIME_FORMAT),
          fechaCreacion: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          ultimoIngreso: currentDate,
          inicioInactivacion: currentDate,
          finInactivacion: currentDate,
          fechaCreacion: currentDate,
        },
        returnedFromService
      );

      service.create(new Usuario()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Usuario', () => {
      const returnedFromService = Object.assign(
        {
          usuarioId: 1,
          tipoUsuario: 'BBBBBB',
          username: 'BBBBBB',
          clave: 'BBBBBB',
          activo: 'BBBBBB',
          correo: 'BBBBBB',
          celular: 1,
          tipoDocumento: 'BBBBBB',
          numeroDocumento: 'BBBBBB',
          primerNombre: 'BBBBBB',
          segundoNombre: 'BBBBBB',
          primerApellido: 'BBBBBB',
          segundoApellido: 'BBBBBB',
          ultimoIngreso: currentDate.format(DATE_TIME_FORMAT),
          inicioInactivacion: currentDate.format(DATE_TIME_FORMAT),
          finInactivacion: currentDate.format(DATE_TIME_FORMAT),
          fechaCreacion: currentDate.format(DATE_TIME_FORMAT),
          creadoPor: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          ultimoIngreso: currentDate,
          inicioInactivacion: currentDate,
          finInactivacion: currentDate,
          fechaCreacion: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Usuario', () => {
      const patchObject = Object.assign(
        {
          username: 'BBBBBB',
          celular: 1,
          tipoDocumento: 'BBBBBB',
          numeroDocumento: 'BBBBBB',
          primerNombre: 'BBBBBB',
          segundoNombre: 'BBBBBB',
          primerApellido: 'BBBBBB',
          segundoApellido: 'BBBBBB',
          finInactivacion: currentDate.format(DATE_TIME_FORMAT),
        },
        new Usuario()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          ultimoIngreso: currentDate,
          inicioInactivacion: currentDate,
          finInactivacion: currentDate,
          fechaCreacion: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Usuario', () => {
      const returnedFromService = Object.assign(
        {
          usuarioId: 1,
          tipoUsuario: 'BBBBBB',
          username: 'BBBBBB',
          clave: 'BBBBBB',
          activo: 'BBBBBB',
          correo: 'BBBBBB',
          celular: 1,
          tipoDocumento: 'BBBBBB',
          numeroDocumento: 'BBBBBB',
          primerNombre: 'BBBBBB',
          segundoNombre: 'BBBBBB',
          primerApellido: 'BBBBBB',
          segundoApellido: 'BBBBBB',
          ultimoIngreso: currentDate.format(DATE_TIME_FORMAT),
          inicioInactivacion: currentDate.format(DATE_TIME_FORMAT),
          finInactivacion: currentDate.format(DATE_TIME_FORMAT),
          fechaCreacion: currentDate.format(DATE_TIME_FORMAT),
          creadoPor: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          ultimoIngreso: currentDate,
          inicioInactivacion: currentDate,
          finInactivacion: currentDate,
          fechaCreacion: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Usuario', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addUsuarioToCollectionIfMissing', () => {
      it('should add a Usuario to an empty array', () => {
        const usuario: IUsuario = { usuarioId: 123 };
        expectedResult = service.addUsuarioToCollectionIfMissing([], usuario);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuario);
      });

      it('should not add a Usuario to an array that contains it', () => {
        const usuario: IUsuario = { usuarioId: 123 };
        const usuarioCollection: IUsuario[] = [
          {
            ...usuario,
          },
          { usuarioId: 456 },
        ];
        expectedResult = service.addUsuarioToCollectionIfMissing(usuarioCollection, usuario);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Usuario to an array that doesn't contain it", () => {
        const usuario: IUsuario = { usuarioId: 123 };
        const usuarioCollection: IUsuario[] = [{ usuarioId: 456 }];
        expectedResult = service.addUsuarioToCollectionIfMissing(usuarioCollection, usuario);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuario);
      });

      it('should add only unique Usuario to an array', () => {
        const usuarioArray: IUsuario[] = [{ usuarioId: 123 }, { usuarioId: 456 }, { usuarioId: 93220 }];
        const usuarioCollection: IUsuario[] = [{ usuarioId: 123 }];
        expectedResult = service.addUsuarioToCollectionIfMissing(usuarioCollection, ...usuarioArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const usuario: IUsuario = { usuarioId: 123 };
        const usuario2: IUsuario = { usuarioId: 456 };
        expectedResult = service.addUsuarioToCollectionIfMissing([], usuario, usuario2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuario);
        expect(expectedResult).toContain(usuario2);
      });

      it('should accept null and undefined values', () => {
        const usuario: IUsuario = { usuarioId: 123 };
        expectedResult = service.addUsuarioToCollectionIfMissing([], null, usuario, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuario);
      });

      it('should return initial array if no Usuario is added', () => {
        const usuarioCollection: IUsuario[] = [{ usuarioId: 123 }];
        expectedResult = service.addUsuarioToCollectionIfMissing(usuarioCollection, undefined, null);
        expect(expectedResult).toEqual(usuarioCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
