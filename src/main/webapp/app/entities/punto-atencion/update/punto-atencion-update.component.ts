import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPuntoAtencion, PuntoAtencion } from '../punto-atencion.model';
import { ICiudades, PuntoAtencionService } from '../service/punto-atencion.service';

@Component({
  selector: 'jhi-punto-atencion-update',
  templateUrl: './punto-atencion-update.component.html',
})
export class PuntoAtencionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    puntoAtencionId: [],
    departamento: [],
    ciudad: [],
    direccion: [],
  });

  listaDepartamentos: ICiudades[];
  listaCiudadPorDepartamento: ICiudades[];
  fullJsonDataGov: ICiudades[];

  constructor(protected puntoAtencionService: PuntoAtencionService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {
    this.listaDepartamentos = [];
    this.listaCiudadPorDepartamento = [];
    this.fullJsonDataGov = [];
  }

  ngOnInit(): void {
    this.puntoAtencionService.getFullJsonDepartamentosCiudades().subscribe(resp => {
      this.fullJsonDataGov = resp;
      this.fullJsonDataGov.forEach(ciu => {
        if (this.listaDepartamentos.find(temp => temp.departamento.toUpperCase() === ciu.departamento.toUpperCase()) === undefined) {
          ciu.departamento = ciu.departamento.toUpperCase();
          this.listaDepartamentos.push(ciu);
        }
      });
      this.listaDepartamentos.sort((a, b) => (a.departamento < b.departamento ? -1 : a.departamento > b.departamento ? 1 : 0));
    });

    this.activatedRoute.data.subscribe(({ puntoAtencion }) => {
      this.updateForm(puntoAtencion);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const puntoAtencion = this.createFromForm();
    if (puntoAtencion.puntoAtencionId !== undefined) {
      this.subscribeToSaveResponse(this.puntoAtencionService.update(puntoAtencion));
    } else {
      this.subscribeToSaveResponse(this.puntoAtencionService.create(puntoAtencion));
    }
  }

  actualizaMunicipios(departamentoSeleccionado: string): void {
    this.listaCiudadPorDepartamento = [];
    this.fullJsonDataGov
      .filter(munCiu => munCiu.departamento.toUpperCase() === departamentoSeleccionado)
      .forEach(ciu => {
        if (
          this.listaCiudadPorDepartamento.find(
            temp =>
              temp.departamento.toUpperCase() === ciu.departamento.toUpperCase() &&
              temp.municipio.toUpperCase() === ciu.municipio.toUpperCase()
          ) === undefined
        ) {
          ciu.municipio = ciu.municipio.toUpperCase();
          this.listaCiudadPorDepartamento.push(ciu);
        }
      });
    this.listaCiudadPorDepartamento.sort((a, b) => (a.municipio < b.municipio ? -1 : a.municipio > b.municipio ? 1 : 0));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPuntoAtencion>>): void {
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

  protected updateForm(puntoAtencion: IPuntoAtencion): void {
    if (puntoAtencion.departamento) {
      this.actualizaMunicipios(puntoAtencion.departamento);
    }

    this.editForm.patchValue({
      puntoAtencionId: puntoAtencion.puntoAtencionId,
      departamento: puntoAtencion.departamento,
      ciudad: puntoAtencion.ciudad,
      direccion: puntoAtencion.direccion,
    });
  }

  protected createFromForm(): IPuntoAtencion {
    return {
      ...new PuntoAtencion(),
      puntoAtencionId: this.editForm.get(['puntoAtencionId'])!.value,
      departamento: this.editForm.get(['departamento'])!.value,
      ciudad: this.editForm.get(['ciudad'])!.value,
      direccion: this.editForm.get(['direccion'])!.value,
    };
  }

  get getDepartamento(): any {
    return this.editForm.get(['departamento']);
  }

  get getMunicipio(): any {
    return this.editForm.get(['municipio']);
  }
}
