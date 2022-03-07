import { IGrupoParametro } from 'app/entities/grupo-parametro/grupo-parametro.model';

export interface IParametro {
  parametroId?: number;
  valor?: string | null;
  descripcion?: string | null;
  cifrado?: boolean | null;
  grupoParametro?: IGrupoParametro | null;
}

export class Parametro implements IParametro {
  constructor(
    public parametroId?: number,
    public valor?: string | null,
    public descripcion?: string | null,
    public cifrado?: boolean | null,
    public grupoParametro?: IGrupoParametro | null
  ) {
    this.cifrado = this.cifrado ?? false;
  }
}

export function getParametroIdentifier(parametro: IParametro): number | undefined {
  return parametro.parametroId;
}
