<template lang="html">
  <div>
    <div class="headTitle" v-bind:class="{ headTitle_on: scrolled }">
      <h4>每日一文</h4>
      <div class="headTitleActive" v-bind:class="{ headTitleActive_on: scrolled }">
        <h5>{{ title }}</h5>
        <p>{{ author }}</p>
      </div>
    </div>
    <div class="readPercent" v-bind:style="{ transform: percent }" v-if="loaded"></div>
    <h3 v-if="loaded" class="textTitle">{{ title }}</h3>
    <h6 v-if="loaded" class="textAuthor">{{ author }}</h6>
    <div v-html='content' class="contentDiv"></div>
    <div v-if="loaded" class="textCount">全文完 共 {{ wordCount }} 字</div>
  </div>
</template>

<script>

export default {
  name: 'articlecontainer',
  props: ['datafrom'],
  data() {
    return {
      title: "",
      author: "",
      content: "",
      percent: "scaleX(0)",
      wordCount: 0,
      loaded: false,
      isLoading: false,
      scrolled: false,
    }
  },
  created() {
    console.log(this.datafrom);
    this.getArticle(Number(this.datafrom));
  },
  mounted() {
  },
  methods: {
    getArticle(day = 0) {
      let that = this,
          url;
      switch (day) {
        case 0:
          url = 'https://interface.meiriyiwen.com/article/today?dev=1';
          break;
        case 1:
          url = 'https://interface.meiriyiwen.com/article/random?dev=1';
          break;
        default:
          url = 'https://interface.meiriyiwen.com/article/day?dev=1&date=' + day
          break;
      }
      this.$ajax({
        method: 'get',
        url: url
      })
      .then((response) => {
        that.content = response.data.data.content;
        that.title = response.data.data.title;
        that.author = response.data.data.author;
        that.wordCount = response.data.data.wc;
        that.loaded = true;
        that.$emit('loaded');
        that.$emit('isloading');
        that.$emit('getDate',response.data.data.date);
        window.addEventListener("scroll",this.handleScroll);
        document.body.scrollTop = 0;
      })
      .catch((error) => {
        let e = error;
        that.content = '很抱歉，没有找到该文章';
        console.log(e);
        that.$router.replace('/');
      })
    },
    handleScroll() {
      try {
        let contentDiv = document.querySelector('.contentDiv'),
        headTitle = document.querySelector('.headTitle'),
        textCount = document.querySelector('.textCount'),
        offset = contentDiv.offsetTop - 1.5 * headTitle.offsetHeight,
        alreadyRead = document.body.scrollTop + window.screen.availHeight,
        percent = (alreadyRead / textCount.offsetTop).toFixed(2);
        this.scrolled = document.body.scrollTop > offset ? true: false;
        this.percent = "scaleX(" + (percent < 1 ? percent: 1) + ")";
      }
      catch(e) {
        let err = e
        console.log("emmm.. 这个报错偷偷掩盖一下，暂时不知怎么解决");
      }
      // console.log(console.log(this.percent));
      // console.log(window.screen.availHeight);
    }
  }
}
</script>

<style lang="css">
  body {
    background-color: rgba(255, 243, 233, 0.2);
  }
  @keyframes loading {
    0% {color: white}
    50% {color: transparent}
    100% {color: white}
  }
  .readPercent {
    position: fixed;
    height: 2px;
    width: 100%;
    background-color: rgb(230, 114, 102);
    top: 2rem;
    left: 0;
    transition: all .3s;
  }
  .headTitle {
    height: 2rem;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    box-shadow: 0 0 10px -3px rgba(31, 31, 31, .8);
    overflow: hidden;
  }
  .headTitle > h4 {
    margin: 0;
    line-height: 2rem;
    transition: all .3s ease;
  }
  .headTitle_on > h4 {
    opacity: 0
  }
  .headTitleActive {
    width: 100%;
    height: 2rem;
    position: absolute;
    top: 2rem;
    background-color: white;
    transition: all .3s ease;
    opacity: 0;
  }
  .headTitleActive_on {
    transform: translateY(-100%);
    opacity: 1
  }
  .headTitleActive > p,
  .headTitleActive > h5 {
    font-size: 0.8rem;
    line-height: 1.2rem;
    margin: 0;
  }
  .headTitleActive > p {
    line-height: 0.8rem;
    font-size: 0.6rem;
  }
  .textTitle {
    margin-top: 2.2rem;
    margin-bottom: 0;
  }
  .textAuthor {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  .textCount {
    font-size: 0.5rem;
    height: 2rem;
    color: rgb(71, 71, 71);
    width: calc(100% - 0.4rem);
    line-height: 2rem;
    border-top: 1px solid rgb(171, 171, 171);
    box-sizing: border-box;
    margin: 0 auto;
  }
  .contentDiv {
    padding-left: 0.2rem;
    font-size: 0.8rem;
    text-align: left;
    text-indent: 2em;
  }

</style>
