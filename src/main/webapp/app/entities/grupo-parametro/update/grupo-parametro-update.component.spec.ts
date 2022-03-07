import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GrupoParametroService } from '../service/grupo-parametro.service';
import { IGrupoParametro, GrupoParametro } from '../grupo-parametro.model';

import { GrupoParametroUpdateComponent } from './grupo-parametro-update.component';

describe('GrupoParametro Management Update Component', () => {
  let comp: GrupoParametroUpdateComponent;
  let fixture: ComponentFixture<GrupoParametroUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let grupoParametroService: GrupoParametroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [GrupoParametroUpdateComponent],
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
      .overrideTemplate(GrupoParametroUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupoParametroUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    grupoParametroService = TestBed.inject(GrupoParametroService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const grupoParametro: IGrupoParametro = { grupoParametroId: 456 };

      activatedRoute.data = of({ grupoParametro });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(grupoParametro));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<GrupoParametro>>();
      const grupoParametro = { grupoParametroId: 123 };
      jest.spyOn(grupoParametroService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoParametro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupoParametro }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(grupoParametroService.update).toHaveBeenCalledWith(grupoParametro);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<GrupoParametro>>();
      const grupoParametro = new GrupoParametro();
      jest.spyOn(grupoParametroService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoParametro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupoParametro }));
      saveSubject.complete();

      // THEN
      expect(grupoParametroService.create).toHaveBeenCalledWith(grupoParametro);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<GrupoParametro>>();
      const grupoParametro = { grupoParametroId: 123 };
      jest.spyOn(grupoParametroService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoParametro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(grupoParametroService.update).toHaveBeenCalledWith(grupoParametro);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
