import { IParametro } from 'app/entities/parametro/parametro.model';

export interface IGrupoParametro {
  grupoParametroId?: number;
  nombre?: string;
  activo?: string;
  parametros?: IParametro[] | null;
}

export class GrupoParametro implements IGrupoParametro {
  constructor(public grupoParametroId?: number, public nombre?: string, public activo?: string, public parametros?: IParametro[] | null) {}
}

export function getGrupoParametroIdentifier(grupoParametro: IGrupoParametro): number | undefined {
  return grupoParametro.grupoParametroId;
}
