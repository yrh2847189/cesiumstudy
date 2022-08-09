<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>Cesium后台管理系统</span>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="300px">
        <el-scrollbar height="800px">
          <!-- <div class="toggle-button">|||</div> -->

          <!-- <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
      
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item> 

          default-openeds=" ['/view','/control','/overlay',
          '/primitives','/images','/entitys','/datasource',
          '/terrains','/graphics']"
      </el-menu> -->
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            router="true"
            text-color="#fff"
          >
            <el-sub-menu index="control" collapse="false">
              <template #title>
                <span>控件</span>
              </template>
              <el-menu-item index="/control/navigation"
                >Navigation控件</el-menu-item
              >
              <el-menu-item index="/control/overviewMap"
                >OverviewMap 鹰眼</el-menu-item
              >
               <el-menu-item index="/control/Split"
                >对比</el-menu-item
              >
            </el-sub-menu>
            <el-sub-menu index="overlay" collapse="false">
              <template #title>
                <span>覆盖物</span>
              </template>
              <el-menu-item index="/overlay/overlayHtml"
                >OverlayHtml 覆盖物</el-menu-item
              >
              <el-menu-item index="/overlay/OverlayHeatmap"
                >OverlayHeatmap 热力图</el-menu-item
              >
              <el-menu-item index="/overlay/OverlayEcharts"
                >OverlayEcharts</el-menu-item
              >
            </el-sub-menu>

            <el-sub-menu index="datasource" collapse="false">
              <template #title>
                <span>数据源</span>
              </template>
              <el-menu-item index="/datasource/CustomDataSource"
                >CustomDataSource</el-menu-item
              >
              <el-menu-item index="/datasource/GeoJsonDataSource"
                >GeoJsonDataSource</el-menu-item
              >
              <el-menu-item index="/datasource/KmlDataSource"
                >KmlDataSource</el-menu-item
              >
              <el-menu-item index="/datasource/CzmlDataSource"
                >CzmlDataSource</el-menu-item
              >
            </el-sub-menu>

            <el-sub-menu index="entitys" collapse="false">
              <template #title>
                <span>实体</span>
              </template>
              <el-menu-item index="/entitys/Entity">Entity 实体</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="graphics" collapse="false">
              <template #title>
                <span>图形</span>
              </template>
              <el-menu-item index="/graphics/BoxGraphics"
                >多种图形</el-menu-item
              >
              <el-menu-item index="/graphics/LabelGraphics"
                >LabelGraphics 文本</el-menu-item
              >
              <el-menu-item index="/graphics/ModelGraphics"
                >ModelGraphics 模型</el-menu-item
              >
              <el-menu-item index="/graphics/PathGraphics"
                >PathGraphics 模型</el-menu-item
              >
            </el-sub-menu>

            <el-sub-menu index="terrains" collapse="false">
              <template #title>
                <span>地形提供者</span>
              </template>
              <el-menu-item index="/terrains/CesiumTerrainProvider"
                >CesiumTerrainProvider</el-menu-item
              >
              <el-menu-item index="/terrains/TiandituTerrainProvider"
                >TiandituTerrainProvider 天地图</el-menu-item
              >
              <el-menu-item
                index="/terrains/ArcGISTiledElevationTerrainProvider"
                >ArcGISTiledElevationTerrainProvider</el-menu-item
              >
            </el-sub-menu>
            <el-sub-menu index="primitive" collapse="false">
              <template #title>
                <span>图元</span>
              </template>
              <el-menu-item index="/primitive/Model"
                >Model 模型图元</el-menu-item
              >
            </el-sub-menu>
            <el-sub-menu index="primitives" collapse="false">
              <template #title>
                <span>图元集合</span>
              </template>
              <el-menu-item index="/primitives/LabelCollection"
                >LabelCollection 标签集合</el-menu-item
              >
              <el-menu-item index="/primitives/PointCollection"
                >PointCollection 点集合</el-menu-item
              >
              <el-menu-item index="/primitives/PolylineCollection"
                >PolylineCollection 点集合</el-menu-item
              >
              <el-menu-item index="/primitives/PrimitiveCollection"
                >PrimitiveCollection 图元集合</el-menu-item
              >
            </el-sub-menu>

            <el-sub-menu index="view" collapse="false">
              <template #title>
                <span>视图</span>
              </template>
              <el-menu-item index="/viewer">Viewer 场景视图</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="images" collapse="false">
              <template #title>
                <span>影像提供者</span>
              </template>
              <el-menu-item index="/images/TiandituImageryProvider"
                >TiandituImageryProvider 天地图</el-menu-item
              >
              <el-menu-item index="/images/ArcGisMapServerImageryProvider"
                >ArcGisMapServerImageryProvider</el-menu-item
              >
            </el-sub-menu>

            <el-sub-menu index="weather" collapse="false">
              <template #title>
                <span>天气效果</span>
              </template>
              <el-menu-item index="/weather/Snow">雪花效果</el-menu-item>
               <el-menu-item index="/weather/Rain">下雨效果</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <!-- 右侧内容主体区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background-color: #363d40;
  // 给头部设置一下弹性布局
  display: flex;
  // 让它贴标左右对齐
  justify-content: space-between;
  // 清空图片左侧padding
  padding-left: 0;
  // 按钮居中
  align-items: center;
  // 文本颜色
  color: #fff;
  // 设置文本字体大小
  font-size: 20px;
  // 嵌套
  > div {
    // 弹性布局
    display: flex;
    // 纵向上居中对齐
    align-items: center;
    // 给文本和图片添加间距，使用类选择器
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #313743;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #e9edf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  // 添加背景颜色
  background-color: #4a5064;
  // 设置文本大小
  font-size: 10px;
  // 设置文本行高
  line-height: 24px;
  // 设置文本颜色
  color: #fff;
  // 设置文本居中
  text-align: center;
  // 设置文本间距
  letter-spacing: 0.2em;
  // 设置鼠标悬浮变小手效果
  cursor: pointer;
}
</style>