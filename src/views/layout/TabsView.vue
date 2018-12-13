<template>
  <!-- 快速导航tab -->
  <div class='tabs-view-container'>
    <router-link class="tabs-view" v-for="tag in Array.from(visitedViews)" :to="tag.fullPath" :key="tag.fullPath">
      <el-tag :closable="true" @close='closeViewTabs(tag,$event)'>
        {{tag.name}}
      </el-tag>
    </router-link>
    </div>
</template>

<script>
    export default {
      computed: {
        visitedViews() {
          return this.$store.state.app.visitedViews.slice(-6)
        }
      },
      methods: {
        closeViewTabs(view, $event) {
          this.$store.dispatch('delVisitedViews', view)
          $event.preventDefault()
        },
        addViewTabs() {
          let curr = this.$route.matched[this.$route.matched.length - 1];
          curr.fullPath = this.$route.fullPath; // 带参的路径，修复。
          this.$store.dispatch('addVisitedViews', curr)
        }
      },
      watch: {
        $route() {
          this.addViewTabs()
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tabs-view-container{
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    .tabs-view{
      margin-left: 10px;
    }
  }

</style>
