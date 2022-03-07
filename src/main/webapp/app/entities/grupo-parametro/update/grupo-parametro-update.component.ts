import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IGrupoParametro, GrupoParametro } from '../grupo-parametro.model';
import { GrupoParametroService } from '../service/grupo-parametro.service';

@Component({
  selector: 'jhi-grupo-parametro-update',
  templateUrl: './grupo-parametro-update.component.html',
})
export class GrupoParametroUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    grupoParametroId: [],
    nombre: [null, [Validators.required]],
    activo: [null, [Validators.required]],
  });

  constructor(
    protected grupoParametroService: GrupoParametroService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grupoParametro }) => {
      this.updateForm(grupoParametro);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grupoParametro = this.createFromForm();
    if (grupoParametro.grupoParametroId !== undefined) {
      this.subscribeToSaveResponse(this.grupoParametroService.update(grupoParametro));
    } else {
      this.subscribeToSaveResponse(this.grupoParametroService.create(grupoParametro));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrupoParametro>>): void {
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

  protected updateForm(grupoParametro: IGrupoParametro): void {
    this.editForm.patchValue({
      grupoParametroId: grupoParametro.grupoParametroId,
      nombre: grupoParametro.nombre,
      activo: grupoParametro.activo,
    });
  }

  protected createFromForm(): IGrupoParametro {
    return {
      ...new GrupoParametro(),
      grupoParametroId: this.editForm.get(['grupoParametroId'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      activo: this.editForm.get(['activo'])!.value,
    };
  }
}
