import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PuntoAtencionService } from '../service/punto-atencion.service';
import { IPuntoAtencion, PuntoAtencion } from '../punto-atencion.model';

import { PuntoAtencionUpdateComponent } from './punto-atencion-update.component';

describe('PuntoAtencion Management Update Component', () => {
  let comp: PuntoAtencionUpdateComponent;
  let fixture: ComponentFixture<PuntoAtencionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let puntoAtencionService: PuntoAtencionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PuntoAtencionUpdateComponent],
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
      .overrideTemplate(PuntoAtencionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PuntoAtencionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    puntoAtencionService = TestBed.inject(PuntoAtencionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const puntoAtencion: IPuntoAtencion = { puntoAtencionId: 456 };

      activatedRoute.data = of({ puntoAtencion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(puntoAtencion));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PuntoAtencion>>();
      const puntoAtencion = { puntoAtencionId: 123 };
      jest.spyOn(puntoAtencionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ puntoAtencion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: puntoAtencion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(puntoAtencionService.update).toHaveBeenCalledWith(puntoAtencion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PuntoAtencion>>();
      const puntoAtencion = new PuntoAtencion();
      jest.spyOn(puntoAtencionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ puntoAtencion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: puntoAtencion }));
      saveSubject.complete();

      // THEN
      expect(puntoAtencionService.create).toHaveBeenCalledWith(puntoAtencion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PuntoAtencion>>();
      const puntoAtencion = { puntoAtencionId: 123 };
      jest.spyOn(puntoAtencionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ puntoAtencion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(puntoAtencionService.update).toHaveBeenCalledWith(puntoAtencion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
