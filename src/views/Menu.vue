<template>
  <div class="leek-menu">
    <div class="logo">
      <router-link to="/">
        <span>私立医院挂号系统</span>
      </router-link>
    </div>
    <div class="custom-menu">
      <el-menu router :default-active="curRoutePath" unique-opened text-color="#ffffff" active-text-color="#1890ff" background-color="#000000">
        <!-- 一级 -->
        <div v-for="(menu) in menuList" :key="menu.path">
          <template v-if="menu.children">
            <el-submenu :index="menu.path" :key="menu.path">
              <template slot="title">
                <i v-bind:class="menu.meta.icon"></i>
                <span slot="title">{{menu.meta.title}}</span>
              </template>
              <!-- 二级 -->
              <template v-for="(subMenu) in menu.children" :index="subMenu.path">

                <el-submenu v-if="subMenu.children" :index="subMenu.path" :key="subMenu.path">
                  <template slot="title">
                    <i v-bind:class="subMenu.meta.icon"></i>
                    <span slot="title">{{subMenu.meta.title}}</span>
                  </template>
                  <!-- 三级 -->
                  <el-menu-item v-for="(thirdMenu) in subMenu.children" :index="thirdMenu.path" :key="thirdMenu.path">
                    <i v-bind:class="thirdMenu.meta.icon"></i><span slot="title">{{thirdMenu.meta.title}}</span>
                  </el-menu-item>
                </el-submenu>

                <el-menu-item v-else :index="subMenu.path" :key="subMenu.path">
                  <i v-bind:class="subMenu.meta.icon"></i><span slot="title">{{subMenu.meta.title}}</span>
                </el-menu-item>

              </template>
            </el-submenu>
          </template>

          <template v-else>
            <el-menu-item :index="menu.path" :key="menu.path">
              <i v-bind:class="menu.meta.icon"></i><span slot="title">{{menu.meta.title}}</span>
            </el-menu-item>
          </template>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
// import { pageRoutes } from '@/router'
import { mapGetters } from 'vuex'
export default {
  name: 'LeekMenu',
  computed: {
    ...mapGetters({
      menuList: 'menuList'
    })
  },
  data: function () {
    return {
      curRoutePath: this.$route.path,
      isCollapse: false
    }
  },
  mounted: function () {
    // window.addEventListener('resize', () => {
    //   this.isCollapse = window.innerWidth < 1200
    // })
    // this.getMenuData()
  },
  methods: {
    getMenuData () {
      // this.menuList = pageRoutes.filter(item => {
      //   // 此处根据用户权限过滤
      //   return true
      // })
    }
  }
}
</script>

<style lang="scss">
  .leek-menu {
    background-color: #000;
    height: 100%;
    width: 190px;
    overflow-x: hidden;
    overflow-y: auto;
    .logo {
      padding: 15px 0;
      font-size: 20px;
      color: #fff;
      text-align: left;
      padding-left: 10px;
    }
    .custom-menu {
      text-align: left;
    }
    .el-menu {
      border: 0;
    }
    .el-menu--inline {
      text-align: left;
      padding-left: 8px;
    }
  }
</style>
