import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ILogUso, LogUso } from '../log-uso.model';
import { LogUsoService } from '../service/log-uso.service';
import { TipoDocumento } from 'app/entities/enumerations/tipo-documento.model';

@Component({
  selector: 'jhi-log-uso-update',
  templateUrl: './log-uso-update.component.html',
})
export class LogUsoUpdateComponent implements OnInit {
  isSaving = false;
  tipoDocumentoValues = Object.keys(TipoDocumento);

  editForm = this.fb.group({
    logUsoId: [],
    usuario: [],
    opcion: [null, [Validators.required]],
    fechaHora: [],
    tipoDocumento: [],
    numeroDocumento: [],
    pin: [],
    clienteSospechoso: [],
    datosAnteriores: [],
  });

  constructor(protected logUsoService: LogUsoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logUso }) => {
      if (logUso.logUsoId === undefined) {
        const today = dayjs().startOf('day');
        logUso.fechaHora = today;
      }

      this.updateForm(logUso);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const logUso = this.createFromForm();
    if (logUso.logUsoId !== undefined) {
      this.subscribeToSaveResponse(this.logUsoService.update(logUso));
    } else {
      this.subscribeToSaveResponse(this.logUsoService.create(logUso));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogUso>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(logUso: ILogUso): void {
    this.editForm.patchValue({
      logUsoId: logUso.logUsoId,
      usuario: logUso.usuario,
      opcion: logUso.opcion,
      fechaHora: logUso.fechaHora ? logUso.fechaHora.format(DATE_TIME_FORMAT) : null,
      tipoDocumento: logUso.tipoDocumento,
      numeroDocumento: logUso.numeroDocumento,
      pin: logUso.pin,
      clienteSospechoso: logUso.clienteSospechoso,
      datosAnteriores: logUso.datosAnteriores,
    });
  }

  protected createFromForm(): ILogUso {
    return {
      ...new LogUso(),
      logUsoId: this.editForm.get(['logUsoId'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
      opcion: this.editForm.get(['opcion'])!.value,
      fechaHora: this.editForm.get(['fechaHora'])!.value ? dayjs(this.editForm.get(['fechaHora'])!.value, DATE_TIME_FORMAT) : undefined,
      tipoDocumento: this.editForm.get(['tipoDocumento'])!.value,
      numeroDocumento: this.editForm.get(['numeroDocumento'])!.value,
      pin: this.editForm.get(['pin'])!.value,
      clienteSospechoso: this.editForm.get(['clienteSospechoso'])!.value,
      datosAnteriores: this.editForm.get(['datosAnteriores'])!.value,
    };
  }
}
