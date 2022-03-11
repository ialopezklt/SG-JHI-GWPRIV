import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LogUsoComponent } from './list/log-uso.component';
import { LogUsoDetailComponent } from './detail/log-uso-detail.component';
import { LogUsoUpdateComponent } from './update/log-uso-update.component';
import { LogUsoDeleteDialogComponent } from './delete/log-uso-delete-dialog.component';
import { LogUsoRoutingModule } from './route/log-uso-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [SharedModule, LogUsoRoutingModule],
  declarations: [LogUsoComponent, LogUsoDetailComponent, LogUsoUpdateComponent, LogUsoDeleteDialogComponent],
  entryComponents: [LogUsoDeleteDialogComponent],
})
export class LogUsoModule {}
