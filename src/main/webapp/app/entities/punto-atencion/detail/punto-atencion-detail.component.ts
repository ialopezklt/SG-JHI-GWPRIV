import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPuntoAtencion } from '../punto-atencion.model';

@Component({
  selector: 'jhi-punto-atencion-detail',
  templateUrl: './punto-atencion-detail.component.html',
})
export class PuntoAtencionDetailComponent implements OnInit {
  puntoAtencion: IPuntoAtencion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ puntoAtencion }) => {
      this.puntoAtencion = puntoAtencion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
