package co.com.supergiros.rastreogiros.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.com.supergiros.rastreogiros.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ParametroTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Parametro.class);
        Parametro parametro1 = new Parametro();
        parametro1.setParametroId(1L);
        Parametro parametro2 = new Parametro();
        parametro2.setParametroId(parametro1.getParametroId());
        assertThat(parametro1).isEqualTo(parametro2);
        parametro2.setParametroId(2L);
        assertThat(parametro1).isNotEqualTo(parametro2);
        parametro1.setParametroId(null);
        assertThat(parametro1).isNotEqualTo(parametro2);
    }
}
