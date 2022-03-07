import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ParametroService } from '../service/parametro.service';
import { IParametro, Parametro } from '../parametro.model';
import { IGrupoParametro } from 'app/entities/grupo-parametro/grupo-parametro.model';
import { GrupoParametroService } from 'app/entities/grupo-parametro/service/grupo-parametro.service';

import { ParametroUpdateComponent } from './parametro-update.component';

describe('Parametro Management Update Component', () => {
  let comp: ParametroUpdateComponent;
  let fixture: ComponentFixture<ParametroUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let parametroService: ParametroService;
  let grupoParametroService: GrupoParametroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ParametroUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ParametroUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ParametroUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    parametroService = TestBed.inject(ParametroService);
    grupoParametroService = TestBed.inject(GrupoParametroService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call GrupoParametro query and add missing value', () => {
      const parametro: IParametro = { parametroId: 456 };
      const grupoPar: IGrupoParametro = { grupoParametroId: 18285 };
      parametro.grupoPar = grupoPar;

      const grupoParametroCollection: IGrupoParametro[] = [{ grupoParametroId: 5048 }];
      jest.spyOn(grupoParametroService, 'query').mockReturnValue(of(new HttpResponse({ body: grupoParametroCollection })));
      const additionalGrupoParametros = [grupoPar];
      const expectedCollection: IGrupoParametro[] = [...additionalGrupoParametros, ...grupoParametroCollection];
      jest.spyOn(grupoParametroService, 'addGrupoParametroToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ parametro });
      comp.ngOnInit();

      expect(grupoParametroService.query).toHaveBeenCalled();
      expect(grupoParametroService.addGrupoParametroToCollectionIfMissing).toHaveBeenCalledWith(
        grupoParametroCollection,
        ...additionalGrupoParametros
      );
      expect(comp.grupoParametrosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const parametro: IParametro = { parametroId: 456 };
      const grupoPar: IGrupoParametro = { grupoParametroId: 44839 };
      parametro.grupoPar = grupoPar;

      activatedRoute.data = of({ parametro });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(parametro));
      expect(comp.grupoParametrosSharedCollection).toContain(grupoPar);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Parametro>>();
      const parametro = { parametroId: 123 };
      jest.spyOn(parametroService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parametro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: parametro }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(parametroService.update).toHaveBeenCalledWith(parametro);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Parametro>>();
      const parametro = new Parametro();
      jest.spyOn(parametroService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parametro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: parametro }));
      saveSubject.complete();

      // THEN
      expect(parametroService.create).toHaveBeenCalledWith(parametro);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Parametro>>();
      const parametro = { parametroId: 123 };
      jest.spyOn(parametroService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parametro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(parametroService.update).toHaveBeenCalledWith(parametro);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackGrupoParametroByGrupoParametroId', () => {
      it('Should return tracked GrupoParametro primary key', () => {
        const entity = { grupoParametroId: 123 };
        const trackResult = comp.trackGrupoParametroByGrupoParametroId(0, entity);
        expect(trackResult).toEqual(entity.grupoParametroId);
      });
    });
  });
});
