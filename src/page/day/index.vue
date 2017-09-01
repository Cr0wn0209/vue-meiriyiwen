<template lang="html">
  <div>
    <transition name="fade">
      <articlecontainer v-if="!reloading" v-on:isloading="handleloadingflag" v-on:loaded="handleloaded" v-on:getDate="handleDate" v-bind:datafrom="date"></articlecontainer>
    </transition>
    <div class="sidemenuSwitch" v-on:touchstart="sidemenuSwitch(1)">
      <span class="sidemenuSwitch_top"></span>
      <span class="sidemenuSwitch_mid"></span>
      <span class="sidemenuSwitch_bottom"></span>
    </div>
    <transition name="fade">
      <div class="loadingFlag" v-if="loadingFlag">
        Loading...
      </div>
    </transition>
    <sidemenu v-if="sidemenuOpen_display" v-bind:sidemenuState="sidemenuOpen" v-on:sidemenuClose="sidemenuSwitch(0)" v-on:reloading="reload()" father="day" v-bind:articleDate="articleDate"></sidemenu>
  </div>
</template>

<script>
import articlecontainer from '../../components/articlecontainer.vue'
import sidemenu from '../../components/sidemenu.vue'

export default {
  name: 'day',
  components: {
    articlecontainer,
    sidemenu
  },
  data() {
    return {
      loaded: false,
      loadingFlag: false,
      sidemenuOpen: false,
      sidemenuOpen_display: false,
      date: this.$route.params.date,
      articleDate: {},
      reloading: false,
    }
  },
  created() {
    this.loadingFlag = true;
  },
  mounted() {
  },
  methods: {
    handleloadingflag() {
      this.loadingFlag = false;
    },
    handleloaded() {
      this.loaded = true;
    },
    handleDate(date) {
      Object.assign(this.articleDate,date);
    },
    sidemenuSwitch(state) {
      if (state === 1) {
        this.sidemenuOpen_display = true;
        setTimeout(() => {
          this.sidemenuOpen = true;
        },50);
      }
      else if (state === 0) {
        this.sidemenuOpen = false;
        setTimeout(() => {
          this.sidemenuOpen_display = false;
        },500);
      }
    },
    reload() {
      document.body.scrollTop = 0;
      this.loadingFlag = true;
      this.loaded = false;
      //this.reloading = true;
      setTimeout(() => {
        //this.$router.replace(this.$route.path);
        window.location.reload();
        //this.reloading = false;
        this.loaded = true;
      },250)
    }
  }
}
</script>

<style lang="css">
  body {
    background-color: rgba(255, 243, 233, 0.2);
  }
  .sidemenuSwitch {
    background-color: transparent;
    height: 2rem;
    width: 2rem;
    position: fixed;
    top: 0;
    right: 0;
  }
  .sidemenuSwitch_top,
  .sidemenuSwitch_mid,
  .sidemenuSwitch_bottom {
    position: absolute;
    display: block;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    background-color: rgb(150, 150, 150);
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    top: 50%;
  }
  .sidemenuSwitch_top {
    left: 30%;
  }
  .sidemenuSwitch_mid {
    left: 50%;
  }
  .sidemenuSwitch_bottom {
    left: 70%;
  }
  @keyframes loading {
    0% {color: white}
    50% {color: transparent}
    100% {color: white}
  }
  .loadingFlag {
    position: fixed;
    height: 5rem;
    width: 5rem;
    text-align: center;
    -webkit-transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    background-color: rgba(0,0,0,.5);
    border-radius: 40%;
    color: white;
    line-height: 5rem;
    overflow: hidden;
    animation: loading 2s infinite;
    transition: all .2s ease;
    box-shadow: 0 0 10px -5px rgba(87, 87, 87, .5);
  }
  .officialLink {
    font-size: 0.7rem;
    color: rgb(82, 82, 82);
    text-decoration: none;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .3s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
