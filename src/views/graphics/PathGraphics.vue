
<template >
  <div id="cesiumContainer"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";

  const position = ref({})
      const positions = ref([])
      const model = ref(null)
      const availability = ref(null)
      const orientation = ref(null)
      const entity = ref(null)

// Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
//   90,
//   -20,
//   110,
//   90
// );
onMounted(() => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    // infoBox: false,
    // animation: false, //是否创建动画小器件，左下角仪表
    // fullscreenButton: false, //是否显示全屏按钮
    // homeButton: false, //是否显示Home按钮
    // timeline: false, //是否显示时间轴
    // navigationHelpButton: false, //是否显示右上角的帮助按钮
  });




  var start = Cesium.JulianDate.fromDate(new Date(2019, 6, 28, 16));
  var stop = Cesium.JulianDate.addSeconds(start, 180, new Cesium.JulianDate());

  viewer.clock.startTime = start.clone();
  viewer.clock.stopTime = stop.clone();
  viewer.clock.currentTime = start.clone();
  viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
  viewer.clock.multiplier = 10;

  var position = new Cesium.SampledPositionProperty();
  for (var i = 0; i <= 3; i += 1) {
    var time = Cesium.JulianDate.addSeconds(
      start,
      i * 60,
      new Cesium.JulianDate()
    );
    var point = Cesium.Cartesian3.fromDegrees(120, 26 + i * 0.1, 1750);
    position.addSample(time, point);
  }

  var entity = viewer.entities.add({
    position: position,
    orientation: new Cesium.VelocityOrientationProperty(position),
    viewFrom: new Cesium.Cartesian3(100.0, 0.0, 0.0),
    model: {
      uri: "https://zouyaoji.top/vue-cesium/SampleData/models/CesiumAir/Cesium_Air.glb",
      minimumPixelSize: 64,
    },

    path: {
      resolution: 1,
      leadTime: 0,
      trailTime: 180,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.1,
        color: Cesium.Color.YELLOW,
      }),
      width: 10,
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
