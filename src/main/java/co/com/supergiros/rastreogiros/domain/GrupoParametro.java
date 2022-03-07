package co.com.supergiros.rastreogiros.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.*;

/**
 * A GrupoParametro.
 */
public class GrupoParametro implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long grupoParametroId;

    @NotNull(message = "must not be null")
    private String nombre;

    @NotNull(message = "must not be null")
    private String activo;

    @JsonIgnoreProperties(value = { "grupoPar" }, allowSetters = true)
    private Set<Parametro> parametros = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getGrupoParametroId() {
        return this.grupoParametroId;
    }

    public GrupoParametro grupoParametroId(Long grupoParametroId) {
        this.setGrupoParametroId(grupoParametroId);
        return this;
    }

    public void setGrupoParametroId(Long grupoParametroId) {
        this.grupoParametroId = grupoParametroId;
    }

    public String getNombre() {
        return this.nombre;
    }

    public GrupoParametro nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getActivo() {
        return this.activo;
    }

    public GrupoParametro activo(String activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(String activo) {
        this.activo = activo;
    }

    public Set<Parametro> getParametros() {
        return this.parametros;
    }

    public void setParametros(Set<Parametro> parametros) {
        if (this.parametros != null) {
            this.parametros.forEach(i -> i.setGrupoPar(null));
        }
        if (parametros != null) {
            parametros.forEach(i -> i.setGrupoPar(this));
        }
        this.parametros = parametros;
    }

    public GrupoParametro parametros(Set<Parametro> parametros) {
        this.setParametros(parametros);
        return this;
    }

    public GrupoParametro addParametro(Parametro parametro) {
        this.parametros.add(parametro);
        parametro.setGrupoPar(this);
        return this;
    }

    public GrupoParametro removeParametro(Parametro parametro) {
        this.parametros.remove(parametro);
        parametro.setGrupoPar(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GrupoParametro)) {
            return false;
        }
        return grupoParametroId != null && grupoParametroId.equals(((GrupoParametro) o).grupoParametroId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GrupoParametro{" +
            "grupoParametroId=" + getGrupoParametroId() +
            ", nombre='" + getNombre() + "'" +
            ", activo='" + getActivo() + "'" +
            "}";
    }
}
