/*eslint-disable*/
import * as Cesium from "cesium";

/**
 *
 * 封装天气场景
 * 云
 */
export default class Cloud {
  constructor(v) {
    this.collection = v.scene.postProcessStages
    let _self = this
    this._cloud = new Cesium.PostProcessStage({
      name: 'czm_cloud',
      fragmentShader: _self.getFs(),
    })
    this.collection.add(this._cloud)
    /*v.scene.skyAtmosphere.hueShift = -0.8
    v.scene.skyAtmosphere.saturationShift = -0.7
    v.scene.skyAtmosphere.brightnessShift = -0.33
    v.scene.fog.density = 0.001
    v.scene.fog.minimumBrightness = 0.8*/
  }
  getFs() {
    return 'czm_material czm_getMaterial(czm_materialInput materialInput)\n\
    {\n\
         czm_material material = czm_getDefaultMaterial(materialInput);\n\
         vec2 st = materialInput.st;\n\
         vec4 colorImage = texture2D(image,   vec2(fract(st.s + time),fract(st.t)));\n\
         material.alpha = colorImage.a * color.a  ;\n\
         material.diffuse =    color.rgb  ;\n\
         return material;\n\
     }'
  }
  remove() {
    this.collection.remove(this._cloud)
    // this._rain.destroy()
  }
}
