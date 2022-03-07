import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GrupoParametroDetailComponent } from './grupo-parametro-detail.component';

describe('GrupoParametro Management Detail Component', () => {
  let comp: GrupoParametroDetailComponent;
  let fixture: ComponentFixture<GrupoParametroDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrupoParametroDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ grupoParametro: { grupoParametroId: 123 } }) },
        },
      ],
    })
      .overrideTemplate(GrupoParametroDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(GrupoParametroDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load grupoParametro on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.grupoParametro).toEqual(expect.objectContaining({ grupoParametroId: 123 }));
    });
  });
});
