import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PuntoAtencionDetailComponent } from './punto-atencion-detail.component';

describe('PuntoAtencion Management Detail Component', () => {
  let comp: PuntoAtencionDetailComponent;
  let fixture: ComponentFixture<PuntoAtencionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuntoAtencionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ puntoAtencion: { puntoAtencionId: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PuntoAtencionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PuntoAtencionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load puntoAtencion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.puntoAtencion).toEqual(expect.objectContaining({ puntoAtencionId: 123 }));
    });
  });
});
