import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILogUso } from '../log-uso.model';
import { LogUsoService } from '../service/log-uso.service';

@Component({
  templateUrl: './log-uso-delete-dialog.component.html',
})
export class LogUsoDeleteDialogComponent {
  logUso?: ILogUso;

  constructor(protected logUsoService: LogUsoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.logUsoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
