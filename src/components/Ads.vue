<template>
  <div class="ads">

    <br>

    <input type="text" class="form-control" v-model="search" placeholder="Rechercher">
    
    <br>

    <form class="form-inline">
      <select class="form-control" v-model="selectedL" @change="updateSelected(selectedL)">
        <option>Trier par : Date</option>
        <option>Trier par : Prix</option>
        <option>Trier par : Année</option>
      </select>
      <div class="checkbox checkbox-ad">
        <label>
          <input type="checkbox" v-model="favoritesL" @change="updateFavorites(favoritesL)"> Favoris
        </label>
      </div>
    </form>

    <br>
    <br>

    <h4 v-if="ads.length === 0">Il n’y a pas d’annonce actuellement.</h4>

    <ul class="list-group">
      <router-link :to="{name: 'ad'}" @click.prevent.native="idAd(ad.date)" class="list-group-item" v-for="ad in filterBy">
        <h4 class="glyphicon-ad" v-if="ad.favorite"><span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span></h4>
        <span class="badge badge-ad">{{ ad.date | date('%d %b, %H:%M') }}</span>
        <div class="row">
          <div class="col-xs-4 col-sm-3">
            <img :src="ad.image" alt="" class="img-responsive center-block img-rounded img-ad">
          </div>
          <div class="col-xs-8 col-sm-9">
            <h4 class="list-group-item-heading title-ad hidden-xs">{{ ad.brand }} - {{ ad.model }}</h4>
            <h6 class="list-group-item-heading title-ad visible-xs-block">{{ ad.brand }} - {{ ad.model }}</h6>
            <p class="list-group-item-text year-ad">{{ ad.year }}</p>
            <h3 class="price-ad price-ads hidden-xs">{{ ad.price.toLocaleString() | append(' €') }}</h3>
            <h5 class="price-ad price-ads visible-xs-block">{{ ad.price.toLocaleString() | append(' €') }}</h5>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import Store from './AdsStore'
import Vuex from 'vuex'

export default {
  store: Store,
  name: 'ads',
  data () {
    return {
      search: '',
      favoritesL: false,
      selectedL: 'Trier par : Date'
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'ads',
      'adsFiteredByFavorites',
      'favorites',
      'selected',
      'adsOderByPrice',
      'adsOderByDate',
      'adsOderByYear',
      'adsFiteredByFavoritesOderByPrice',
      'adsFiteredByFavoritesOderByDate',
      'adsFiteredByFavoritesOderByYear'
    ]),
    filterFavoriteAd () {
      if (this.favoritesL) {
        if (this.selectedL === 'Trier par : Date') {
          return this.adsFiteredByFavoritesOderByDate
        } else if (this.selectedL === 'Trier par : Prix') {
          return this.adsFiteredByFavoritesOderByPrice
        } else {
          return this.adsFiteredByFavoritesOderByYear
        }
      } else {
        if (this.selectedL === 'Trier par : Date') {
          return this.adsOderByDate
        } else if (this.selectedL === 'Trier par : Prix') {
          return this.adsOderByPrice
        } else {
          return this.adsOderByYear
        }
      }
    },
    filterBy () {
      return this.filterFavoriteAd.filter(item => {
        const text = item.brand + item.model + item.text
        return text.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
    }
  },
  mounted () {
    this.favoritesL = this.favorites
    this.selectedL = this.selected
  },
  methods: {
    ...Vuex.mapActions([
      'idAd',
      'updateFavorites',
      'updateSelected'
    ])
  }
}
</script>

<style>
  @media (min-width: 768px) {
    .checkbox-ad {
      margin-left: 30px;
    }
  }

  @media (max-width: 767px) {
    .badge-ad {
      position: absolute;
      top: 35px;
      right: 15px;
      font-size: 9px;
    }

    p.year-ad {
      font-size: 10px;
    }
  }

  .glyphicon-ad {
    position: absolute;
    top: 58%;
    right: 20px;
  }

  .badge-ad {
    font-weight: 300;
  }

  .img-ad {
    max-width: 100%;
    max-height: auto;
  }

  .title-ad {
    margin-bottom: 10px;
  }

  .price-ad {
    color: #337ab7;
  }

  .price-ads {
    margin-top: 15px;
  }
</style>