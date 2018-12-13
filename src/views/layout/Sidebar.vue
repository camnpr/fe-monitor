<template>
    <div>
        <div class="app-title">管理系统</div>
        <el-menu mode="vertical" theme="dark" :default-active="$route.path">
            <sidebar-item :routes='permission_routers'></sidebar-item>
        </el-menu>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import SidebarItem from './SidebarItem';
    export default {
      components: { SidebarItem },
      computed: {
        ...mapGetters([
          // 映射 this.permission_routers 为 store.getters.permission_routers
          'permission_routers'
        ])
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .el-menu {
        min-height: 100%;
    }
</style>
