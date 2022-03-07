package co.com.supergiros.rastreogiros.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.com.supergiros.rastreogiros.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LogUsoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LogUso.class);
        LogUso logUso1 = new LogUso();
        logUso1.setLogUsoId(1L);
        LogUso logUso2 = new LogUso();
        logUso2.setLogUsoId(logUso1.getLogUsoId());
        assertThat(logUso1).isEqualTo(logUso2);
        logUso2.setLogUsoId(2L);
        assertThat(logUso1).isNotEqualTo(logUso2);
        logUso1.setLogUsoId(null);
        assertThat(logUso1).isNotEqualTo(logUso2);
    }
}
