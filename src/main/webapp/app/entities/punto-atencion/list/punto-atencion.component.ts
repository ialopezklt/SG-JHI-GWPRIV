import { Component, OnInit, PipeTransform } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPuntoAtencion } from '../punto-atencion.model';
import { PuntoAtencionService } from '../service/punto-atencion.service';
import { PuntoAtencionDeleteDialogComponent } from '../delete/punto-atencion-delete-dialog.component';
import { FormControl } from '@angular/forms';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'jhi-punto-atencion',
  templateUrl: './punto-atencion.component.html',
})
export class PuntoAtencionComponent implements OnInit {
  puntoAtencions?: IPuntoAtencion[];
  listadoTotal?: IPuntoAtencion[];
  isLoading = false;
  page = 1;
  pageSize = 20;
  collectionSize = 0;
  filter = new FormControl('');

  constructor(protected puntoAtencionService: PuntoAtencionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.puntoAtencionService.query().subscribe({
      next: (res: HttpResponse<IPuntoAtencion[]>) => {
        this.isLoading = false;
        this.listadoTotal = res.body ?? [];
        this.collectionSize = this.listadoTotal.length;
        this.cargarItemsPagina();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  cargarItemsPagina(): void {
    this.puntoAtencions = this.listadoTotal!.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  selectPage(page: string): void {
    this.page = parseInt(page, 10) || 1;
    this.cargarItemsPagina();
  }

  formatInput(input: HTMLInputElement): void {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  search(text: string, pipe: PipeTransform): IPuntoAtencion[] {
    return this.puntoAtencions!.filter(puntoA => {
      const term = text.toLowerCase();
      return (
        puntoA.ciudad!.toLowerCase().includes(term) ||
        pipe.transform(puntoA.departamento).includes(term) ||
        pipe.transform(puntoA.direccion).includes(term)
      );
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackPuntoAtencionId(index: number, item: IPuntoAtencion): number {
    return item.puntoAtencionId!;
  }

  delete(puntoAtencion: IPuntoAtencion): void {
    const modalRef = this.modalService.open(PuntoAtencionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.puntoAtencion = puntoAtencion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
