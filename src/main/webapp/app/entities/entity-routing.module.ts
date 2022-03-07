import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'rol',
        data: { pageTitle: 'Roles' },
        loadChildren: () => import('./rol/rol.module').then(m => m.RolModule),
      },
      {
        path: 'usuario',
        data: { pageTitle: 'Usuarios' },
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
      },
      {
        path: 'log-uso',
        data: { pageTitle: 'Logs Uso' },
        loadChildren: () => import('./log-uso/log-uso.module').then(m => m.LogUsoModule),
      },
      {
        path: 'grupo-parametro',
        data: { pageTitle: 'Grupo de Parametros' },
        loadChildren: () => import('./grupo-parametro/grupo-parametro.module').then(m => m.GrupoParametroModule),
      },
      {
        path: 'parametro',
        data: { pageTitle: 'Parámetros' },
        loadChildren: () => import('./parametro/parametro.module').then(m => m.ParametroModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
