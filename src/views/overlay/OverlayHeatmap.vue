
<template >
  <div id="cesiumContainer"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";

import * as Cesium from "cesium";

// const CesiumHeatmap:any = require('./CesiumHeatmap.js')
import { CesiumHeatmap, HeatmapPoint } from "cesiumheatmapyrh"

Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  90,
  -20,
  110,
  90
);


let cesiumHeatmap: CesiumHeatmap
const defaultDataValue: [number, number] = [10, 200]
const defaultOpacityValue: [number, number] = [0, 1]
const defaultRadius = 20

onMounted(() => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
  });
  const points: HeatmapPoint[] = []
        fetch("/static/datas/geojson/busstop2016.geojson", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            response.json().then((data) => {
                if (data)
                    data.features.forEach(function (feature) {
                        const lon = feature.geometry.coordinates[0]
                        const lat = feature.geometry.coordinates[1]
                        points.push({
                            x: lon - 0.05,
                            y: lat - 0.04,
                            value: 100 * Math.random()
                        })
                    })
                cesiumHeatmap = new CesiumHeatmap(viewer,
                    {
                        zoomToLayer: true,
                        points,
                        heatmapDataOptions: { max: defaultDataValue[1], min: defaultDataValue[0] },
                        heatmapOptions: {
                            maxOpacity: defaultOpacityValue[1],
                            minOpacity: defaultOpacityValue[0]
                        }
                    }
                )
            })
        })
});
</script>
<style>
#cesiumContainer {
  background: red;
  width: 100%;
  height: 800px;
}
</style>
