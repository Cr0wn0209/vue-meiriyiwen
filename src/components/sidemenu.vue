<template lang="html">
  <div>
    <div class="menuMask" v-bind:class="{ menuMask_on: state }" v-on:touchstart="closeMenu()"></div>
    <div class="menuContent" v-bind:class="{ menuContent_on: state }">
      <ul>
        <li class="menuButtons" v-for="button of buttons" v-if="button.fathercomponent === father" v-on:touchstart="goto(button.route)">
          <span></span>
          <p>{{ button.text }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidemenu',
  props: ['sidemenuState','father','articleDate'],
  data() {
    return {
      state: this.sidemenuState,
      buttons: [
        {
          text: "随机",
          fathercomponent: "home",
          route: "/random"
        },
        {
          text: "随机",
          fathercomponent: "random",
          route: "/random"
        },
        {
          text: "随机",
          fathercomponent: "day",
          route: "/random"
        },
        {
          text: "今天",
          fathercomponent: "random",
          route: "/"
        },
        {
          text: "今天",
          fathercomponent: "day",
          route: "/"
        },
        {
          text: "前一天",
          fathercomponent: "home",
          route: "/day/" + this.articleDate.prev
        },
        {
          text: "前一天",
          fathercomponent: "random",
          route: "/day/" + this.articleDate.prev
        },
        {
          text: "前一天",
          fathercomponent: "day",
          route: "/day/" + this.articleDate.prev
        },
        {
          text: "后一天",
          fathercomponent: "random",
          route: "/day/" + this.articleDate.next
        },
        {
          text: "后一天",
          fathercomponent: "day",
          route: "/day/" + this.articleDate.next
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.state = this.sidemenuState;
    },100);
  },
  methods: {
    closeMenu() {
      this.state = false;
      this.$emit('sidemenuClose');
    },
    goto(route) {
      // console.log(this.$route.path === route);
      this.closeMenu();
      /*
      if (this.$route.path === route) {
        this.$emit('reloading');
      }
      */
      setTimeout(() => {
        this.$router.replace(route);
        this.$emit('reloading');
      },100);
    }
  }
}
</script>

<style lang="css">
  .menuContent {
    position: fixed;
    height: 100%;
    width: 20%;
    top: 0;
    right: 0;
    background-color: rgb(74, 74, 74);
    transform: translateX(100%);
    transition: all .2s;
  }
  .menuContent_on {
    box-shadow: 0 0 10px -3px rgba(0, 0, 0, 0.8);
    transform: translateX(0);
  }
  .menuContent > ul {
    padding: 0;
    margin: 0;
  }
  .menuButtons {
    position: relative;
    background-color: transparent;
    width: 100%;
    padding-bottom: 100%;
    list-style-type: none;
    margin: 0;
  }
  .menuButtons > span {
    display: block;
    position: absolute;
    background-color: transparent;
    border: 1px solid rgb(195, 195, 195);
    border-radius: 40%;
    box-sizing: border-box;
    height: 65%;
    width: 65%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .menuButtons > p {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    color: white;
    font-size: 0.5rem;
    margin: 0;
  }
  .menuMask {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    transition: all .2s;
    opacity: 0;
  }
  .menuMask_on {
    opacity: 1;
  }
</style>
