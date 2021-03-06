import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IRol, Rol } from '../rol.model';
import { RolService } from '../service/rol.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'jhi-rol-update',
  templateUrl: './rol-update.component.html',
})
export class RolUpdateComponent implements OnInit {
  isSaving = false;

  usuariosSharedCollection: IUsuario[] = [];
  usuarioAAdcionalAlRol!: IUsuario;
  mensajeResultadoBusqueda = '';
  campoNombreReadOnly = true;

  editForm = this.fb.group({
    rolId: [],
    nombre: [null, [Validators.required]],
    activo: [],
    usuarios: [],
  });

  constructor(
    protected rolService: RolService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private modalService: NgbModal,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rol }) => {
      console.log('rol recibido:');
      console.log(rol);
      this.updateForm(rol);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rol = this.createFromForm();
    if (rol.rolId !== undefined) {
      this.subscribeToSaveResponse(this.rolService.update(rol));
    } else {
      this.subscribeToSaveResponse(this.rolService.create(rol));
    }
  }

  trackUsuarioByUsuarioId(index: number, item: IUsuario): number {
    return item.usuarioId!;
  }

  getSelectedUsuario(option: IUsuario, selectedVals?: IUsuario[]): IUsuario {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.usuarioId === selectedVal.usuarioId) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  openModal(contenidoModal: any): void {
    this.modalService.open(contenidoModal, { ariaLabelledBy: 'modal-basic-title' }).result.then(result => {
      const botonModal = result;
      if (botonModal === 'Guardar') {
        this.usuariosSharedCollection.push(this.usuarioAAdcionalAlRol);
      }
    });
  }

  buscarUsuario(nombreUsuario: HTMLInputElement): void {
    this.spinnerService.show();
    this.mensajeResultadoBusqueda = '';
    console.log('username recibido del modal:');
    console.log(nombreUsuario.value);
    this.usuarioService.findByUsername(nombreUsuario.value).subscribe({
      next: usuario => {
        this.spinnerService.hide();
        this.usuarioAAdcionalAlRol = usuario.body!;
        this.mensajeResultadoBusqueda = this.usuarioAAdcionalAlRol.primerNombre! + ' ' + this.usuarioAAdcionalAlRol.primerApellido!;
      },
      error: () => {
        this.spinnerService.hide();
        this.mensajeResultadoBusqueda = 'Usuario no encontrado';
      },
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRol>>): void {
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

  protected updateForm(rol: IRol): void {
    if (rol.rolId === undefined) {
      this.campoNombreReadOnly = false;
      rol.activo = 'S';
    } else {
      if (rol.rolId >= 1 && rol.rolId <= 3) {
        this.campoNombreReadOnly = true;
      }
    }

    this.editForm.patchValue({
      rolId: rol.rolId,
      nombre: rol.nombre,
      activo: rol.activo,
      usuarios: rol.usuariosPorRol,
    });

    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing(
      this.usuariosSharedCollection,
      ...(rol.usuariosPorRol ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) =>
          this.usuarioService.addUsuarioToCollectionIfMissing(usuarios, ...(this.editForm.get('usuarios')!.value ?? []))
        )
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }

  protected createFromForm(): IRol {
    return {
      ...new Rol(),
      rolId: this.editForm.get(['rolId'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      usuariosPorRol: this.editForm.get(['usuarios'])!.value,
    };
  }
}
