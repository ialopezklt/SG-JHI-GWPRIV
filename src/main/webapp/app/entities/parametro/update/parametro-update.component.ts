import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IParametro, Parametro } from '../parametro.model';
import { ParametroService } from '../service/parametro.service';
import { IGrupoParametro } from 'app/entities/grupo-parametro/grupo-parametro.model';
import { GrupoParametroService } from 'app/entities/grupo-parametro/service/grupo-parametro.service';

@Component({
  selector: 'jhi-parametro-update',
  templateUrl: './parametro-update.component.html',
})
export class ParametroUpdateComponent implements OnInit {
  isSaving = false;

  grupoParametrosSharedCollection: IGrupoParametro[] = [];

  editForm = this.fb.group({
    parametroId: [],
    valor: [],
    descripcion: [],
    cifrado: [],
    grupoPar: [],
  });

  constructor(
    protected parametroService: ParametroService,
    protected grupoParametroService: GrupoParametroService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parametro }) => {
      this.updateForm(parametro);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const parametro = this.createFromForm();
    if (parametro.parametroId !== undefined) {
      this.subscribeToSaveResponse(this.parametroService.update(parametro));
    } else {
      this.subscribeToSaveResponse(this.parametroService.create(parametro));
    }
  }

  trackGrupoParametroByGrupoParametroId(index: number, item: IGrupoParametro): number {
    return item.grupoParametroId!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParametro>>): void {
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

  protected updateForm(parametro: IParametro): void {
    this.editForm.patchValue({
      parametroId: parametro.parametroId,
      valor: parametro.valor,
      descripcion: parametro.descripcion,
      cifrado: parametro.cifrado,
      grupoPar: parametro.grupoParametro,
    });

    this.grupoParametrosSharedCollection = this.grupoParametroService.addGrupoParametroToCollectionIfMissing(
      this.grupoParametrosSharedCollection,
      parametro.grupoParametro
    );
  }

  protected loadRelationshipsOptions(): void {
    this.grupoParametroService
      .query()
      .pipe(map((res: HttpResponse<IGrupoParametro[]>) => res.body ?? []))
      .pipe(
        map((grupoParametros: IGrupoParametro[]) =>
          this.grupoParametroService.addGrupoParametroToCollectionIfMissing(grupoParametros, this.editForm.get('grupoPar')!.value)
        )
      )
      .subscribe((grupoParametros: IGrupoParametro[]) => (this.grupoParametrosSharedCollection = grupoParametros));
  }

  protected createFromForm(): IParametro {
    return {
      ...new Parametro(),
      parametroId: this.editForm.get(['parametroId'])!.value,
      valor: this.editForm.get(['valor'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      cifrado: this.editForm.get(['cifrado'])!.value,
      grupoParametro: this.editForm.get(['grupoPar'])!.value,
    };
  }
}
