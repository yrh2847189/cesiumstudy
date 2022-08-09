// @ts-nocheck
import * as echarts from "echarts";
import RegisterCoordinateSystem from "./RegisterCoordinateSystem";
import * as Cesium from "cesium";
export class EchartsLayer {
    public _chartLayer: echarts.ECharts;
    private readonly _viewer: any;
    private option: any;
    private _isRegistered: boolean;
    private _echartsContainer: any;

    
    constructor(viewer: any, option: any) {
        this._viewer = viewer;
        this._isRegistered = false;
      this._createLayerContainer();
        this.option = option;
        this._chartLayer.setOption(option);
    }

    _createLayerContainer() {
        const scene: any = this._viewer.scene;
        scene.canvas.setAttribute('tabIndex', 0);
        const container: any = document.createElement('div');
        container.style.position = 'absolute';//
        container.style.top = '0px';
        container.style.left = '0px';
        // container.style.right = '0px';
        // container.style.bottom = '0px';
        container.style.width = scene.canvas.width + "px";
        container.style.height = scene.canvas.height + "px";
        container.style.zIndex = 999;
        container.style.pointerEvents = "none";
        this._viewer.container.appendChild(container);
        this._echartsContainer = container;
       // (echarts as any).glMap = scene;

     

      
        this._register();
        this._chartLayer = (echarts as any).init(container);
       // this._viewer.scene.postRender.addEventListener(this.onPreRender);
       // return chart;
    }

     onPreRender() {
       
        this._chartLayer.resize({
            width:  this._viewer.canvas.width,
            height:  this._viewer.canvas.height
          })
        
      }
    _register() {
        if (this._isRegistered) return;
       // (echarts as any).registerCoordinateSystem("GLMap", new RegisterCoordinateSystem(this._viewer.scene));
     
       (echarts as any).registerCoordinateSystem("GLMap", this.getE3CoordinateSystem(this._viewer.scene));
        (echarts as any).registerAction({
            type: "GLMapRoam",
            event: "GLMapRoam",
            update: "updateLayout"
        }, function(e: any, t: any) {});
        (echarts as any).extendComponentModel({
            type: "GLMap",
            getBMap: function() {
                return this.__GLMap;
            },
            defaultOption: {
                roam: !1
            }
        });
        (echarts as any).extendComponentView({
            type: "GLMap",
            init: function(echartModel: any, api: any) {
              // this.api = api, (echarts as any).glMap.postRender.addEventListener(this.moveHandler, this);

             // this.api = api, this._viewer.scene.postRender.addEventListener(this.moveHandler, this);
            },
            moveHandler: function(e: any, t: any) {
                this.api.dispatchAction({
                    type: "GLMapRoam"
                });
            },
            render: function(e: any, t, i: any) {},
            dispose: function() {
                (echarts as any).glMap.postRender.removeEventListener(this.moveHandler, this);
            }
        });
        this._isRegistered = true;
    }
     getE3CoordinateSystem(viewer: Cesium.Viewer) {
        const CoordSystem = function CoordSystem(this: any, viewer) {
          this.viewer = viewer
          this._mapOffset = [0, 0]
        }
  
        CoordSystem.create = function (ecModel) {
          ecModel.eachSeries(function (seriesModel) {
            if (seriesModel.get('coordinateSystem') === "GLMap") {
              seriesModel.coordinateSystem = new CoordSystem(viewer)
            }
          })
          return []
        }
  
        CoordSystem.getDimensionsInfo = function () {
          return ['x', 'y']
        }
  
        CoordSystem.dimensions = ['x', 'y']
        CoordSystem.prototype.dimensions = ['x', 'y']
        CoordSystem.prototype.setMapOffset = function setMapOffset(mapOffset) {
          this._mapOffset = mapOffset
        }
        CoordSystem.prototype.dataToPoint = function (data) {
          const result = []
          const cartesian3 = Cesium.Cartesian3.fromDegrees(data[0], data[1])
          if (!cartesian3) {
            return result
          }
  
          if (1==1) {
            const up = Cesium.Ellipsoid.WGS84.geodeticSurfaceNormal(cartesian3, new Cesium.Cartesian3())
            const cd = this.viewer.camera.direction
            if (Cesium.Cartesian3.dot(up, cd) >= 0) {
              return result
            }
          }
  
          const coords = this.viewer.cartesianToCanvasCoordinates(cartesian3)
          if (!coords) {
            return result
          }
          return [coords.x - this._mapOffset[0], coords.y - this._mapOffset[1]]
        }
        CoordSystem.prototype.pointToData = function (pt) {
          const mapOffset = this._mapOffset
          const ellipsoid = viewer.scene.globe.ellipsoid
          const car3 = new Cesium.Cartesian3(pt[1] + mapOffset[1], pt[2] + mapOffset[2], 0)
          const cart = ellipsoid.cartesianToCartographic(car3)
          return cart ? [cart.longitude, cart.latitude] : [0, 0]
        }
        CoordSystem.prototype.getviewerRect = function () {
          const canvas = this.viewer.canvas
          return new echarts.graphic.BoundingRect(0, 0, canvas.width, canvas.height)
        }
        CoordSystem.prototype.getRoamTransform = function () {
          return echarts.matrix.create()
        }
  
        return CoordSystem
      }
    dispose() {
        this._echartsContainer && (this._viewer.container.removeChild(this._echartsContainer), this._echartsContainer = null);
        this._chartLayer && (this._chartLayer.dispose(), this._chartLayer = null);
        this._isRegistered = false;
    }

    destroy() {
        this.dispose();
    }

    updateEchartsLayer(option: any) {
        this._chartLayer && this._chartLayer.setOption(option);
    }

    getMap() {
        return this._viewer;
    }

    getEchartsLayer() {
        return this._chartLayer;
    }

    show() {
        this._echartsContainer && (this._echartsContainer.style.visibility = "visible");
    }

    hide() {
        this._echartsContainer && (this._echartsContainer.style.visibility = "hidden");
    }

}

export default EchartsLayer;
// @ts-check
