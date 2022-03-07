import dayjs from 'dayjs/esm';
import { IRol } from 'app/entities/rol/rol.model';
import { TipoUsuario } from 'app/entities/enumerations/tipo-usuario.model';
import { TipoDocumento } from 'app/entities/enumerations/tipo-documento.model';

export interface IUsuario {
  usuarioId?: number;
  tipoUsuario?: TipoUsuario;
  username?: string;
  clave?: string;
  activo?: string;
  correo?: string;
  celular?: number | null;
  tipoDocumento?: TipoDocumento;
  numeroDocumento?: string;
  primerNombre?: string;
  segundoNombre?: string | null;
  primerApellido?: string;
  segundoApellido?: string | null;
  ultimoIngreso?: dayjs.Dayjs | null;
  inicioInactivacion?: dayjs.Dayjs | null;
  finInactivacion?: dayjs.Dayjs | null;
  fechaCreacion?: dayjs.Dayjs | null;
  creadoPor?: string | null;
  rols?: IRol[] | null;
}

export class Usuario implements IUsuario {
  constructor(
    public usuarioId?: number,
    public tipoUsuario?: TipoUsuario,
    public username?: string,
    public clave?: string,
    public activo?: string,
    public correo?: string,
    public celular?: number | null,
    public tipoDocumento?: TipoDocumento,
    public numeroDocumento?: string,
    public primerNombre?: string,
    public segundoNombre?: string | null,
    public primerApellido?: string,
    public segundoApellido?: string | null,
    public ultimoIngreso?: dayjs.Dayjs | null,
    public inicioInactivacion?: dayjs.Dayjs | null,
    public finInactivacion?: dayjs.Dayjs | null,
    public fechaCreacion?: dayjs.Dayjs | null,
    public creadoPor?: string | null,
    public rols?: IRol[] | null
  ) {}
}

export function getUsuarioIdentifier(usuario: IUsuario): number | undefined {
  return usuario.usuarioId;
}
