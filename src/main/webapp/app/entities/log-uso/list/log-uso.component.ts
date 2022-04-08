import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbCalendar, NgbDate, NgbModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { ILogUso } from '../log-uso.model';
import { LogUsoService } from '../service/log-uso.service';
import { LogUsoDeleteDialogComponent } from '../delete/log-uso-delete-dialog.component';

import * as XLSX from 'xlsx';

@Component({
  selector: 'jhi-log-uso',
  templateUrl: './log-uso.component.html',
})
export class LogUsoComponent implements OnInit {
  logUsos?: ILogUso[];
  isLoading = false;
  parFechaIni: NgbDate | null;
  parFechaFin: NgbDate | null;
  parPin = '';
  parNumeroIdentificacion = '';
  parClienteSospechoso = '';
  fileName = 'log-uso-rastreo-giros.xlsx';
  columnaNoExportar = true;
  mostrarMensajeFechas: boolean;
  mostrarMensajeSospechosoFechas: boolean;
  fecha1 = '';
  fecha2 = '';

  constructor(
    protected logUsoService: LogUsoService,
    protected modalService: NgbModal,
    protected calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.parFechaIni = this.calendar.getToday();
    this.parFechaFin = this.calendar.getToday();
    this.mostrarMensajeFechas = false;
    this.mostrarMensajeSospechosoFechas = false;
  }

  ngOnInit(): void {
    this.parFechaIni = this.calendar.getToday();
    this.parFechaFin = this.calendar.getToday();
    this.fecha1 = this.fechaToString(this.parFechaIni);
    this.fecha2 = this.fechaToString(this.parFechaFin);
    this.parPin = '';
    this.parNumeroIdentificacion = '';
    this.parClienteSospechoso = '';
    this.loadAll();
  }

  loadAll(): void {
    this.fecha1 = this.fechaToString(this.parFechaIni);
    this.fecha2 = this.fechaToString(this.parFechaFin);

    if (this.parFechaFin !== null) {
      if (this.parFechaFin.before(this.parFechaIni)) {
        this.mostrarMensajeFechas = true;
        return;
      } else {
        this.mostrarMensajeFechas = false;
      }
    } else {
      this.mostrarMensajeFechas = false;
    }

    if (this.parFechaIni === null && this.parClienteSospechoso !== '') {
      this.mostrarMensajeSospechosoFechas = true;
      return;
    } else {
      this.mostrarMensajeSospechosoFechas = false;
    }
    this.isLoading = true;
    const criterios = {
      fechaIni: this.fecha1,
      fechaFin: this.fecha2,
      pin: this.parPin,
      numeroIdentificacion: this.parNumeroIdentificacion,
      clienteSospechoso: this.parClienteSospechoso,
    };

    this.logUsoService.queryCriteria(criterios).subscribe({
      next: (res: HttpResponse<ILogUso[]>) => {
        this.isLoading = false;
        this.logUsos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    if (input === '') {
      return null;
    }
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  fechaToString(fecha: NgbDate | null): string {
    if (fecha === null) {
      return '';
    }
    return (
      fecha.year.toString() +
      '-' +
      ('0' + fecha.month.toString()).substring(('0' + fecha.month.toString()).length - 2) +
      '-' +
      ('0' + fecha.day.toString()).substring(('0' + fecha.day.toString()).length - 2)
    );
  }

  exportarExcel(): void {
    const jsonFiltrado: any[] = [];
    let filaFiltrada: FilaExcel = new FilaExcel();
    this.logUsos?.forEach(reg => {
      filaFiltrada = new FilaExcel();
      filaFiltrada.tipoAccion = reg.opcion!;
      filaFiltrada.pin = reg.pin!;
      filaFiltrada.tipoDocumento = reg.tipoDocumento!;
      filaFiltrada.numeroId = reg.numeroDocumento!;
      filaFiltrada.nombre = reg.nombreCompleto!;
      filaFiltrada.fecha = reg.fechaHora!.format('DD/MM/YYYY');
      filaFiltrada.hora = reg.fechaHora!.format('HH:mm');
      filaFiltrada.sospechoso = reg.clienteSospechoso === 'S' ? 'Si' : 'No';
      jsonFiltrado.push(filaFiltrada);
    });
    this.columnaNoExportar = false;

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonFiltrado);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');

    this.columnaNoExportar = true;
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  onDateSelectF1(fec1: NgbDate): void {
    this.parFechaIni = fec1;
  }

  onDateSelectF2(fec2: NgbDate): void {
    this.parFechaFin = fec2;
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

class FilaExcel {
  tipoAccion?: string;
  pin?: string;
  tipoDocumento?: string;
  numeroId?: string;
  nombre?: string;
  fecha?: string;
  hora?: string;
  sospechoso?: string;
}
