package co.com.supergiros.rastreogiros.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.com.supergiros.rastreogiros.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RolTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rol.class);
        Rol rol1 = new Rol();
        rol1.setRolId(1L);
        Rol rol2 = new Rol();
        rol2.setRolId(rol1.getRolId());
        assertThat(rol1).isEqualTo(rol2);
        rol2.setRolId(2L);
        assertThat(rol1).isNotEqualTo(rol2);
        rol1.setRolId(null);
        assertThat(rol1).isNotEqualTo(rol2);
    }
}
