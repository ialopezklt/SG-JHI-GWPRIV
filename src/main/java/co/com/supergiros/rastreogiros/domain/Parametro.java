package co.com.supergiros.rastreogiros.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;

/**
 * A Parametro.
 */
public class Parametro implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long parametroId;

    private String valor;

    private String descripcion;

    private Boolean cifrado;

    @JsonIgnoreProperties(value = { "parametros" }, allowSetters = true)
    private GrupoParametro grupoPar;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getParametroId() {
        return this.parametroId;
    }

    public Parametro parametroId(Long parametroId) {
        this.setParametroId(parametroId);
        return this;
    }

    public void setParametroId(Long parametroId) {
        this.parametroId = parametroId;
    }

    public String getValor() {
        return this.valor;
    }

    public Parametro valor(String valor) {
        this.setValor(valor);
        return this;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Parametro descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean getCifrado() {
        return this.cifrado;
    }

    public Parametro cifrado(Boolean cifrado) {
        this.setCifrado(cifrado);
        return this;
    }

    public void setCifrado(Boolean cifrado) {
        this.cifrado = cifrado;
    }

    public GrupoParametro getGrupoPar() {
        return this.grupoPar;
    }

    public void setGrupoPar(GrupoParametro grupoParametro) {
        this.grupoPar = grupoParametro;
    }

    public Parametro grupoPar(GrupoParametro grupoParametro) {
        this.setGrupoPar(grupoParametro);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Parametro)) {
            return false;
        }
        return parametroId != null && parametroId.equals(((Parametro) o).parametroId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Parametro{" +
            "parametroId=" + getParametroId() +
            ", valor='" + getValor() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", cifrado='" + getCifrado() + "'" +
            "}";
    }
}
