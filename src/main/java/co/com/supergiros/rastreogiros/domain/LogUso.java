package co.com.supergiros.rastreogiros.domain;

import co.com.supergiros.rastreogiros.domain.enumeration.TipoDocumento;
import java.io.Serializable;
import java.time.Instant;
import javax.validation.constraints.*;

/**
 * A LogUso.
 */
public class LogUso implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long logUsoId;

    private String usuario;

    @NotNull(message = "must not be null")
    private String opcion;

    private Instant fechaHora;

    private TipoDocumento tipoDocumento;

    private String numeroDocumento;

    private String pin;

    private String clienteSospechoso;

    private String datosAnteriores;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getLogUsoId() {
        return this.logUsoId;
    }

    public LogUso logUsoId(Long logUsoId) {
        this.setLogUsoId(logUsoId);
        return this;
    }

    public void setLogUsoId(Long logUsoId) {
        this.logUsoId = logUsoId;
    }

    public String getUsuario() {
        return this.usuario;
    }

    public LogUso usuario(String usuario) {
        this.setUsuario(usuario);
        return this;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getOpcion() {
        return this.opcion;
    }

    public LogUso opcion(String opcion) {
        this.setOpcion(opcion);
        return this;
    }

    public void setOpcion(String opcion) {
        this.opcion = opcion;
    }

    public Instant getFechaHora() {
        return this.fechaHora;
    }

    public LogUso fechaHora(Instant fechaHora) {
        this.setFechaHora(fechaHora);
        return this;
    }

    public void setFechaHora(Instant fechaHora) {
        this.fechaHora = fechaHora;
    }

    public TipoDocumento getTipoDocumento() {
        return this.tipoDocumento;
    }

    public LogUso tipoDocumento(TipoDocumento tipoDocumento) {
        this.setTipoDocumento(tipoDocumento);
        return this;
    }

    public void setTipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getNumeroDocumento() {
        return this.numeroDocumento;
    }

    public LogUso numeroDocumento(String numeroDocumento) {
        this.setNumeroDocumento(numeroDocumento);
        return this;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public String getPin() {
        return this.pin;
    }

    public LogUso pin(String pin) {
        this.setPin(pin);
        return this;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public String getClienteSospechoso() {
        return this.clienteSospechoso;
    }

    public LogUso clienteSospechoso(String clienteSospechoso) {
        this.setClienteSospechoso(clienteSospechoso);
        return this;
    }

    public void setClienteSospechoso(String clienteSospechoso) {
        this.clienteSospechoso = clienteSospechoso;
    }

    public String getDatosAnteriores() {
        return this.datosAnteriores;
    }

    public LogUso datosAnteriores(String datosAnteriores) {
        this.setDatosAnteriores(datosAnteriores);
        return this;
    }

    public void setDatosAnteriores(String datosAnteriores) {
        this.datosAnteriores = datosAnteriores;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LogUso)) {
            return false;
        }
        return logUsoId != null && logUsoId.equals(((LogUso) o).logUsoId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LogUso{" +
            "logUsoId=" + getLogUsoId() +
            ", usuario='" + getUsuario() + "'" +
            ", opcion='" + getOpcion() + "'" +
            ", fechaHora='" + getFechaHora() + "'" +
            ", tipoDocumento='" + getTipoDocumento() + "'" +
            ", numeroDocumento='" + getNumeroDocumento() + "'" +
            ", pin='" + getPin() + "'" +
            ", clienteSospechoso='" + getClienteSospechoso() + "'" +
            ", datosAnteriores='" + getDatosAnteriores() + "'" +
            "}";
    }
}
