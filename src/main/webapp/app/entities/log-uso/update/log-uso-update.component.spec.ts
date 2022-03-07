import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LogUsoService } from '../service/log-uso.service';
import { ILogUso, LogUso } from '../log-uso.model';

import { LogUsoUpdateComponent } from './log-uso-update.component';

describe('LogUso Management Update Component', () => {
  let comp: LogUsoUpdateComponent;
  let fixture: ComponentFixture<LogUsoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let logUsoService: LogUsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LogUsoUpdateComponent],
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
      .overrideTemplate(LogUsoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LogUsoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    logUsoService = TestBed.inject(LogUsoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const logUso: ILogUso = { logUsoId: 456 };

      activatedRoute.data = of({ logUso });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(logUso));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LogUso>>();
      const logUso = { logUsoId: 123 };
      jest.spyOn(logUsoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logUso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logUso }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(logUsoService.update).toHaveBeenCalledWith(logUso);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LogUso>>();
      const logUso = new LogUso();
      jest.spyOn(logUsoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logUso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logUso }));
      saveSubject.complete();

      // THEN
      expect(logUsoService.create).toHaveBeenCalledWith(logUso);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LogUso>>();
      const logUso = { logUsoId: 123 };
      jest.spyOn(logUsoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logUso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(logUsoService.update).toHaveBeenCalledWith(logUso);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
