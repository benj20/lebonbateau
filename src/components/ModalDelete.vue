<template>
  <div>
    <div class="modal fade" tabindex="-1" role="dialog" id="ModalDelete">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Confirmer la suppression</h4>
          </div>
          <div class="modal-body">
            <p>Voulez-vous vraiment supprimer l'annonce ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
            <router-link :to="{name: 'root'}" tag="button" type="button" class="btn btn-danger" data-dismiss="modal" @click.prevent.native="deleteAd()">Supprimer</router-link>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
</template>

<script>
import Store from './AdsStore'
import Vuex from 'vuex'

export default {
  store: Store,
  name: 'modal-delete',
  methods: {
    ...Vuex.mapActions([
      'deleteAd'
    ])
  }
}
</script>