<template>
  <div class="sys-menu">
    <el-menu class="inner-menu" router :default-active="curRoutePath" unique-opened text-color="#ffffff" active-text-color="#1890ff" background-color="#333">
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
</template>

<script>
import Vue from 'vue'
import { Menu, MenuItem, Submenu } from 'element-ui'
import { mapGetters } from 'vuex'

Vue.use(Menu).use(MenuItem).use(Submenu)
export default {
  name: 'MyNav',
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
    window.addEventListener('resize', () => {
      this.isCollapse = window.innerWidth < 1200
    })
  }
}
</script>

<style lang="scss">
  .sys-menu {
    background-color: #333;
    height: 100%;
    width: 190px;
    overflow-x: hidden;
    overflow-y: auto;
    .inner-menu {
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
