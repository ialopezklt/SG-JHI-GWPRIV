import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LogUsoDetailComponent } from './log-uso-detail.component';

describe('LogUso Management Detail Component', () => {
  let comp: LogUsoDetailComponent;
  let fixture: ComponentFixture<LogUsoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogUsoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ logUso: { logUsoId: 123 } }) },
        },
      ],
    })
      .overrideTemplate(LogUsoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LogUsoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load logUso on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.logUso).toEqual(expect.objectContaining({ logUsoId: 123 }));
    });
  });
});
