package co.com.supergiros.rastreogiros.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.com.supergiros.rastreogiros.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class GrupoParametroTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GrupoParametro.class);
        GrupoParametro grupoParametro1 = new GrupoParametro();
        grupoParametro1.setGrupoParametroId(1L);
        GrupoParametro grupoParametro2 = new GrupoParametro();
        grupoParametro2.setGrupoParametroId(grupoParametro1.getGrupoParametroId());
        assertThat(grupoParametro1).isEqualTo(grupoParametro2);
        grupoParametro2.setGrupoParametroId(2L);
        assertThat(grupoParametro1).isNotEqualTo(grupoParametro2);
        grupoParametro1.setGrupoParametroId(null);
        assertThat(grupoParametro1).isNotEqualTo(grupoParametro2);
    }
}
