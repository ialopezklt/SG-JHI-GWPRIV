import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGrupoParametro } from '../grupo-parametro.model';

@Component({
  selector: 'jhi-grupo-parametro-detail',
  templateUrl: './grupo-parametro-detail.component.html',
})
export class GrupoParametroDetailComponent implements OnInit {
  grupoParametro: IGrupoParametro | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grupoParametro }) => {
      this.grupoParametro = grupoParametro;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
