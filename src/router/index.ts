import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/test",
            name: "test",
            component: () => import("../views/overlay/overlayHtml.vue"),
            
        
        },
        {
            path: "/",
            name: "view",
            component: () => import("../views/Home.vue"),
            redirect: { name: "viewer" }, 
            children: [
                {
                    path: "viewer",
                    name: "viewer",
                    component: () => import("../views/view/viewer.vue"),//根据你的菜单结构引入
                }
            ],
        
        },
       {
            path: "/images",
            name: "images",
            component: () => import("../views/Home.vue"),
            children: [
                {
                    path: "TiandituImageryProvider",
                    name: "TiandituImageryProvider",
                    component: () => import("../views/images/TiandituImageryProvider.vue"),//根据你的菜单结构引入
                },
                {
                    path: "ArcGisMapServerImageryProvider",
                    name: "ArcGisMapServerImageryProvider",
                    component: () => import("../views/images/ArcGisMapServerImageryProvider.vue"),
                },
            ],
        },
        {
            path: "/control",
            name: "control",
            component: () => import("../views/Home.vue"),
            children: [
                {
                    path: "navigation",
                    name: "navigation",
                    component: () => import("../views/control/navigation.vue"),
                },
                {
                    path: "overviewMap",
                    name: "overviewMap",
                    component: () => import("../views/control/overviewMap.vue"),
                },
                {
                    path: "Split",
                    name: "Split",
                    component: () => import("../views/control/Split.vue"),
                },
                {
                    path: "Widget",
                    name: "Widget",
                    component: () => import("../views/control/Widget.vue"),
                }
            ],
        
        },
        {
            path: "/overlay",
            name: "overlay",
            component: () => import("../views/Home.vue"),
            children: [
                {
                    path: "overlayHtml",
                    name: "overlayHtml",
                    component: () => import("../views/overlay/overlayHtml.vue"),//根据你的菜单结构引入
                },
                {
                    path: "OverlayHeatmap",
                    name: "OverlayHeatmap",
                    component: () => import("../views/overlay/OverlayHeatmap.vue"),//根据你的菜单结构引入
                },
                {
                    path: "OverlayEcharts",
                    name: "OverlayEcharts",
                    component: () => import("../views/overlay/OverlayEcharts.vue"),//根据你的菜单结构引入
                }
            ],
        
        },
        {
            path: "/primitive",
            name: "primitive",
            component: () => import("../views/Home.vue"),
            children: [
                {
                    path: "Model",
                    name: "Model",
                    component: () => import("../views/primitive/Model.vue"),
                },
            ],
        },

        {
            path: "/primitives",
            name: "primitives",
            component: () => import("../views/Home.vue"),
            children: [
                {
                    path: "LabelCollection",
                    name: "LabelCollection",
                    component: () => import("../views/primitives/LabelCollection.vue"),
                },
                {
                    path: "PointCollection",
                    name: "PointCollection",
                    component: () => import("../views/primitives/PointCollection.vue"),
                },{
                    path: "PolylineCollection",
                    name: "PolylineCollection",
                    component: () => import("../views/primitives/PolylineCollection.vue"),
                },{
                    path: "PrimitiveCollection",
                    name: "PrimitiveCollection",
                    component: () => import("../views/primitives/PrimitiveCollection.vue"),
                }

                
            ],
        
        },
        {
            path: "/entitys",
            name: "entitys",
            component: () => import("../views/Home.vue"),
            children: [
                {
                    path: "Entity",
                    name: "Entity",
                    component: () => import("../views/entitys/Entity.vue"),
                },
            ],
        },
        {
            path: "/graphics",
            name: "graphics",
            component: () => import("../views/Home.vue"),
            children: [
                {
                    path: "BoxGraphics",
                    name: "BoxGraphics",
                    component: () => import("../views/graphics/BoxGraphics.vue"),
                },
                {
                    path: "LabelGraphics",
                    name: "LabelGraphics",
                    component: () => import("../views/graphics/LabelGraphics.vue"),
                },
                {
                    path: "ModelGraphics",
                    name: "ModelGraphics",
                    component: () => import("../views/graphics/ModelGraphics.vue"),
                },
                {
                    path: "PathGraphics",
                    name: "PathGraphics",
                    component: () => import("../views/graphics/PathGraphics.vue"),
                },
                {
                    path: "MovePoint",
                    name: "MovePoint",
                    component: () => import("../views/graphics/MovePoint.vue"),
                },
                {
                    path: "BounceMarker",
                    name: "BounceMarker",
                    component: () => import("../views/graphics/BounceMarker.vue"),
                },
                {
                    path: "AnimationWall",
                    name: "AnimationWall",
                    component: () => import("../views/graphics/AnimationWall.vue"),
                },
                {
                    path: "ShpCustomShader",
                    name: "ShpCustomShader",
                    component: () => import("../views/graphics/ShpCustomShader.vue"),
                },
                {
                    path: "Cluster",
                    name: "Cluster",
                    component: () => import("../views/graphics/Cluster.vue"),
                },
                {
                    path: "AnimationLine",
                    name: "AnimationLine",
                    component: () => import("../views/graphics/AnimationLine.vue"),
                },

                
            ],
        },
        {
            path: "/terrains",
            name: "terrains",
            component: () => import("../views/Home.vue"),
            children: [
                {
                    path: "CesiumTerrainProvider",
                    name: "CesiumTerrainProvider",
                    component: () => import("../views/terrains/CesiumTerrainProvider.vue"),
                },
                {
                    path: "TiandituTerrainProvider",
                    name: "TiandituTerrainProvider",
                    component: () => import("../views/terrains/TiandituTerrainProvider.vue"),
                },
                {
                    path: "ArcGISTiledElevationTerrainProvider",
                    name: "ArcGISTiledElevationTerrainProvider",
                    component: () => import("../views/terrains/ArcGISTiledElevationTerrainProvider.vue"),
                },
                
            ],
        },
        {
            path: "/datasource",
            name: "datasource",
            component: () => import("../views/Home.vue"),
            children: [
                {
                    path: "CustomDataSource",
                    name: "CustomDataSource",
                    component: () => import("../views/datasource/CustomDataSource.vue"),
                },
                {
                    path: "GeoJsonDataSource",
                    name: "GeoJsonDataSource",
                    component: () => import("../views/datasource/GeoJsonDataSource.vue"),
                },
                {
                    path: "KmlDataSource",
                    name: "KmlDataSource",
                    component: () => import("../views/datasource/KmlDataSource.vue"),
                },
                {
                    path: "CzmlDataSource",
                    name: "CzmlDataSource",
                    component: () => import("../views/datasource/CzmlDataSource.vue"),
                },
                {
                    path: "AirplaneCzmlDataSource",
                    name: "AirplaneCzmlDataSource",
                    component: () => import("../views/datasource/AirplaneCzmlDataSource.vue"),
                },
                {
                    path: "ShpDataSource",
                    name: "ShpDataSource",
                    component: () => import("../views/datasource/ShpDataSource.vue"),
                },
                
            ],
        },
        {
            path: "/weather",
            name: "weather",
            component: () => import("../views/Home.vue"),
            children: [
                {
                    path: "Snow",
                    name: "Snow",
                    component: () => import("../views/weather/Snow.vue"),
                },
                {
                    path: "Rain",
                    name: "Rain",
                    component: () => import("../views/weather/Rain.vue"),
                },
            ],
        },
    ]
})
export default router