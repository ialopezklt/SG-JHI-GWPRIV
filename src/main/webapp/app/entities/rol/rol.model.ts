import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface IRol {
  rolId?: number;
  nombre?: string;
  activo?: string | null;
  usuariosPorRol?: IUsuario[] | null;
}

export class Rol implements IRol {
  constructor(public rolId?: number, public nombre?: string, public activo?: string | null, public usuarios?: IUsuario[] | null) {}
}

export function getRolIdentifier(rol: IRol): number | undefined {
  return rol.rolId;
}
