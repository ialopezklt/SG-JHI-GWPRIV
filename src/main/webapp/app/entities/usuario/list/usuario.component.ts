import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUsuario } from '../usuario.model';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioDeleteDialogComponent } from '../delete/usuario-delete-dialog.component';
import { TipoUsuario } from 'app/entities/enumerations/tipo-usuario.model';

@Component({
  selector: 'jhi-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {
  usuarios?: IUsuario[];
  isLoading = false;

  constructor(protected usuarioService: UsuarioService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.usuarioService.query().subscribe({
      next: (res: HttpResponse<IUsuario[]>) => {
        this.isLoading = false;
        this.usuarios = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackUsuarioId(index: number, item: IUsuario): number {
    return item.usuarioId!;
  }

  delete(usuario: IUsuario): void {
    const modalRef = this.modalService.open(UsuarioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.usuario = usuario;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  public get tipoUsuario(): typeof TipoUsuario {
    return TipoUsuario;
  }
}
