<template>
  <div class="deposit-ad">
    <br>
    <div class="alert alert-info" role="alert" v-show="alert">L'annonce a bien été ajoutée.</div>
    <h2 class="text-center">Nouvelle annonce :</h2>
    <form class="form-horizontal" @submit.stop.prevent>
      <br>

      <div class="form-group">
        <label for="inputBrand" class="col-sm-2 control-label">Marque</label>
        <div class="col-sm-10">
          <input type="text" v-model.trim="newAd.brand" class="form-control" id="inputBrand" autocomplete="off">
        </div>
      </div>

      <div class="form-group">
        <label for="inputModel" class="col-sm-2 control-label">Modèle</label>
        <div class="col-sm-10">
          <input type="text" v-model.trim="newAd.model" class="form-control" id="inputModel" autocomplete="off">
        </div>
      </div>

      <div class="form-group">
        <label for="inputYear" class="col-sm-2 control-label">Année</label>
        <div class="col-sm-10">
          <input type="text" v-model.number.trim="newAd.year" class="form-control" id="inputYear" autocomplete="off">
        </div>
      </div>

      <div class="form-group">
        <label for="text" class="col-sm-2 control-label">Texte de l'annonce</label>
        <div class="col-sm-10">
          <textarea class="form-control" style="resize: vertical" v-model.trim="newAd.text" id="text" rows="8" autocomplete="off"></textarea>
        </div>
      </div>

      <div class="form-group has-feedback">
        <label for="inputPrice" class="col-sm-2 control-label">Prix</label>
        <div class="col-sm-10">
          <input type="text" v-model.number.trim="newAd.price" class="form-control" id="inputPrice"  autocomplete="off">
          <span class="glyphicon glyphicon-euro form-control-feedback" aria-hidden="true"></span>
        </div>
      </div>

      <div class="form-group">
        <label for="inputImg" class="col-sm-2 control-label">Image</label>
        <div class="col-sm-10">
          <input type="text" v-model.trim="newAd.image" class="form-control" id="inputImg" autocomplete="off" placeholder="http://www.example.com">
        </div>
      </div>


      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button class="btn btn-default" :disabled="disabled()" @click.stop.prevent="addAd(newAd), clear()">Ajouter</button>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
import Store from './AdsStore'
import Vuex from 'vuex'

export default {
  store: Store,
  name: 'deposit-ad',
  data () {
    return {
      newAd: {
        text: null,
        year: null,
        brand: null,
        model: null,
        price: null,
        image: null
      },
      alert: false
    }
  },
  methods: {
    ...Vuex.mapActions([
      'addAd'
    ]),
    clear () {
      this.newAd = {
        text: null,
        year: null,
        brand: null,
        model: null,
        price: null,
        image: null
      }
      this.alert = true
      window.top.window.scrollTo(0, 0)
      setTimeout(_ => { this.alert = false }, 3000)
    },
    disabled () {
      if (this.newAd.text === null || this.newAd.text === '') {
        return true
      } else if (this.newAd.year === null || this.newAd.year === '') {
        return true
      } else if (this.newAd.brand === null || this.newAd.brand === '') {
        return true
      } else if (this.newAd.model === null || this.newAd.model === '') {
        return true
      } else if (this.newAd.price === null || this.newAd.price === '') {
        return true
      } else if (this.newAd.image === null || this.newAd.image === '') {
        return true
      }

      return false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>