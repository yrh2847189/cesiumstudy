
<template >
  <div id="cesiumContainer"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";

Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  90,
  -20,
  110,
  90
);
onMounted(() => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
    animation: false, //是否创建动画小器件，左下角仪表
    fullscreenButton: false, //是否显示全屏按钮
    homeButton: false, //是否显示Home按钮
    timeline: false, //是否显示时间轴
    navigationHelpButton: false, //是否显示右上角的帮助按钮
  });
  var token = "7b56038c276128a86a5b946404bf4df4";
  // 服务域名
  // 服务负载子域
  var subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];
  viewer.imageryLayers.removeAll();
  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      //影像底图
      url:
        "http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
        token,
      subdomains: subdomains,

      layer: "tdtImgLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
    })
  );

  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      //影像注记
      url:
        "http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" +
        token,
      subdomains: subdomains,
      layer: "tdtCiaLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
    })
  );
  var scale = ref(1);
  var entity = {
    name: "singleWarning",
    id: "yrh",
    position: Cesium.Cartesian3.fromDegrees(116.2, 39.53),
    billboard: {
      image: "https://zouyaoji.top/vue-cesium/favicon.png",
      show: true,
      scale: scale.value,
      width: 100,
      height: 100,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 6.8e10),
    },
  };
  entity.billboard.scale = 1;
  viewer.entities.add(entity);

  var entity1 = {
    name: "singleWarning",
    id: "yrh1",
    position: Cesium.Cartesian3.fromDegrees(115.2, 40.53),
    billboard: {
      image: "https://zouyaoji.top/vue-cesium/favicon.png",
      show: true,
      scale: scale.value,
      width: 100,
      height: 100,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 6.8e10),
    },
  };

  viewer.entities.add(entity1);
  var blueBox = viewer.entities.add({
    id: "yrhbox",
    name: "Blue box",
    position: Cesium.Cartesian3.fromDegrees(113.0, 35.0, 300000.0),
    box: {
      dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
      material: Cesium.Color.BLUE,
    },
  });

  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  var lastPick = {};
  handler.setInputAction(function (movement) {
    var pickedObject = viewer.scene.pick(movement.endPosition);

    if (pickedObject) {
      if (pickedObject !== lastPick) {
        pickedObject.id.billboard.scale = 2;
        lastPick = pickedObject;
      }
    } else if (lastPick) {
      if (lastPick.id) {
        lastPick.id.billboard.scale = 1;
      }

      lastPick = undefined;
    }

    // if (viewer.scene.mode !== Cesium.SceneMode.MORPHING) {
    //   var pickedObject = viewer.scene.pick(movement.endPosition);
    //   if (Cesium.defined(pickedObject) && pickedObject.id.id === "yrh") {
    //     console.log("鼠标移入");
    //     foundPosition = true;
    //     entity1 = pickedObject.id;
    //     entity1.billboard.scale = 2;
    //   }
    // }
    // if (!foundPosition) {
    //   console.log("鼠标移出");
    //   entity1.billboard.scale = 0.5;
    // }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  var handler1 = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  var lastPick1 = {};
  handler1.setInputAction(function (movement) {
    var pickedObject = viewer.scene.pick(movement.endPosition);
    if (pickedObject) {
      if (pickedObject !== lastPick) {
        pickedObject.id.box.material = Cesium.Color.RED;
        lastPick1 = pickedObject;
      }
    } else if (lastPick1) {
      if (lastPick1.id) {
        lastPick1.id.box.material = Cesium.Color.BLUE;
      }
      lastPick1 = undefined;
    }

    // if (viewer.scene.mode !== Cesium.SceneMode.MORPHING) {
    //   var pickedObject = viewer.scene.pick(movement.endPosition);
    //   if (Cesium.defined(pickedObject) && pickedObject.id.id === "yrh") {
    //     console.log("鼠标移入");
    //     foundPosition = true;
    //     entity1 = pickedObject.id;
    //     entity1.billboard.scale = 2;
    //   }
    // }
    // if (!foundPosition) {
    //   console.log("鼠标移出");
    //   entity1.billboard.scale = 0.5;
    // }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
});
</script>
<style scoped>
#cesiumContainer {
  background: red;
  width: 100%;
  height: 800px;
}
</style>
