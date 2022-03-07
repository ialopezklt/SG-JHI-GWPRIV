package co.com.supergiros.rastreogiros.domain;

import co.com.supergiros.rastreogiros.domain.enumeration.TipoDocumento;
import co.com.supergiros.rastreogiros.domain.enumeration.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.*;

/**
 * A Usuario.
 */
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long usuarioId;

    @NotNull(message = "must not be null")
    private TipoUsuario tipoUsuario;

    @NotNull(message = "must not be null")
    @Size(min = 5)
    private String username;

    @NotNull(message = "must not be null")
    @Size(min = 5)
    private String clave;

    @NotNull(message = "must not be null")
    private String activo;

    @NotNull(message = "must not be null")
    @Size(min = 6)
    private String correo;

    @Min(value = 3000000000L)
    @Max(value = 3900000000L)
    private Long celular;

    @NotNull(message = "must not be null")
    private TipoDocumento tipoDocumento;

    @NotNull(message = "must not be null")
    private String numeroDocumento;

    @NotNull(message = "must not be null")
    private String primerNombre;

    private String segundoNombre;

    @NotNull(message = "must not be null")
    private String primerApellido;

    private String segundoApellido;

    private Instant ultimoIngreso;

    private Instant inicioInactivacion;

    private Instant finInactivacion;

    private Instant fechaCreacion;

    private String creadoPor;

    @JsonIgnoreProperties(value = { "usuarios" }, allowSetters = true)
    private Set<Rol> rols = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getUsuarioId() {
        return this.usuarioId;
    }

    public Usuario usuarioId(Long usuarioId) {
        this.setUsuarioId(usuarioId);
        return this;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public TipoUsuario getTipoUsuario() {
        return this.tipoUsuario;
    }

    public Usuario tipoUsuario(TipoUsuario tipoUsuario) {
        this.setTipoUsuario(tipoUsuario);
        return this;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getUsername() {
        return this.username;
    }

    public Usuario username(String username) {
        this.setUsername(username);
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getClave() {
        return this.clave;
    }

    public Usuario clave(String clave) {
        this.setClave(clave);
        return this;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getActivo() {
        return this.activo;
    }

    public Usuario activo(String activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(String activo) {
        this.activo = activo;
    }

    public String getCorreo() {
        return this.correo;
    }

    public Usuario correo(String correo) {
        this.setCorreo(correo);
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public Long getCelular() {
        return this.celular;
    }

    public Usuario celular(Long celular) {
        this.setCelular(celular);
        return this;
    }

    public void setCelular(Long celular) {
        this.celular = celular;
    }

    public TipoDocumento getTipoDocumento() {
        return this.tipoDocumento;
    }

    public Usuario tipoDocumento(TipoDocumento tipoDocumento) {
        this.setTipoDocumento(tipoDocumento);
        return this;
    }

    public void setTipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getNumeroDocumento() {
        return this.numeroDocumento;
    }

    public Usuario numeroDocumento(String numeroDocumento) {
        this.setNumeroDocumento(numeroDocumento);
        return this;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public String getPrimerNombre() {
        return this.primerNombre;
    }

    public Usuario primerNombre(String primerNombre) {
        this.setPrimerNombre(primerNombre);
        return this;
    }

    public void setPrimerNombre(String primerNombre) {
        this.primerNombre = primerNombre;
    }

    public String getSegundoNombre() {
        return this.segundoNombre;
    }

    public Usuario segundoNombre(String segundoNombre) {
        this.setSegundoNombre(segundoNombre);
        return this;
    }

    public void setSegundoNombre(String segundoNombre) {
        this.segundoNombre = segundoNombre;
    }

    public String getPrimerApellido() {
        return this.primerApellido;
    }

    public Usuario primerApellido(String primerApellido) {
        this.setPrimerApellido(primerApellido);
        return this;
    }

    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    public String getSegundoApellido() {
        return this.segundoApellido;
    }

    public Usuario segundoApellido(String segundoApellido) {
        this.setSegundoApellido(segundoApellido);
        return this;
    }

    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }

    public Instant getUltimoIngreso() {
        return this.ultimoIngreso;
    }

    public Usuario ultimoIngreso(Instant ultimoIngreso) {
        this.setUltimoIngreso(ultimoIngreso);
        return this;
    }

    public void setUltimoIngreso(Instant ultimoIngreso) {
        this.ultimoIngreso = ultimoIngreso;
    }

    public Instant getInicioInactivacion() {
        return this.inicioInactivacion;
    }

    public Usuario inicioInactivacion(Instant inicioInactivacion) {
        this.setInicioInactivacion(inicioInactivacion);
        return this;
    }

    public void setInicioInactivacion(Instant inicioInactivacion) {
        this.inicioInactivacion = inicioInactivacion;
    }

    public Instant getFinInactivacion() {
        return this.finInactivacion;
    }

    public Usuario finInactivacion(Instant finInactivacion) {
        this.setFinInactivacion(finInactivacion);
        return this;
    }

    public void setFinInactivacion(Instant finInactivacion) {
        this.finInactivacion = finInactivacion;
    }

    public Instant getFechaCreacion() {
        return this.fechaCreacion;
    }

    public Usuario fechaCreacion(Instant fechaCreacion) {
        this.setFechaCreacion(fechaCreacion);
        return this;
    }

    public void setFechaCreacion(Instant fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getCreadoPor() {
        return this.creadoPor;
    }

    public Usuario creadoPor(String creadoPor) {
        this.setCreadoPor(creadoPor);
        return this;
    }

    public void setCreadoPor(String creadoPor) {
        this.creadoPor = creadoPor;
    }

    public Set<Rol> getRols() {
        return this.rols;
    }

    public void setRols(Set<Rol> rols) {
        if (this.rols != null) {
            this.rols.forEach(i -> i.removeUsuario(this));
        }
        if (rols != null) {
            rols.forEach(i -> i.addUsuario(this));
        }
        this.rols = rols;
    }

    public Usuario rols(Set<Rol> rols) {
        this.setRols(rols);
        return this;
    }

    public Usuario addRol(Rol rol) {
        this.rols.add(rol);
        rol.getUsuarios().add(this);
        return this;
    }

    public Usuario removeRol(Rol rol) {
        this.rols.remove(rol);
        rol.getUsuarios().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Usuario)) {
            return false;
        }
        return usuarioId != null && usuarioId.equals(((Usuario) o).usuarioId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Usuario{" +
            "usuarioId=" + getUsuarioId() +
            ", tipoUsuario='" + getTipoUsuario() + "'" +
            ", username='" + getUsername() + "'" +
            ", clave='" + getClave() + "'" +
            ", activo='" + getActivo() + "'" +
            ", correo='" + getCorreo() + "'" +
            ", celular=" + getCelular() +
            ", tipoDocumento='" + getTipoDocumento() + "'" +
            ", numeroDocumento='" + getNumeroDocumento() + "'" +
            ", primerNombre='" + getPrimerNombre() + "'" +
            ", segundoNombre='" + getSegundoNombre() + "'" +
            ", primerApellido='" + getPrimerApellido() + "'" +
            ", segundoApellido='" + getSegundoApellido() + "'" +
            ", ultimoIngreso='" + getUltimoIngreso() + "'" +
            ", inicioInactivacion='" + getInicioInactivacion() + "'" +
            ", finInactivacion='" + getFinInactivacion() + "'" +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", creadoPor='" + getCreadoPor() + "'" +
            "}";
    }
}
