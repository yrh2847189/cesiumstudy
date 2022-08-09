
<template >
  <el-row>
    <el-button type="primary" id="addGPSPoint">开始模拟添加航点</el-button>
  </el-row>
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
    viewer.scene.globe.enableLighting = true;
    let data = [{ longitude: 116.405419, latitude: 39.918034, height: 0, time: 0 },
    { longitude: 116.605419, latitude: 40.018034, height: 0, time: 10 },
    ];

    let points = [{ longitude: 116.805419, latitude: 40.118034, height: 0, time: 20 },
    { longitude: 117.005419, latitude: 40.318034, height: 0, time: 30 },
    { longitude: 117.105419, latitude: 40.418034, height: 0, time: 40 },
    { longitude: 117.205419, latitude: 40.518034, height: 0, time: 50 },
    { longitude: 117.305419, latitude: 40.618034, height: 0, time: 60 },
    ];

    // 起始时间
    let start = Cesium.JulianDate.fromDate(new Date());
    // 结束时间
    let stop = Cesium.JulianDate.addSeconds(start, 10, new Cesium.JulianDate());
    // // 设置始时钟始时间
    // viewer.clock.startTime = start.clone();
    // // 设置时钟当前时间
    // viewer.clock.currentTime = start.clone();
    // // 设置始终停止时间
    // viewer.clock.stopTime = stop.clone();
    // // 时间速率，数字越大时间过的越快
    // viewer.clock.multiplier = 1;
    // // 时间轴
    // viewer.timeline.zoomTo(start, stop);
    // // 循环执行,即为2，到达终止时间，重新从起点时间开始
    // //   viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
    // viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
    // 摄像机聚焦到开始位置
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(116.405419, 39.918034, 100000)
    })
    let property = createProperty(data);;
    // 添加entity实体
    let planeModel = viewer.entities.add({
        // 和时间轴关联
        availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
            start: start,
            stop: stop
        })]),
        id: 'move',
        position: property,
        // 根据所提供的位置计算模型的朝向
        orientation: new Cesium.VelocityOrientationProperty(property),
        // 模型
        model: {
            uri: '/static/SampleData/models/CesiumAir/Cesium_Air.glb',
            minimumPixelSize: 128
        },
        path: {
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.1,
                color: Cesium.Color.YELLOW
            }),
            // leadTime、trailTime 不设置 path全显示
            leadTime: 0,// 设置为0时 模型通过后显示path
            //   trailTime: 0,// 设置为0时 模型通过后隐藏path
            width: 10
        }
    });
    viewer.trackedEntity = planeModel;
    var i = 0;
    document.getElementById('addGPSPoint').onclick = function (e) {
      
        if (i <= 4) {
            second = points[i].time;
            // viewer.clock.stopTime = stop.clone();
            let time = Cesium.JulianDate.addSeconds(start, points[i].time, new Cesium.JulianDate);
            viewer.clock.stopTime = time.clone();
            viewer.entities.getById('move').availability = new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                start: start,
                stop: time.clone()
            })]);
            let position = Cesium.Cartesian3.fromDegrees(points[i].longitude, points[i].latitude, points[i].height);
            // 添加位置，和时间对应
            property.addSample(time, position);
              //viewer.clock.shouldAnimate = true
        }
        else {
           // viewer.clock.shouldAnimate = false
        }
        i = i + 1;
    }

    var second = 10;
    viewer.clock.onTick.addEventListener((tick) => {
        // let s = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, start)
        // //  console.log(s);
        // if (s >= second - 1) {
        //     viewer.clock.shouldAnimate = false
        // } else {
        //     setTimeout(() => {
        //         viewer.clock.shouldAnimate = true
        //     }, 500);
        // }
    })
    viewer.clock.onStop.addEventListener((tick) => {
        console.log(tick, 'stop')
        // 动画执行到结束时间时调用
        // 逻辑代码 removeEventListener => onTick
    })
    /**
     * 计算飞行路径
     * @param source 数据坐标
     * @returns {SampledPositionProperty|*}
     */
    function createProperty(source) {
        // 取样位置 相当于一个集合
        let property = new Cesium.SampledPositionProperty();
        property.forwardExtrapolationType = Cesium.ExtrapolationType.HOLD;
        for (let i = 0; i < source.length; i++) {
            let time = Cesium.JulianDate.addSeconds(start, source[i].time, new Cesium.JulianDate);
            let position = Cesium.Cartesian3.fromDegrees(source[i].longitude, source[i].latitude, source[i].height);
            // 添加位置，和时间对应
            property.addSample(time, position);
        }
        return property;
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
