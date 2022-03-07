import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILogUso } from '../log-uso.model';
import { LogUsoService } from '../service/log-uso.service';
import { LogUsoDeleteDialogComponent } from '../delete/log-uso-delete-dialog.component';

@Component({
  selector: 'jhi-log-uso',
  templateUrl: './log-uso.component.html',
})
export class LogUsoComponent implements OnInit {
  logUsos?: ILogUso[];
  isLoading = false;

  constructor(protected logUsoService: LogUsoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.logUsoService.query().subscribe({
      next: (res: HttpResponse<ILogUso[]>) => {
        this.isLoading = false;
        this.logUsos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackLogUsoId(index: number, item: ILogUso): number {
    return item.logUsoId!;
  }

  delete(logUso: ILogUso): void {
    const modalRef = this.modalService.open(LogUsoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.logUso = logUso;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
