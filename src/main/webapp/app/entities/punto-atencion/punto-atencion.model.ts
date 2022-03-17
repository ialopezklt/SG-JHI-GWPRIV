export interface IPuntoAtencion {
  puntoAtencionId?: number;
  departamento?: string | null;
  ciudad?: string | null;
  direccion?: string | null;
}

export class PuntoAtencion implements IPuntoAtencion {
  constructor(
    public puntoAtencionId?: number,
    public departamento?: string | null,
    public ciudad?: string | null,
    public direccion?: string | null
  ) {}
}

export function getPuntoAtencionIdentifier(puntoAtencion: IPuntoAtencion): number | undefined {
  return puntoAtencion.puntoAtencionId;
}
