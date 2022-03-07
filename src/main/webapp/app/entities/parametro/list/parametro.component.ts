import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IParametro } from '../parametro.model';
import { ParametroService } from '../service/parametro.service';
import { ParametroDeleteDialogComponent } from '../delete/parametro-delete-dialog.component';
import { GrupoParametroService } from 'app/entities/grupo-parametro/service/grupo-parametro.service';
import { IGrupoParametro } from 'app/entities/grupo-parametro/grupo-parametro.model';

@Component({
  selector: 'jhi-parametro',
  templateUrl: './parametro.component.html',
})
export class ParametroComponent implements OnInit {
  parametros?: IParametro[];
  isLoading = false;
  listaGrupos?: IGrupoParametro[];
  grupoParametroSeleccionado = 'all';

  constructor(
    protected parametroService: ParametroService,
    protected modalService: NgbModal,
    protected grupoParametroService: GrupoParametroService
  ) {}

  loadAll(): void {
    this.isLoading = true;

    let fitroPorGrupo: any | undefined;
    if (this.grupoParametroSeleccionado === 'all') {
      fitroPorGrupo = '';
    } else {
      fitroPorGrupo = { grupoParametroId: this.grupoParametroSeleccionado };
    }

    this.parametroService.query(fitroPorGrupo).subscribe({
      next: (res: HttpResponse<IParametro[]>) => {
        this.isLoading = false;
        this.parametros = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.obtieneGrupos();
    this.loadAll();
  }

  trackParametroId(index: number, item: IParametro): number {
    return item.parametroId!;
  }

  delete(parametro: IParametro): void {
    const modalRef = this.modalService.open(ParametroDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.parametro = parametro;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  obtieneGrupos(): void {
    this.grupoParametroService.query().subscribe({
      next: resp => (this.listaGrupos = resp.body!),
    });
  }
}
