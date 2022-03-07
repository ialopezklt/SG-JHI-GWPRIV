import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RolService } from '../service/rol.service';
import { IRol, Rol } from '../rol.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { RolUpdateComponent } from './rol-update.component';

describe('Rol Management Update Component', () => {
  let comp: RolUpdateComponent;
  let fixture: ComponentFixture<RolUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let rolService: RolService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RolUpdateComponent],
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
      .overrideTemplate(RolUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RolUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    rolService = TestBed.inject(RolService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Usuario query and add missing value', () => {
      const rol: IRol = { rolId: 456 };
      const usuarios: IUsuario[] = [{ usuarioId: 15330 }];
      rol.usuarios = usuarios;

      const usuarioCollection: IUsuario[] = [{ usuarioId: 65173 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [...usuarios];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rol });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(usuarioCollection, ...additionalUsuarios);
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const rol: IRol = { rolId: 456 };
      const usuarios: IUsuario = { usuarioId: 61927 };
      rol.usuarios = [usuarios];

      activatedRoute.data = of({ rol });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(rol));
      expect(comp.usuariosSharedCollection).toContain(usuarios);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Rol>>();
      const rol = { rolId: 123 };
      jest.spyOn(rolService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rol });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rol }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(rolService.update).toHaveBeenCalledWith(rol);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Rol>>();
      const rol = new Rol();
      jest.spyOn(rolService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rol });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rol }));
      saveSubject.complete();

      // THEN
      expect(rolService.create).toHaveBeenCalledWith(rol);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Rol>>();
      const rol = { rolId: 123 };
      jest.spyOn(rolService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rol });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(rolService.update).toHaveBeenCalledWith(rol);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackUsuarioByUsuarioId', () => {
      it('Should return tracked Usuario primary key', () => {
        const entity = { usuarioId: 123 };
        const trackResult = comp.trackUsuarioByUsuarioId(0, entity);
        expect(trackResult).toEqual(entity.usuarioId);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedUsuario', () => {
      it('Should return option if no Usuario is selected', () => {
        const option = { usuarioId: 123 };
        const result = comp.getSelectedUsuario(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Usuario for according option', () => {
        const option = { usuarioId: 123 };
        const selected = { usuarioId: 123 };
        const selected2 = { usuarioId: 456 };
        const result = comp.getSelectedUsuario(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Usuario is not selected', () => {
        const option = { usuarioId: 123 };
        const selected = { usuarioId: 456 };
        const result = comp.getSelectedUsuario(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
