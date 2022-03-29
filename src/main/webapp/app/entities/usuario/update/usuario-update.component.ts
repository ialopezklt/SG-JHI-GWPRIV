import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IUsuario, Usuario } from '../usuario.model';
import { UsuarioService } from '../service/usuario.service';
import { TipoUsuario } from 'app/entities/enumerations/tipo-usuario.model';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./toggle-css.scss'],
})
export class UsuarioUpdateComponent implements OnInit {
  isSaving = false;
  tipoUsuarioValues = Object.keys(TipoUsuario);
  /*  tipoDocumentoValues = Object.keys(TipoDocumento); */
  tipoDocumentoValues = [
    { key: 'CC', value: 'Cédula de ciudadanía' },
    { key: 'CEX', value: 'Cédula de Extranjería' },
    { key: 'CE', value: 'Cédula de Extranjero' },
    { key: 'PA', value: 'Pasaporte' },
    { key: 'TI', value: 'Tarjeta de Identidad' },
    { key: 'NIT', value: 'NIT' },
  ];
  accountService: AccountService;
  usuarioLogueado = '';
  estadoUsuario = 'Activo';
  estadoPantalla = 'creacion'; // indica si la pantalla es de creacion o edicion
  tipoUsuarioEnFormulario = '';

  editForm = this.fb.group({
    usuarioId: [],
    tipoUsuario: [null, [Validators.required]],
    username: [null, [Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z0-9.-]+')]],
    clave: ['123456789', []],
    activo: [true, [Validators.required]],
    correo: [null, [Validators.required, Validators.minLength(6)]],
    celular: [null, [Validators.min(3000000000), Validators.max(3900000000)]],
    tipoDocumento: [null, [Validators.required]],
    numeroDocumento: [null, [Validators.required]],
    primerNombre: [null, [Validators.required]],
    segundoNombre: [],
    primerApellido: [null, [Validators.required]],
    segundoApellido: [],
    ultimoIngreso: [],
    inicioInactivacion: [],
    finInactivacion: [],
    fechaCreacion: [],
    creadoPor: [],
  });

  constructor(
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    accountService: AccountService
  ) {
    this.accountService = accountService;
  }

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.usuarioLogueado = account.login;
      }
    });

    this.activatedRoute.data.subscribe(({ usuario }) => {
      if (usuario.usuarioId === undefined) {
        const today = dayjs().startOf('day');
        usuario.fechaCreacion = today;

        this.estadoPantalla = 'creacion';
        console.log('cuenta sesion:');
        console.log(this.usuarioLogueado);
        usuario.creadoPor = this.usuarioLogueado;
        usuario.tipoUsuario = 'Interno';
        const fecha = new Date();
        usuario.clave = btoa(fecha.toISOString());
      } else {
        this.estadoPantalla = 'edicion';
      }
      this.tipoUsuarioEnFormulario = usuario.tipoUsuario;
      this.updateForm(usuario);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuario = this.createFromForm();
    console.log(usuario);
    if (usuario.usuarioId !== undefined) {
      this.subscribeToSaveResponse(this.usuarioService.update(usuario));
    } else {
      this.subscribeToSaveResponse(this.usuarioService.create(usuario));
    }
  }

  cambiaEstadoUsuario(): void {
    this.estadoUsuario = this.estadoUsuario === 'Activo' ? 'Inactivo' : 'Activo';
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>): void {
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

  protected updateForm(usuario: IUsuario): void {
    this.editForm.patchValue({
      usuarioId: usuario.usuarioId,
      tipoUsuario: usuario.tipoUsuario,
      username: usuario.username,
      clave: usuario.clave,
      activo: usuario.activo,
      correo: usuario.correo,
      celular: usuario.celular,
      tipoDocumento: usuario.tipoDocumento,
      numeroDocumento: usuario.numeroDocumento,
      primerNombre: usuario.primerNombre,
      segundoNombre: usuario.segundoNombre,
      primerApellido: usuario.primerApellido,
      segundoApellido: usuario.segundoApellido,
      ultimoIngreso: usuario.ultimoIngreso ? usuario.ultimoIngreso.format(DATE_TIME_FORMAT) : null,
      inicioInactivacion: usuario.inicioInactivacion ? usuario.inicioInactivacion.format(DATE_TIME_FORMAT) : null,
      finInactivacion: usuario.finInactivacion ? usuario.finInactivacion.format(DATE_TIME_FORMAT) : null,
      fechaCreacion: usuario.fechaCreacion ? usuario.fechaCreacion.format(DATE_TIME_FORMAT) : null,
      creadoPor: usuario.creadoPor,
    });
    this.estadoUsuario = usuario.activo ? 'Activo' : 'Inactivo';
  }

  protected createFromForm(): IUsuario {
    return {
      ...new Usuario(),
      usuarioId: this.editForm.get(['usuarioId'])!.value,
      tipoUsuario: this.editForm.get(['tipoUsuario'])!.value,
      username: this.editForm.get(['username'])!.value,
      clave: this.editForm.get(['clave'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      correo: this.editForm.get(['correo'])!.value,
      celular: this.editForm.get(['celular'])!.value,
      tipoDocumento: this.editForm.get(['tipoDocumento'])!.value,
      numeroDocumento: this.editForm.get(['numeroDocumento'])!.value,
      primerNombre: this.editForm.get(['primerNombre'])!.value,
      segundoNombre: this.editForm.get(['segundoNombre'])!.value,
      primerApellido: this.editForm.get(['primerApellido'])!.value,
      segundoApellido: this.editForm.get(['segundoApellido'])!.value,
      fechaCreacion: this.editForm.get(['fechaCreacion'])!.value
        ? dayjs(this.editForm.get(['fechaCreacion'])!.value, DATE_TIME_FORMAT)
        : undefined,
      inicioInactivacion: this.editForm.get(['inicioInactivacion'])!.value
        ? dayjs(this.editForm.get(['inicioInactivacion'])!.value, DATE_TIME_FORMAT)
        : undefined,
      finInactivacion: this.editForm.get(['finInactivacion'])!.value
        ? dayjs(this.editForm.get(['finInactivacion'])!.value, DATE_TIME_FORMAT)
        : undefined,
      creadoPor: this.editForm.get(['creadoPor'])!.value,
    };
  }

  /*
      ultimoIngreso: this.editForm.get(['ultimoIngreso'])!.value
        ? dayjs(this.editForm.get(['ultimoIngreso'])!.value, DATE_TIME_FORMAT)
        : undefined,
*/
}
