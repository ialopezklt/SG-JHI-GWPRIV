import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILogUso } from '../log-uso.model';
import { LogUsoService } from '../service/log-uso.service';
import { LogUsoDeleteDialogComponent } from '../delete/log-uso-delete-dialog.component';

import * as XLSX from 'xlsx';

@Component({
  selector: 'jhi-log-uso',
  templateUrl: './log-uso.component.html',
})
export class LogUsoComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  logUsos?: ILogUso[];
  isLoading = false;
  parFechaIni: NgbDateStruct;
  parFechaFin: NgbDateStruct;
  parPin = '';
  parNumeroIdentificacion = '';
  parClienteSospechoso = '';
  fileName = 'log-uso-rastreo-giros.xlsx';
  columnaNoExportar = true;

  constructor(protected logUsoService: LogUsoService, protected modalService: NgbModal, private calendar: NgbCalendar) {
    this.parFechaIni = this.calendar.getToday();
    console.log(this.parFechaIni);
    this.parFechaFin = this.calendar.getToday();
  }

  loadAll(): void {
    const fecha1 = this.parFechaIni.year.toString() + '-' + this.parFechaIni.month.toString() + '-' + this.parFechaIni.day.toString();
    const fecha2 = this.parFechaFin.year.toString() + '-' + this.parFechaFin.month.toString() + '-' + this.parFechaFin.day.toString();
    this.isLoading = true;
    const criterios = {
      fechaIni: fecha1,
      fechaFin: fecha2,
      pin: this.parPin,
      numeroIdentificacion: this.parNumeroIdentificacion,
      clienteSospechoso: this.parClienteSospechoso,
    };

    this.logUsoService.queryCriteria(criterios).subscribe({
      next: (res: HttpResponse<ILogUso[]>) => {
        console.log('obtuvo respuesta');
        this.isLoading = false;
        this.logUsos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.parPin = '';
    this.parNumeroIdentificacion = '';
    this.parClienteSospechoso = '';
    this.loadAll();
  }

  exportarExcel(): void {
    this.columnaNoExportar = false;
    //* table id is passed over here */
    const element = document.getElementById('tab_logs');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    this.columnaNoExportar = true;
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  onDateSelectF1(evento: any): void {
    this.parFechaIni = evento;
  }

  onDateSelectF2(evento: any): void {
    this.parFechaFin = evento;
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
