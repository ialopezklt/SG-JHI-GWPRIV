import dayjs from 'dayjs/esm';
import { TipoDocumento } from 'app/entities/enumerations/tipo-documento.model';

export interface ILogUso {
  logUsoId?: number;
  usuario?: string | null;
  opcion?: string;
  fechaHora?: dayjs.Dayjs | null;
  tipoDocumento?: TipoDocumento | null;
  numeroDocumento?: string | null;
  pin?: string | null;
  clienteSospechoso?: string | null;
  datosAnteriores?: string | null;
  nombreCompleto?: string | null;
}

export class LogUso implements ILogUso {
  constructor(
    public logUsoId?: number,
    public usuario?: string | null,
    public opcion?: string,
    public fechaHora?: dayjs.Dayjs | null,
    public tipoDocumento?: TipoDocumento | null,
    public numeroDocumento?: string | null,
    public pin?: string | null,
    public clienteSospechoso?: string | null,
    public datosAnteriores?: string | null,
    public nombreCompleto?: string | null
  ) {}
}

export function getLogUsoIdentifier(logUso: ILogUso): number | undefined {
  return logUso.logUsoId;
}
