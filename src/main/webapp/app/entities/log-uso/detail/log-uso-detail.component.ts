import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILogUso } from '../log-uso.model';

@Component({
  selector: 'jhi-log-uso-detail',
  templateUrl: './log-uso-detail.component.html',
})
export class LogUsoDetailComponent implements OnInit {
  logUso: ILogUso | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logUso }) => {
      this.logUso = logUso;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
