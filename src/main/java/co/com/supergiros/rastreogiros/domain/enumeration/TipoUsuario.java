package co.com.supergiros.rastreogiros.domain.enumeration;

/**
 * The TipoUsuario enumeration.
 */
public enum TipoUsuario {
    Interno("I"),
    Externo("E");

    private final String value;

    TipoUsuario(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
