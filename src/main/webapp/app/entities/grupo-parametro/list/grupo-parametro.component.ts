import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGrupoParametro } from '../grupo-parametro.model';
import { GrupoParametroService } from '../service/grupo-parametro.service';
import { GrupoParametroDeleteDialogComponent } from '../delete/grupo-parametro-delete-dialog.component';

@Component({
  selector: 'jhi-grupo-parametro',
  templateUrl: './grupo-parametro.component.html',
})
export class GrupoParametroComponent implements OnInit {
  grupoParametros?: IGrupoParametro[];
  isLoading = false;

  constructor(protected grupoParametroService: GrupoParametroService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.grupoParametroService.query().subscribe({
      next: (res: HttpResponse<IGrupoParametro[]>) => {
        this.isLoading = false;
        this.grupoParametros = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackGrupoParametroId(index: number, item: IGrupoParametro): number {
    return item.grupoParametroId!;
  }

  delete(grupoParametro: IGrupoParametro): void {
    const modalRef = this.modalService.open(GrupoParametroDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.grupoParametro = grupoParametro;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
