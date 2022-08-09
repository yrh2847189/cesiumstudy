
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

    const tileset1 = new Cesium.Cesium3DTileset({
        url: 'http://resource.dvgis.cn/data/3dtiles/ljz/tileset.json',
        // 控制切片视角显示的数量，可调整性能
        maximumScreenSpaceError: 2,
        maximumNumberOfLoadedTiles: 100000,
    });
    tileset1.readyPromise.then((tileset) => {
        viewer.scene.primitives.add(tileset);
        viewer.scene.camera.setView({
            destination: tileset.boundingSphere.center,
            orientation: {
                heading: 0.0,
                pitch: -0.5,
                endTransform: Cesium.Matrix4.IDENTITY,
            },
        });
        tileset.style = new Cesium.Cesium3DTileStyle({
            color: 'vec4(0, 0.5, 1.0,1)',
        });
        // 注入 shader
        tileset.tileVisible.addEventListener((tile) => {
            const { content } = tile;
            const { featuresLength } = content;
            for (let i = 0; i < featuresLength; i += 2) {
                const feature = content.getFeature(i);
                const model = feature.content._model;

                if (model && model._sourcePrograms && model._rendererResources) {
                    Object.keys(model._sourcePrograms).forEach((key) => {
                        const program = model._sourcePrograms[key];
                        const fragmentShader = model._rendererResources.sourceShaders[program.fragmentShader];
                        let vPosition = '';
                        if (fragmentShader.indexOf(' v_positionEC;') !== -1) {
                            vPosition = 'v_positionEC';
                        } else if (fragmentShader.indexOf(' v_pos;') !== -1) {
                            vPosition = 'v_pos';
                        }
                        const color = `vec4(${feature.color.toString()})`;

                        // 自定义着色器
                        model._rendererResources.sourceShaders[program.fragmentShader] = ` 
              varying vec3 ${vPosition};// 相机坐标系的模型坐标
              void main(void){
                /* 渐变效果 */
                vec4 v_helsing_position = czm_inverseModelView * vec4(${vPosition},1);// 解算出模型坐标
                float stc_pl = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
                float stc_sd = v_helsing_position.z / 60.0 + sin(stc_pl) * 0.1;
                gl_FragColor = ${color};// 基础蓝色
                gl_FragColor *= vec4(stc_sd, stc_sd, stc_sd, 1.0);// 按模型高度进行颜色变暗处理
                /* 扫描线 */
                float glowRange = 360.0; // 光环的移动范围(高度)，最高到360米
                float stc_a13 = fract(czm_frameNumber / 360.0);// 计算当前着色器的时间，帧率/（6*60），即时间放慢6倍
                float stc_h = clamp(v_helsing_position.z / glowRange, 0.0, 1.0);
                stc_a13 = abs(stc_a13 - 0.5) * 2.0;
                float stc_diff = step(0.005, abs(stc_h - stc_a13));// 根据时间来计算颜色差异
                gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - stc_diff);// 原有颜色加上颜色差异值提高亮度
              }
            `;
                    });
                    // 让系统重新编译着色器
                    model._shouldRegenerateShaders = true;
                }
            }
        });
    });


});
</script>
<style scoped>
#cesiumContainer {
    background: red;
    width: 100%;
    height: 800px;
}
</style>
