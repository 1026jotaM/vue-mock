<template>
  <div>
    <button type="button" class="btn btn-primary mt-3 ml-3" data-toggle="modal" data-target="#exampleModal">
      Modal
    </button>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel">Detalle consulta Sherlock</h6>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <consulta-sherlock :mobile="mobile"> </consulta-sherlock>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConsultaSherlock from './components/ConsultaSherlock.vue'

export default {
  name: 'modal-info-telesign',
  components: { ConsultaSherlock },
  data() {
    return {
      mobile: '3007396019'
    }
  }
}
</script>

<style></style>
