import { defineConfig, optimizeDeps } from 'vite'
//import path from 'path';
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium';
//import externalGlobals from 'rollup-plugin-external-globals'//lmw add 2

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),cesium()]
  // resolve:{
  //   alias:{
  //    "CesiumHeatmap":path.resolve(__dirname,"./public/CesiumHeatmap.js")
  //   }
  // },
  // optimizeDeps:{
  //   include:['CesiumHeatmap']
  // },
  // build:{
  //   rollupOptions:{
  //     external:['CesiumHeatmap'],//lmw add 6 不让cesium再被编译
  //     plugins:[
  //       externalGlobals({
  //         "CesiumHeatmap":"CesiumHeatmap"//lmw add 7 ⽤引⼊的Cesium对应代码中的cesium
  //       })
  //     ]
  //   }
  // }

})
