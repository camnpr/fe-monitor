<template>
    <div>
        <!-- 菜单权限json（调试专用）：==={{ routes | json }} -->
        <template v-if="routes">
            <router-link to="/index/personalInfo" v-if="routes['/index/personalInfo']" >
                <el-menu-item index="/index/personalInfo">
                    <i class="fa fa-tachometer" aria-hidden="true"></i> 总览            
                </el-menu-item>
            </router-link>

            <el-submenu index="访问域名" v-if="routes['/example/form'] || routes['/errorpage/404']">
                <template slot="title">
                    <i class="fa fa-sitemap" aria-hidden="true"></i> 访问域名
                </template>              
                <router-link class="menu-indent" to="/example/form" v-if="routes['/example/form']">
                    <el-menu-item index="/example/form">白屏时间</el-menu-item>
                </router-link>
                <router-link class="menu-indent" to="/example/mixin" v-if="routes['/example/mixin']">
                    <el-menu-item index="/example/mixin">首屏时间</el-menu-item>
                </router-link>
                <router-link class="menu-indent" to="/example/mixin" v-if="routes['/example/mixin']">
                    <el-menu-item index="/example/mixin">网页加载完成</el-menu-item>
                </router-link>
                <router-link class="menu-indent" to="/example/mixin" v-if="routes['/example/mixin']">
                    <el-menu-item index="/example/mixin">资源加载完成</el-menu-item>
                </router-link>
            </el-submenu>
            
            <el-submenu index="访问页面" v-if="routes['/example/form'] || routes['/example/tinymce'] || routes['/example/mixin'] ">
                <template slot="title">
                    <i class="fa fa-file-o" aria-hidden="true"></i> 访问页面
                </template>
                <router-link class="menu-indent" to="/example/form" v-if="routes['/example/form'] ">
                    <el-menu-item index="/example/form">白屏时间</el-menu-item>
                </router-link>                
                <router-link class="menu-indent" to="/example/tinymce" v-if="routes['/example/tinymce']">
                    <el-menu-item index="/example/tinymce">首屏时间</el-menu-item>
                </router-link>
                <router-link class="menu-indent" to="/example/mixin"  v-if="routes['/example/mixin']">
                    <el-menu-item index="/example/mixin">网页加载完成</el-menu-item>
                </router-link>                
                <el-submenu index="table内编辑" >
                    <template slot="title">资源加载完成</template>
                        <router-link class="menu-indent" to="/example/31" >
                            <el-menu-item index="/example/31">
                                没权限重定向401
                            </el-menu-item>
                        </router-link>
                            <router-link class="menu-indent" to="/example/table2" >
                            <el-menu-item index="/example/table2">
                                地址错误跳404
                            </el-menu-item>
                        </router-link>
                </el-submenu>
            </el-submenu>

            <router-link to="/example/tableList" v-if="routes['/example/tableList']" >
                <el-menu-item index="/example/tableList">
                    <i class="fa fa-location-arrow" aria-hidden="true"></i> 定位分析
                </el-menu-item>
            </router-link>
            <router-link to="/example/tableList" v-if="routes['/example/tableList']" >
                <el-menu-item index="/example/tableList">
                    <i class="fa fa-adjust" aria-hidden="true"></i> Ajax
                </el-menu-item>
            </router-link>
            <router-link to="/movie/movieSearch" v-if="routes['/movie/movieSearch']" >
                <el-menu-item index="/movie/movieSearch">
                    <i class="fa fa-bug" aria-hidden="true"></i> 脚本错误
                </el-menu-item>
            </router-link>
            <router-link to="/example/tableList" v-if="routes['/example/tableList']" >
                <el-menu-item index="/example/tableList">
                    <i class="fa fa-globe" aria-hidden="true"></i> 浏览器
                </el-menu-item>
            </router-link>
            <router-link to="/example/tableList" v-if="routes['/example/tableList']" >
                <el-menu-item index="/example/tableList">
                    <i class="fa fa-map-marker" aria-hidden="true"></i> 地理位置
                </el-menu-item>
            </router-link>
            <router-link to="/movie/newMovie" v-if="routes['/movie/newMovie']" >
                <el-menu-item index="/movie/newMovie">
                    <i class="fa fa-database" aria-hidden="true"></i> 运营商
                </el-menu-item>
            </router-link>
            <router-link to="/example/tableList" v-if="routes['/example/tableList']" >
                <el-menu-item index="/example/tableList">
                    <i class="fa fa-picture-o" aria-hidden="true"></i> 快照
                </el-menu-item>
            </router-link>

            <el-submenu index="系统设置" v-if="routes['/systemSet/permissionsManage'] || routes['/systemSet/loginLog']"> 
                <template slot="title">
                    <i class="fa fa-cogs fa-fw" aria-hidden="true"></i> 系统设置
                </template>
                    <router-link class="menu-indent" to="/systemSet/permissionsManage" v-if="routes['/systemSet/permissionsManage']">
                        <el-menu-item index="/systemSet/permissionsManage">
                            权限管理
                        </el-menu-item>
                    </router-link>
                    <router-link class="menu-indent" to="/systemSet/loginLog" v-if="routes['/systemSet/loginLog']">
                        <el-menu-item index="/systemSet/loginLog">
                            登录日志
                        </el-menu-item>
                    </router-link>
            </el-submenu>
        </template>    
    </div>
</template>

<script>
    //获取vuex中的菜单权限 进行菜单show展示。登陆成功时直接 返回菜单json 并包含帐户信息
    export default {
      name: 'SidebarItem',
      props: {
        routes: {
          // type: Array
        }
      },

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .wscn-icon {
        margin-right: 10px;
    }
    .fa{
        margin-right: 10px;
    }
    .hideSidebar .menu-indent{
        display: block;
        text-indent: 10px;
    }
</style>