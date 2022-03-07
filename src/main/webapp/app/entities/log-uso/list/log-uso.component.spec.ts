import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LogUsoService } from '../service/log-uso.service';

import { LogUsoComponent } from './log-uso.component';

describe('LogUso Management Component', () => {
  let comp: LogUsoComponent;
  let fixture: ComponentFixture<LogUsoComponent>;
  let service: LogUsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LogUsoComponent],
    })
      .overrideTemplate(LogUsoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LogUsoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LogUsoService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ logUsoId: 123 }],
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
    expect(comp.logUsos?.[0]).toEqual(expect.objectContaining({ logUsoId: 123 }));
  });
});
