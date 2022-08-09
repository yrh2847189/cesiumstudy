
<template >
    <el-row>
        <div id="cesiumContainer"></div>
    </el-row>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";
onMounted(() => {
    var viewer = new Cesium.Viewer('cesiumContainer', {
        baseLayerPicker: false,
        timeline: true,// 必须为true显示时间线组件（如不想显示可以使用样式层叠表修改display：none） 否则viewer.timeline.zoomTo会报undefined错误
        homeButton: false,
        fullscreenButton: false,
        infoBox: false,
        sceneModePicker: false,
        navigationInstructionsInitiallyVisible: false,
        navigationHelpButton: false,
        animation: false,
        shouldAnimate: true // 必须为true开启动画 否则不会达到飞机模型飞行动画效果
    });
    var arcGisMapServerImageryProvider =
        new Cesium.ArcGisMapServerImageryProvider({
            url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        });

    viewer.imageryLayers.removeAll();
    viewer.imageryLayers.addImageryProvider(arcGisMapServerImageryProvider);


var positions =[
        120.79579364922108, 31.41897182222492,
        120.79514640830746, 31.413416233367496,
        120.80014457845661, 31.409758233570173,
        120.80209040697119, 31.4057337132493,
        120.80029764615955, 31.40018476234912,
        120.79461591180647, 31.393602298131494,
        120.80156004258437, 31.373752923140046,
        120.81530979532509, 31.376170803746234,
        120.81799402128613, 31.369903794337265,
        120.82176135960087, 31.36679674875513,
        120.82593532700473, 31.366541207705012,
        120.83103046449061, 31.3692834055125,
        120.83358860960048, 31.372351098711572,
        120.83719814240608, 31.376592616157275,
        120.84249512848864, 31.378757567597003,
        120.84384209946673, 31.38311264607813,
        120.83986623598962, 31.386877926326456,
        120.84389196467293, 31.395675136605373,
        120.84824026431292, 31.401305169421832,
        120.84736455536907, 31.40786016415259,
        120.845392713477, 31.41314556194053,
        120.84634518993951, 31.417009174294737,
        120.84473492552534, 31.420086883959744,
        120.84294781929464, 31.422998359692404,
        120.79579364922108, 31.41897182222492,
      ];


    const maximumHeights = Array(positions.length / 2).fill(600);
    const minimumHeights = Array(positions.length / 2).fill(60);
  var  positions1 = Cesium.Cartesian3.fromDegreesArray(positions);

    const dayMaximumHeights = Array(minimumHeights.length).fill(600);

    viewer.entities.add({
      wall: {
        positions: positions1,
        maximumHeights: new Cesium.CallbackProperty(() => {
          for (let i = 0; i < minimumHeights.length; i++) {
            dayMaximumHeights[i] += maximumHeights[i] * 0.004;
            if (dayMaximumHeights[i] > maximumHeights[i]) {
              dayMaximumHeights[i] = minimumHeights[i];
            }
          }
          return dayMaximumHeights;
        }, false),
        minimumHeights,
        material: new Cesium.Color(1, 0, 0, 0.8),
      },
    });

viewer.zoomTo(viewer.entities);

});
</script>
<style scoped>
#cesiumContainer {
    background: red;
    width: 100%;
    height: 800px;
}
</style>
