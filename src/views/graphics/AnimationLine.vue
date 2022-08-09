
<template >
    <div id="cesiumContainer"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";
import { LineFlowMaterialProperty } from "../../lib/material/polylineLineFlowMaterial";
onMounted(() => {
  var viewer = new Cesium.Viewer("cesiumContainer", {
    baseLayerPicker: false,
    timeline: true, // 必须为true显示时间线组件（如不想显示可以使用样式层叠表修改display：none） 否则viewer.timeline.zoomTo会报undefined错误
    homeButton: false,
    fullscreenButton: false,
    infoBox: false,
    sceneModePicker: false,
    navigationInstructionsInitiallyVisible: false,
    navigationHelpButton: false,
    animation: false,
    shouldAnimate: true, // 必须为true开启动画 否则不会达到飞机模型飞行动画效果
  });
  var arcGisMapServerImageryProvider =
    new Cesium.ArcGisMapServerImageryProvider({
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    });

  viewer.imageryLayers.removeAll();
  viewer.imageryLayers.addImageryProvider(arcGisMapServerImageryProvider);

  const from = {
    name: "北京市",
    x: 116.4,
    y: 39.9,
  };
  const to = [
    {
      name: "上海市",
      x: 116.33,
      y: 39.88,
    },
    {
      name: "郑州市",
      x: 116.41,
      y: 39.91,
    },
    {
      name: "武汉市",
      x: 116.31,
      y: 39.98,
    },
  ];

  const e = Cesium.Cartesian3.fromDegrees(from.x, from.y, 1);
  // 绘制起点
  viewer.entities.add({
    name: from.name,
    position: e,
    point: {
      pixelSize: 10,
      color: new Cesium.Color(0.3, 0.79, 1, 0.9),
    },
  });
  for (let index = 0; index < to.length; index++) {
    const o = to[index];
    const t = Cesium.Cartesian3.fromDegrees(o.x, o.y, 1);
    // 绘制(流动)曲线
    viewer.entities.add({
      name: o.name,
      polyline: {
        positions: getLinkedPointList(e, t, 4e4, 100),
        width: 2,
        material: new LineFlowMaterialProperty(
          new Cesium.Color(1, 0.79, 0.15, 1),
          2e3
        ),
      },
    });
    // 绘制终点
    viewer.entities.add({
      name: o.name,
      position: t,
      point: {
        pixelSize: 8,
        color: new Cesium.Color(1, 201 / 255, 38 / 255, 1),
      },
    });
  }
viewer.zoomTo(viewer.entities);

  function getLinkedPointList(e, t, i, r) {
    const n = [];
    const o = Cesium.Cartographic.fromCartesian(e);
    const a = Cesium.Cartographic.fromCartesian(t);
    const s = (180 * o.longitude) / Math.PI;
    const l = (180 * o.latitude) / Math.PI;
    const u = (180 * a.longitude) / Math.PI;
    const c = (180 * a.latitude) / Math.PI;
    const h = Math.sqrt((s - u) * (s - u) + (l - c) * (l - c));
    const d = h * i;
    const f = Cesium.Cartesian3.clone(e);
    const p = Cesium.Cartesian3.clone(t);
    const m = Cesium.Cartesian3.distance(f, Cesium.Cartesian3.ZERO);
    const g = Cesium.Cartesian3.distance(p, Cesium.Cartesian3.ZERO);
    Cesium.Cartesian3.normalize(f, f);
    Cesium.Cartesian3.normalize(p, p);
    if (Cesium.Cartesian3.distance(f, p) === 0) return n;
    const v = Cesium.Cartesian3.angleBetween(f, p);
    n.push(e);
    for (let y = 1; y < r - 1; y++) {
      const _ = (1 * y) / (r - 1);
      const w = 1 - _;
      const b = Math.sin(w * v) / Math.sin(v);
      const C = Math.sin(_ * v) / Math.sin(v);
      const x = Cesium.Cartesian3.multiplyByScalar(
        f,
        b,
        new Cesium.Cartesian3()
      );
      const P = Cesium.Cartesian3.multiplyByScalar(
        p,
        C,
        new Cesium.Cartesian3()
      );
      const E = Cesium.Cartesian3.add(x, P, new Cesium.Cartesian3());
      const M = _ * Math.PI;
      const T = m * w + g * _ + Math.sin(M) * d;
      const F = Cesium.Cartesian3.multiplyByScalar(E, T, E);
      n.push(F);
    }
    n.push(t);
    return n;
  }
});
</script>
<style scoped>
#cesiumContainer {
  background: red;
  width: 100%;
  height: 800px;
}
</style>
