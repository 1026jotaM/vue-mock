<template>
  <div class="sherlock-info-modal">
    <div class="column-date">{{ data.fecha_validacion }}</div>

    <div>
      <span class="column-description_ml-2">Operador actual:</span>
      <span class="column-value">{{ data.operador }}</span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-html="true"
          title="Consejo de seguridad que sugiere la probabilidad de que un número sea potencialmente fraudulento:&#10;
          Segura: La línea celular es fiable.
          Desconocido: Resultado no concluyente.
          Sospechoso: La línea celular es potencialmente fraudulenta."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">Consejo:</span>
      <span :class="['column-value', getConsejoColor(data.consejo)]">{{ data.consejo }}</span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Validación del comportamiento de la línea a lo largo del tiempo."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description_ml-1">Tráfico de la linea</span>
      <span class="column-value_ml">{{ data.comportamiento }}</span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Indica si se ha producido un cambio de tarjeta SIM."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description_ml-1">Cambio de SIM</span>
      <span class="column-value_ml">{{ data.sim_cambiada }}</span>
    </div>

    <div class="mt-3">
      <span class="column-description_ml-2">Reportado como fraude:</span>
      <span :class="[column - value, getFraudeColor(data.fraude_reporte)]">
        {{ data.fraude_reporte }}
      </span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Categoría de la entidad o sector que informa del fraude."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description txt-grey">- Cat. Que repor. Fraude:</span>
      <span :class="[column - value, getFraudeColor(data.fraude_reporte)]">{{
        data.categoria_reporte
      }}</span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Fecha de creación del informe de fraude."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description txt-grey">- Fecha Rep. Del fraude:</span>
      <span :class="[column - value, getFraudeColor(data.fraude_reporte)]">
        {{ data.fecha_reporte }}
      </span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Fecha de caducidad del informe de fraude."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description txt-grey">- F. venciento del reporte:</span>
      <span :class="[column - value, getFraudeColor(data.fraude_reporte)]">{{
        data.vencimiento_reporte
      }}</span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Descripción del motivo o razón del fraude."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description txt-grey">- Descripción de fraude</span>
      <span :class="[column - value, getFraudeColor(data.fraude_reporte)]">{{
        data.fraude_descripcion
      }}</span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Determina si la línea coincide con la cuenta bancaria según históricos transaccionales previos."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description txt-red">- Cel y cuenta bancaria coinciden</span>
      <span :class="['column-value', getCuentaColor(data.cel_cuenta_bancaria_check)]">
        {{ data.cel_cuenta_bancaria_check }}
      </span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Última vez que esa cuenta bancaria o TC fue vista en los registros."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description txt-grey">- CTA. vista por última vez.</span>
      <span :class="['column-value', getCuentaColor(data.cel_cuenta_bancaria_check)]">
        {{ data.ultima_vista_cuenta }}
      </span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Número de cuentas encontradas."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description txt-grey">- # Cuentas encontradas</span>
      <span :class="['column-value', getCuentaColor(data.cel_cuenta_bancaria_check)]">
        {{ data.total_cuentas }}
      </span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Evaluación de las transacciones y demás operaciones asociadas al número telefónico con respecto al comportamiento habitual de la misma línea"
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">% Anomalias</span>
      <span :class="['column-value', getAnomaliaColor(data.porcentaje_anomalia)]">
        {{ data.porcentaje_anomalia }}% {{ data.lectura_anomalia }}
      </span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Desconfianza asociada a las transacciones y demás operaciones, en comparación a un promedio de usuarios, en un histórico de varios meses"
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">% Desconfianza</span>
      <span :class="['column-value', getDesconfiazaColor(data.porcentaje_confianza)]">
        {{ data.porcentaje_confianza }}% {{ data.lectura_confianza }}</span
      >
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Es la sumatoria de todos los porcentajes de SMS de cobranza que ha recibido la línea en los últimos 3 meses."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">% SMS de cobranza</span>
      <span :class="['column-value', getSmsCobranzaColor(data.sms_cobranza_porcentaje)]">
        {{ data.sms_cobranza_porcentaje }}%</span
      >
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Indica si la línea ha recibido SMS de cobranza en los últimos 3 meses."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">Cobranza en ult. 3 meses:</span>
      <span :class="['column-value', getCobranza3MesesColor(data.cobranza_ultimos_3_meses)]">{{
        data.cobranza_ultimos_3_meses
      }}</span>
    </div>

    <div class="mt-3">
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Indica si ha a cambiado de operador en los últimos siete días."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">Cambios últimos 7 días:</span>
      <span class="column-value">
        {{ data.cambiado_ultima_semana }}
        {{ data.dias ? '(último cambio: ' + data.dias + ' días ' + data.horas + ' horas)' : '' }}
      </span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Días transcurridos, desde la primera vez que se enviaron SMS el número de teléfono y el momento de la consulta."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">Edad de línea:</span>
      <span :class="['column-value', getEdadColor(data.dias_activo)]"
        >{{ data.dias_activo }} días (Activa desde: {{ data.fecha_activo }})</span
      >
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Estado actual del número de teléfono.
          ACTIVO: Hay información reciente asociada al número de teléfono
          INACTIVO: No hay información reciente asociada al número de teléfono
          NO_DATA: No hay información asociada con el número de teléfono.
          "
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">Estado</span>
      <span :class="['column-value', getEstadoColor(data.estado)]">
        {{data.estado}}
      </span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Estado actual de activación o reactivación de un número de teléfono. 
        Se considera que una línea no está activa si no ha tenido ningún movimiento en los últimos 3 meses:
        Verdadero (True): Número de teléfono reactivado
        Falso (False): Número de teléfono no reactivado
        Sin información (null): No se ha encontrado información sobre el número de teléfono"
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">¿Actividad en últ. 3 meses?:</span>
      <span class="column-value">{{ data.activada_ultimos_3_meses }}</span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Indica si la línea está asociada a una o más entidades financiera"
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">¿Bancarizada?</span>
      <span class="column-value">{{ data.esta_bancarizado }}</span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Número aproximado de entidades financieras que tienen relación con la línea"
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">Entidades financieras:</span>
      <span :class="['column-value', getEntidadFinancieraColor(data.entidades_bancarizado)]">
        {{ data.entidades_bancarizado}}
      </span>
    </div>

    <div class="mt-3">
      <span
        class="column-info"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Distribución de los SMS que le han llegado a la persona en los últimos 3 meses"
      >
        <i class="fa fa-info-circle"></i>
      </span>
      <span><b>Ranking de SMS que ha recibido en los últimos 3 meses:</b></span>
    </div>

    <div>
      <table class="table">
        <th>%</th>
        <th>Segmento</th>
        <th>Categoria</th>
        <tr v-for="rank in data.ranking_sms" :key="rank">
          <td :class="getClass(rank.segmento, rank.categoria)">{{ rank.porcentaje }}%</td>
          <td :class="getClass(rank.segmento, rank.categoria)">{{ rank.segmento }}</td>
          <td :class="getClass(rank.segmento, rank.categoria)">{{ rank.categoria }}</td>
        </tr>
      </table>
    </div>

    <div>
      <span class="column-description_ml-2">Acciones</span>
      <span class="column-value">1</span>
    </div>

    <div>
      <span class="column-description_ml-2">Simcard</span>
       <span class="column-value">{{ data.simcard }}</span>
    </div>

    <div>
      <span class="column-description_ml-2">Sim Enriquecido:</span>
      <span class="column-value">{{ data.sim_enriquecida }}</span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Indica si la Sim Card fue cambiada dentro del rango de tiempo establecido."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">Cambio de rango:</span>
      <span>{{ data.cambio_rango }} </span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Número de horas dentro del cual un cambio de tarjeta sim puede considerarse sospechoso según el cliente."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">Rango para evaluar</span>
      <span class="column-value">{{ data.rango_para_evaluar }}</span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Indica el resultado de la petición al origen de datos que se consultó para la validación de la línea..”"
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">Fuente de datos:</span>
      <span class="column-value">{{ data.fuente_datos }}</span>
    </div>

    <div>
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operador móvil al que pertenecía originalmente el número de teléfono."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description">Operador original:</span>
      <span class="column-value">{{ data.operador_original }}</span>
    </div>

    <div class="mt-3">
      <span class="column-info">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Muestra el historial de portabilidades que ha realizado el usuario."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </span>
      <span class="column-description"><b>Historial de portabilidad:</b></span>
    </div>

    <div>
      <table class="table">
        <th>Fecha de cambio</th>
        <th>Operador</th>
        <tr v-for="register in data.historial_portabilidad" :key="register">
          <td>{{ register.fecha }}</td>
          <td>{{ register.operador }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    mobile: String
  },
  mounted() {
    this.getMobileResult()
  },
  data() {
    return {
      data: []
    }
  },
  methods: {
    getClass(segmento, categoria) {
      let color_class = ''
      if (segmento == 'Financiero') {
        if (categoria == 'Cobranza') {
          color_class = 'txt-red'
        } else {
          color_class = 'txt-green'
        }
      }
      return color_class
    },

    getConsejoColor(consejo) {
      if (consejo == 'Sospechoso') {
        return 'txt-red'
      }
    },

    getFraudeColor(fraude) {
      if (fraude == 'Si') {
        return 'txt-red'
      }
    },

    getCuentaColor(cuenta) {
      if (cuenta == 'No') {
        return 'txt-red'
      }
    },

    getAnomaliaColor(anomalia) {
      if (anomalia > 25) {
        return 'txt-red'
      }
    },

    getDesconfiazaColor(desconfiaza) {
      if (desconfiaza > 25) {
        return 'txt-red'
      }
    },

    getSmsCobranzaColor(sms_cobranza) {
      if (sms_cobranza > 25) {
        return 'txt-red'
      }
    },

    getCobranza3MesesColor(sms_cobranza) {
      if (sms_cobranza == 'Si') {
        return 'txt-red'
      }
    },

    getEdadColor(edad) {
      if (edad < 180) {
        return 'txt-red'
      }
    },

    getEstadoColor(estado) {
      if (estado !== 'Activa') {
        return 'txt-red'
      }
    },

    getActividad3MesesColor(actividad) {
      if (actividad == 'No') {
        return 'txt-red'
      }
    },

    getEntidadFinancieraColor(entidad) {
      if (entidad == '3 or more') {
        return 'txt-green'
      }
    },

    /**
     * @auspanor Alexander Montaño
     * @description Realiza la peticion de los datos sherlock de un numero
     * de celular
     */
    async getMobileResult() {
      let url = '/api/prevencion-fraude-celular/sherlock'

      let data = {
        mobile: this.mobile
      }

      try {
        let response = await axios.post(url, data)
        this.data = response.data.response
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sherlock-info-modal {
  display: flex;
  flex-direction: column;

  .column-info {
    padding: 0 1rem;
    text-align: center;
    color: #81c6ff;
    width: 10%;
  }

  .column-date {
    width: auto;
    background: #e1efd8;
    margin: 2vh 0 2vh 1rem;
    padding-left: 1rem;
  }

  .column-description {
    &_ml-2 {
      margin-left: 10%;
      width: 55%;
    }
    &_ml-1 {
      margin-left: 5%;
      width: 50%;
    }
    & {
      width: 55%;
    }
  }
  .column-value {
    &_ml {
      width: 27%;
    }
    & {
      width: 30%;
    }
  }

  .txt-grey {
    color: #a5a5a5;
  }
  .txt-red {
    color: red;
  }
  .txt-green {
    color: green;
  }

  div {
    width: 100%;
    display: flex;
  }

  table {
    margin-left: 3rem;
    & th,
    td {
      padding: 0;
      border-top: 0;
    }
  }
}
</style>
