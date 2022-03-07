import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { GrupoParametroService } from '../service/grupo-parametro.service';

import { GrupoParametroComponent } from './grupo-parametro.component';

describe('GrupoParametro Management Component', () => {
  let comp: GrupoParametroComponent;
  let fixture: ComponentFixture<GrupoParametroComponent>;
  let service: GrupoParametroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GrupoParametroComponent],
    })
      .overrideTemplate(GrupoParametroComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupoParametroComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(GrupoParametroService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ grupoParametroId: 123 }],
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
    expect(comp.grupoParametros?.[0]).toEqual(expect.objectContaining({ grupoParametroId: 123 }));
  });
});
