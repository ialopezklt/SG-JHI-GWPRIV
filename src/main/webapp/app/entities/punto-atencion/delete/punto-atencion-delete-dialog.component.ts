import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPuntoAtencion } from '../punto-atencion.model';
import { PuntoAtencionService } from '../service/punto-atencion.service';

@Component({
  templateUrl: './punto-atencion-delete-dialog.component.html',
})
export class PuntoAtencionDeleteDialogComponent {
  puntoAtencion?: IPuntoAtencion;

  constructor(protected puntoAtencionService: PuntoAtencionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.puntoAtencionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
