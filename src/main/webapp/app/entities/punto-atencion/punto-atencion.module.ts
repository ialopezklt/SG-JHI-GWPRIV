import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PuntoAtencionComponent } from './list/punto-atencion.component';
import { PuntoAtencionDetailComponent } from './detail/punto-atencion-detail.component';
import { PuntoAtencionUpdateComponent } from './update/punto-atencion-update.component';
import { PuntoAtencionDeleteDialogComponent } from './delete/punto-atencion-delete-dialog.component';
import { PuntoAtencionRoutingModule } from './route/punto-atencion-routing.module';

@NgModule({
  imports: [SharedModule, PuntoAtencionRoutingModule],
  declarations: [PuntoAtencionComponent, PuntoAtencionDetailComponent, PuntoAtencionUpdateComponent, PuntoAtencionDeleteDialogComponent],
  entryComponents: [PuntoAtencionDeleteDialogComponent],
})
export class PuntoAtencionModule {}
