import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IGrupoParametro } from '../grupo-parametro.model';
import { GrupoParametroService } from '../service/grupo-parametro.service';

@Component({
  templateUrl: './grupo-parametro-delete-dialog.component.html',
})
export class GrupoParametroDeleteDialogComponent {
  grupoParametro?: IGrupoParametro;

  constructor(protected grupoParametroService: GrupoParametroService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.grupoParametroService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
