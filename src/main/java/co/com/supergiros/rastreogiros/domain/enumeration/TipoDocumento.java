package co.com.supergiros.rastreogiros.domain.enumeration;

/**
 * The TipoDocumento enumeration.
 */
public enum TipoDocumento {
    CedulaCiudadania("CC"),
    CedulaExtranjeria("CE"),
    CedulaExtranjera("CEX"),
    Pasaporte("PA"),
    TarjetaDeIdentididad("TI"),
    Nit("NIT");

    private final String value;

    TipoDocumento(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
