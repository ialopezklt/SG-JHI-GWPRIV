import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PuntoAtencionService } from '../service/punto-atencion.service';

import { PuntoAtencionComponent } from './punto-atencion.component';

describe('PuntoAtencion Management Component', () => {
  let comp: PuntoAtencionComponent;
  let fixture: ComponentFixture<PuntoAtencionComponent>;
  let service: PuntoAtencionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PuntoAtencionComponent],
    })
      .overrideTemplate(PuntoAtencionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PuntoAtencionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PuntoAtencionService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ puntoAtencionId: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.puntoAtencions?.[0]).toEqual(expect.objectContaining({ puntoAtencionId: 123 }));
  });
});
