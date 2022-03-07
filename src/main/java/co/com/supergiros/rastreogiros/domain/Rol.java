package co.com.supergiros.rastreogiros.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.*;

/**
 * A Rol.
 */
public class Rol implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long rolId;

    @NotNull(message = "must not be null")
    private String nombre;

    private String activo;

    @JsonIgnoreProperties(value = { "rols" }, allowSetters = true)
    private Set<Usuario> usuarios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getRolId() {
        return this.rolId;
    }

    public Rol rolId(Long rolId) {
        this.setRolId(rolId);
        return this;
    }

    public void setRolId(Long rolId) {
        this.rolId = rolId;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Rol nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getActivo() {
        return this.activo;
    }

    public Rol activo(String activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(String activo) {
        this.activo = activo;
    }

    public Set<Usuario> getUsuarios() {
        return this.usuarios;
    }

    public void setUsuarios(Set<Usuario> usuarios) {
        this.usuarios = usuarios;
    }

    public Rol usuarios(Set<Usuario> usuarios) {
        this.setUsuarios(usuarios);
        return this;
    }

    public Rol addUsuario(Usuario usuario) {
        this.usuarios.add(usuario);
        usuario.getRols().add(this);
        return this;
    }

    public Rol removeUsuario(Usuario usuario) {
        this.usuarios.remove(usuario);
        usuario.getRols().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Rol)) {
            return false;
        }
        return rolId != null && rolId.equals(((Rol) o).rolId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Rol{" +
            "rolId=" + getRolId() +
            ", nombre='" + getNombre() + "'" +
            ", activo='" + getActivo() + "'" +
            "}";
    }
}
