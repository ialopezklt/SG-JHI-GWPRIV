import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { GrupoParametroComponent } from './list/grupo-parametro.component';
import { GrupoParametroDetailComponent } from './detail/grupo-parametro-detail.component';
import { GrupoParametroUpdateComponent } from './update/grupo-parametro-update.component';
import { GrupoParametroDeleteDialogComponent } from './delete/grupo-parametro-delete-dialog.component';
import { GrupoParametroRoutingModule } from './route/grupo-parametro-routing.module';

@NgModule({
  imports: [SharedModule, GrupoParametroRoutingModule],
  declarations: [
    GrupoParametroComponent,
    GrupoParametroDetailComponent,
    GrupoParametroUpdateComponent,
    GrupoParametroDeleteDialogComponent,
  ],
  entryComponents: [GrupoParametroDeleteDialogComponent],
})
export class GrupoParametroModule {}
