
<template >
  <div id="cesiumContainer"></div>

  <div id="htmlOverlay" class="label-container label-container-var">
    <div class="label-animate-marker_border">
          <span class="label-animate-marker_text">北京欢迎您</span>
        </div>
  </div>
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
  });

  const htmlOverlay = document.getElementById("htmlOverlay");

  var scratch = new Cesium.Cartesian2();
  viewer.scene.preRender.addEventListener(function () {
    var position = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883);
    var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(
      position,
      scratch
    );
    if (Cesium.defined(canvasPosition)) {
      htmlOverlay.style.top = canvasPosition.y + "px";
      htmlOverlay.style.left = canvasPosition.x + "px";
    }
  });
  // const scratch = new Cesium.Cartesian2(104.04, 30.40);
  // viewer.scene.preRender.addEventListener(function () {
  //   const position = Cesium.Cartesian3.fromDegrees(104.04, 30.40,2000,viewer.scene.globe.ellipsoid);
  //   const canvasPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, position);

  // //   const canvasPosition = viewer.scene.cartesianToCanvasCoordinates(
  // //     position,{} as any
  // //   );

  //   if (Cesium.defined(canvasPosition)) {
  //     htmlOverlay.style.top = canvasPosition.y+'px';
  //     htmlOverlay.style.left = canvasPosition.x+'px';

  //     const cameraPosition = viewer.camera.position
  //     const cartographicPosition = viewer.scene.globe.ellipsoid.cartesianToCartographic(cameraPosition)
  //     if (Cesium.defined(cartographicPosition)) {
  //       let cameraHeight = cartographicPosition.height
  //       cameraHeight += 1 * viewer.scene.globe.ellipsoid.maximumRadius
  //       if (Cesium.Cartesian3.distance(cameraPosition, position) > cameraHeight) {
  //         htmlOverlay.style.display = 'none'
  //       } else {
  //         htmlOverlay.style.display = 'block'
  //       }
  //     }
  //   }
  // });
  //viewer.camera.flyHome(2);
});
</script>
<style>
#cesiumContainer {
  background: red;
  width: 100%;
  height: 800px;
}
 .vc-box {
    width: 200px;
    line-height: 30px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 8px 16px;
  }

  .label-container {
    position: absolute;
    left: 0;
    bottom: 0;
    pointer-events: none;
    cursor: pointer;
  }
  .label-container-var {
    --boder-height: 30px;
    --clip-height-1: 40px;
    --clip-height-2: 38px;
    --text-color: #fff;
    --border-color: #1890ff;
    --box-shadow-color: rgba(21, 209, 242, 0.56);
    --text-font-size: 14px;
    --clip-width-1: 165px;
    --clip-width-2: 163px;
    --boder-width: 150px;
    --text-left-position: -75px;
    --animation-name: marker-boder-animate;
  }
  .label-animate-marker_border {
    width: var(--boder-width);
    height: var(--boder-height);
    margin: auto;
    color: var(--border-color);
    -webkit-box-shadow: inset 0 0 0 1px var(--box-shadow-color);
    box-shadow: inset 0 0 0 1px var(--box-shadow-color);
  }
  .label-animate-marker_text {
    color: var(--text-color);
    font-size: var(--text-font-size);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 100%;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-weight: bolder;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    background: rgba(0, 126, 255, 0.32);
  }
  .label-animate-marker_border,
  .label-animate-marker_border:after,
  .label-animate-marker_border:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .label-animate-marker_border:after,
  .label-animate-marker_border:before {
    content: '';
    margin: -5%;
    -webkit-box-shadow: inset 0 0 0 2px;
    box-shadow: inset 0 0 0 2px;
    -webkit-animation: var(--animation-name) 8s linear infinite;
    animation: var(--animation-name) 8s linear infinite;
  }
  .label-animate-marker_border:before {
    -webkit-animation-delay: -4s;
    animation-delay: -4s;
  }


@-webkit-keyframes marker-boder-animate {
  0%,
  to {
    clip: rect(0, var(--clip-width-1), 2px, 0);
  }
  25% {
    clip: rect(0, 2px, var(--clip-height-1), 0);
  }
  50% {
    clip: rect(var(--clip-height-2), var(--clip-width-1), var(--clip-width-1), 0);
  }
  75% {
    clip: rect(0, var(--clip-width-1), var(--clip-height-1), var(--clip-width-2));
  }
}
@keyframes marker-boder-animate {
  0%,
  to {
    clip: rect(0, var(--clip-width-1), 2px, 0);
  }
  25% {
    clip: rect(0, 2px, var(--clip-height-1), 0);
  }
  50% {
    clip: rect(var(--clip-height-2), var(--clip-width-1), var(--clip-width-1), 0);
  }
  75% {
    clip: rect(0, var(--clip-width-1), var(--clip-height-1), var(--clip-width-2));
  }
}
</style>
