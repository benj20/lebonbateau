import Vuex from 'vuex'

const state = {
  ads: [{
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, aspernatur mollitia aliquam dignissimos omnis repudiandae rem reprehenderit molestiae hic vel totam, praesentium numquam nesciunt quae, est nobis adipisci sit ipsam.',
    year: 2002,
    price: 14000,
    brand: 'Jeanneau',
    model: 'Cap camarat 625',
    date: '2016-10-16T18:46:20.582Z',
    favorite: false,
    image: 'https://cdn1.theglobesailor.com/doc/boat/model/678/photo/cap-camarat-625-open-889_max.jpg'
  }, {
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi quam est, voluptate soluta, harum aliquam ut vero minus illo a iste sunt provident expedita atque architecto labore id ab. Quidem.',
    year: 2009,
    price: 19000,
    brand: 'Jeanneau',
    model: 'Cap camarat 635',
    date: '2016-10-16T18:47:20.583Z',
    favorite: false,
    image: 'http://www.dominiqueplaisance.fr/bateaux/capcamarat635-150cv.jpg'
  }, {
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus tempore minus excepturi, incidunt commodi dicta illum placeat. Cupiditate praesentium explicabo id eligendi incidunt, nam animi libero, totam rem magnam voluptates.',
    year: 2007,
    price: 13000,
    brand: 'Quicksilver',
    model: '600 Commander',
    date: '2016-10-18T15:10:20.583Z',
    favorite: true,
    image: 'http://www.charletnautic.com/public_html/photos/600C23148CHA/l_out03.jpg'
  }],
  id_ad: {},
  favorites: false,
  selected: 'Trier par : Date'
}

const getters = {
  ads: state => state.ads,
  ad: state => state.ads.filter(ad => ad.date === state.id_ad)[0],
  adsFiteredByFavorites: state => state.ads.filter(ad => ad.favorite),
  favorites: state => state.favorites,
  selected: state => state.selected,
  adsOderByPrice: state => {
    return state.ads.slice().sort((a, b) => {
      if (a.price > b.price) {
        return 1
      }
      if (a.price < b.price) {
        return -1
      }
      return 0
    })
  },
  adsOderByDate: state => {
    return state.ads.slice().sort((a, b) => {
      if (a.date > b.date) {
        return 1
      }
      if (a.date < b.date) {
        return -1
      }
      return 0
    })
  },
  adsOderByYear: state => {
    return state.ads.slice().sort((a, b) => {
      if (a.year > b.year) {
        return 1
      }
      if (a.year < b.year) {
        return -1
      }
      return 0
    })
  },
  adsFiteredByFavoritesOderByPrice: state => {
    return getters.adsFiteredByFavorites(state).slice().sort((a, b) => {
      if (a.price > b.price) {
        return 1
      }
      if (a.price < b.price) {
        return -1
      }
      return 0
    })
  },
  adsFiteredByFavoritesOderByDate: state => {
    return getters.adsFiteredByFavorites(state).slice().sort((a, b) => {
      if (a.date > b.date) {
        return 1
      }
      if (a.date < b.date) {
        return -1
      }
      return 0
    })
  },
  adsFiteredByFavoritesOderByYear: state => {
    return getters.adsFiteredByFavorites(state).slice().sort((a, b) => {
      if (a.year > b.year) {
        return 1
      }
      if (a.year < b.year) {
        return -1
      }
      return 0
    })
  }
}

const mutations = {
  ADD_AD: (state, ad) => {
    state.ads.push({
      text: ad.text,
      year: ad.year,
      price: ad.price,
      brand: ad.brand,
      model: ad.model,
      image: ad.image,
      favorite: false,
      date: new Date()
    })
  },
  ID_AD: (state, id) => {
    state.id_ad = id
  },
  DELETE_AD: (state) => {
    const i = state.ads.indexOf(state.ads.filter(ad => ad.date === state.id_ad)[0])
    if (i !== -1) {
      state.ads.splice(i, 1)
    }
    state.id_ad = {}
  },
  UPDATE_AD: (state, ad) => {
    const i = state.ads.indexOf(state.ads.filter(ad => ad.date === state.id_ad)[0])
    if (i !== -1) {
      state.ads.splice(i, 1, ad)
    }
  },
  ADD_FAVORITE: (state) => {
    state.ads.filter(ad => ad.date === state.id_ad)[0].favorite = true
  },
  DELETE_FAVORITE: (state) => {
    state.ads.filter(ad => ad.date === state.id_ad)[0].favorite = false
  },
  UPDATE_FAVORITES: (state, value) => {
    state.favorites = value
  },
  UPDATE_SELECTED: (state, value) => {
    state.selected = value
  }
}

const actions = {
  addAd: (store, ad) => {
    ad.text = ad.text.replace(/\n/g, '<' + 'br>')
    store.commit('ADD_AD', ad)
  },
  idAd: (store, id) => {
    store.commit('ID_AD', id)
  },
  deleteAd: (store) => {
    store.commit('DELETE_AD')
  },
  updateAd: (store, ad) => {
    ad.text = ad.text.replace(/\n/g, '<' + 'br>')
    store.commit('UPDATE_AD', ad)
  },
  addFavorite: (store) => {
    store.commit('ADD_FAVORITE')
  },
  deleteFavorite: (store) => {
    store.commit('DELETE_FAVORITE')
  },
  updateFavorites: (store, value) => {
    store.commit('UPDATE_FAVORITES', value)
  },
  updateSelected: (store, value) => {
    store.commit('UPDATE_SELECTED', value)
  }
}

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  strict: true
})
