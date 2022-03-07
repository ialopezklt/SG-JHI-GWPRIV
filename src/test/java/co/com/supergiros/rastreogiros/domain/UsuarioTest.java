package co.com.supergiros.rastreogiros.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.com.supergiros.rastreogiros.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UsuarioTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Usuario.class);
        Usuario usuario1 = new Usuario();
        usuario1.setUsuarioId(1L);
        Usuario usuario2 = new Usuario();
        usuario2.setUsuarioId(usuario1.getUsuarioId());
        assertThat(usuario1).isEqualTo(usuario2);
        usuario2.setUsuarioId(2L);
        assertThat(usuario1).isNotEqualTo(usuario2);
        usuario1.setUsuarioId(null);
        assertThat(usuario1).isNotEqualTo(usuario2);
    }
}
