package co.com.supergiros.rastreogiros.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.com.supergiros.rastreogiros.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PuntoAtencionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PuntoAtencion.class);
        PuntoAtencion puntoAtencion1 = new PuntoAtencion();
        puntoAtencion1.setPuntoAtencionId(1L);
        PuntoAtencion puntoAtencion2 = new PuntoAtencion();
        puntoAtencion2.setPuntoAtencionId(puntoAtencion1.getPuntoAtencionId());
        assertThat(puntoAtencion1).isEqualTo(puntoAtencion2);
        puntoAtencion2.setPuntoAtencionId(2L);
        assertThat(puntoAtencion1).isNotEqualTo(puntoAtencion2);
        puntoAtencion1.setPuntoAtencionId(null);
        assertThat(puntoAtencion1).isNotEqualTo(puntoAtencion2);
    }
}
