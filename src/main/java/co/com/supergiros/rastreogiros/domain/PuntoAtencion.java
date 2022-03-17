package co.com.supergiros.rastreogiros.domain;

import java.io.Serializable;

/**
 * A PuntoAtencion.
 */
public class PuntoAtencion implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long puntoAtencionId;

    private String departamento;

    private String ciudad;

    private String direccion;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getPuntoAtencionId() {
        return this.puntoAtencionId;
    }

    public PuntoAtencion puntoAtencionId(Long puntoAtencionId) {
        this.setPuntoAtencionId(puntoAtencionId);
        return this;
    }

    public void setPuntoAtencionId(Long puntoAtencionId) {
        this.puntoAtencionId = puntoAtencionId;
    }

    public String getDepartamento() {
        return this.departamento;
    }

    public PuntoAtencion departamento(String departamento) {
        this.setDepartamento(departamento);
        return this;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getCiudad() {
        return this.ciudad;
    }

    public PuntoAtencion ciudad(String ciudad) {
        this.setCiudad(ciudad);
        return this;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getDireccion() {
        return this.direccion;
    }

    public PuntoAtencion direccion(String direccion) {
        this.setDireccion(direccion);
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PuntoAtencion)) {
            return false;
        }
        return puntoAtencionId != null && puntoAtencionId.equals(((PuntoAtencion) o).puntoAtencionId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PuntoAtencion{" +
            "puntoAtencionId=" + getPuntoAtencionId() +
            ", departamento='" + getDepartamento() + "'" +
            ", ciudad='" + getCiudad() + "'" +
            ", direccion='" + getDireccion() + "'" +
            "}";
    }
}
