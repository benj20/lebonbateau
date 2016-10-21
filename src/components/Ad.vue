<template>
  <div class="ad">
    <br>
    <div class="well">

      <div class="row" v-if="ad">
        <div class="col-xs-12">
          <img :src="ad.image" alt="" class="img-responsive center-block img-rounded" style="max-width: 800px">
          <input type="text" class="form-control" v-if="editPageAd" v-model.trim="newAd.image" autocomplete="off">
        </div>
      </div>

      <div class="row" v-if="ad">
        <div class="col-xs-12">
          <br>
          <p class="padding-p">Mise en ligne le {{ ad.date | date('%d %B à %H:%M') }}</p>
          <ul class="list-group">
            <li class="list-group-item list-group-item-list">
              <div class="row">
                <div class="col-xs-4 bg-grey">
                  <h5>Prix</h5>
                </div>
                <div class="col-xs-8">
                  <h5 class="price-ad" v-if="!editPageAd">{{ priceSpace | append(' €') }}</h5>
                  <input type="text" class="form-control" v-if="editPageAd" v-model.number.trim="newAd.price" autocomplete="off">
                </div>
              </div>
            </li>
            <li class="list-group-item list-group-item-list">
              <div class="row">
                <div class="col-xs-4 bg-grey">
                  <h5>Marque</h5>
                </div>
                <div class="col-xs-8">
                  <h5 v-if="!editPageAd">{{ ad.brand }}</h5>
                  <input type="text" class="form-control" v-if="editPageAd" v-model.trim="newAd.brand" autocomplete="off">
                </div>
              </div>
            </li>
            <li class="list-group-item list-group-item-list">
              <div class="row">
                <div class="col-xs-4 bg-grey">
                  <h5>Modèle</h5>
                </div>
                <div class="col-xs-8">
                  <h5 v-if="!editPageAd">{{ ad.model }}</h5>
                  <input type="text" class="form-control" v-if="editPageAd" v-model.trim="newAd.model" autocomplete="off">
                </div>
              </div>
            </li>
            <li class="list-group-item list-group-item-list">
              <div class="row">
                <div class="col-xs-4 bg-grey">
                  <h5>Année</h5>
                </div>
                <div class="col-xs-8">
                  <h5 v-if="!editPageAd">{{ ad.year }}</h5>
                  <input type="text" class="form-control" v-if="editPageAd" v-model.number.trim="newAd.year" autocomplete="off">
                </div>
              </div>
            </li>
          </ul>
          <h4 class="padding-p">Description :</h4>
          <p class="padding-p" v-if="!editPageAd" v-html="ad.text"></p>
          <textarea class="form-control" v-if="editPageAd" v-model.trim="newAd.text" style="resize: vertical" rows="8" autocomplete="off"></textarea>
        </div>
      </div>

      <br>
      <div class="row" v-if="ad">
        <div class="col-xs-12">
          <div class="btn-group btn-group-justified" role="group" aria-label="..." v-show="!editPageAd">
            <div v-show="!favorite" class="btn-group" role="group">
              <button type="button" class="btn btn-default" @click="addFavorite(), favorite = true">
                Ajouter <span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>
              </button>
            </div>
            <div v-show="favorite" class="btn-group" role="group">
              <button type="button" class="btn btn-default" @click="deleteFavorite(), favorite = false">
                Retirer <span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>
              </button>
            </div>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-default" @click="editNewAd">Modifier</button>
            </div>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#ModalDelete">Supprimer</button>
            </div>
          </div>
          <div class="btn-group btn-group-justified" role="group" aria-label="..." v-show="editPageAd">
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-default" @click="editNewAdValidate()">Valider</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal-delete></modal-delete>

  </div>
</template>

<script>
import Store from './AdsStore'
import Vuex from 'vuex'
import ModalDelete from './ModalDelete'

export default {
  store: Store,
  name: 'ad',
  components: {
    ModalDelete
  },
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
      editPageAd: false,
      favorite: false
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'ad'
    ]),
    priceSpace () {
      if (this.ad.price) {
        return this.ad.price.toLocaleString()
      } else {
        return this.ad.price
      }
    }
  },
  updated () {
    this.favorite = this.ad.favorite
  },
  mounted () {
    if (this.ad) {
      this.favorite = this.ad.favorite
    }
  },
  methods: {
    ...Vuex.mapActions([
      'updateAd',
      'addFavorite',
      'deleteFavorite'
    ]),
    editNewAd () {
      this.editPageAd = true
      this.newAd.text = this.ad.text.replace(/<br\\?>/g, '\n')
      this.newAd.year = this.ad.year
      this.newAd.brand = this.ad.brand
      this.newAd.model = this.ad.model
      this.newAd.price = this.ad.price
      this.newAd.date = this.ad.date
      this.newAd.image = this.ad.image
      this.newAd.favorite = this.ad.favorite
    },
    editNewAdValidate () {
      this.updateAd(this.newAd)
      this.editPageAd = false
      this.newAd = {
        text: null,
        year: null,
        brand: null,
        model: null,
        price: null,
        image: null
      }
    }
  }
}
</script>

<style>
  .badge {
    font-weight: 300;
  }

  .padding-p {
    padding-left: 10px;
  }

  .list-group-item-list {
    padding-top: 0;
    padding-bottom: 0;
  }

  .bg-grey {
    height: 100%;
    background-color: #eee;
  }
</style>