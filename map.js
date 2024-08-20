window.addEventListener("load", () => {
    const Map = ol.Map;
    const View = ol.View;
    const ImageLayer = ol.layer.Image;
    const VectorImageLayer = ol.layer.VectorImage;
    const VectorLayer = ol.layer.Vector;
    const TileLayer = ol.layer.Tile;
    const ImageStatic = ol.source.ImageStatic;
    const VectorSource = ol.source.Vector;
    const ImageTile = ol.source.ImageTile;
    const TileDebug = ol.source.TileDebug;
    const Feature = ol.Feature;
    const Point = ol.geom.Point;
    const Icon = ol.style.Icon;
    const Style = ol.style.Style;
    const TileGrid = ol.tilegrid.TileGrid;

    const w = 1600;
    const h = 9000;
    const bw = 1000;
    const bh = 500;
    const image_extent = [-w, -h, w, h];
    const view_extent = [-w + bw, -h + bh, w - bw, h - bh];
    // const tile_size = [200, 200];
    // const projection = new ol.proj.Projection({
    //     code: 'pixel-projection',
    //     units: 'pixels',
    //     extent: [0, 0, 16, 8],
    // });
    // const map = new Map({
    //     target: 'map',
    //     layers: [
    //         // new ImageLayer({
    //         //     source: new ImageStatic({
    //         //         url: 'jpgmax.jpg',
    //         //         projection: projection,
    //         //         imageExtent: image_extent,
    //         //     })
    //         // })
    //         new TileLayer({
    //             source: new ImageTile({
    //                 url: 'map/{z}/{x}/{y}.png',
    //                 tileSize: tile_size,
    //                 minZoom: 0,
    //                 maxZoom: 3,
    //                 projection: projection,
    //                 tileGrid: new TileGrid({
    //                     origin: [0, 0, 0],
    //                     resolutions: [2, 1, 0.5, 0.25],
    //                     tileSize: tile_size,
    //                     projection: projection,
    //                 })
    //             }),
    //             projection: projection
    //         }),
    //         new TileLayer({
    //             source: new TileDebug(),
    //             projection: projection,
    //             tileGrid: new TileGrid({
    //                 origin: [0, 0, 0],
    //                 resolutions: [2, 1, 0.5, 0.25],
    //                 tileSize: tile_size,
    //                 projection: projection,
    //             })
    //         }),
    //     ],
    //     view: new View({
    //         center: [0, 0, 0],
    //         zoom: 0,
    //         maxZoom: 3,
    //         minZoom: 0,
    //         projection: projection,
    //         // extent: view_extent
    //     })
    // });
    let imageWidth = 16000;
    let imageHeight = 9000;
    let tileSize = 200;
    let maxZoom = 3;
    let resolutions = [];
    let resolution = 5;

    for (let i = 0; i <= maxZoom; i++) {
        resolutions.push(resolution);
        resolution /= 2;
    }

    // Создаем пользовательскую проекцию в пикселях
    let pixelProjection = new ol.proj.Projection({
        code: 'PIXEL',
        units: 'pixels',
        extent: [0, -imageHeight, imageWidth, 0]
    });

    let tileGrid = new ol.tilegrid.TileGrid({
        origin: [0, 0],
        resolutions: resolutions,
        tileSize: [tileSize, tileSize]
    });

    let source = new ol.source.XYZ({
        url: 'map/{z}/{x}/{y}.png',
        tileGrid: tileGrid,
        projection: pixelProjection // Указываем нашу пользовательскую проекцию
    });

    let layer = new ol.layer.Tile({
        source: source
    });

    let map = new ol.Map({
        target: 'map',
        layers: [
            layer,
            // new TileLayer({
            //     source: new TileDebug({
            //         tileGrid: tileGrid,
            //         projection: pixelProjection
            //     }),

            // })
        ],
        view: new ol.View({
            projection: pixelProjection,
            center: [8000, -4500], // Центр точно пос   ередине изображения
            zoom: 0,
            minZoom: 0,
            maxZoom: 6,
            extent: [bw, -imageHeight, imageWidth - bw, -bh]
        })
    });
    const iconFeature = new Feature({
        geometry: new Point([9062, -5108]),
    });

    const vectorSource = new VectorSource({
        features: [iconFeature],
    });
    const vectorLayer = new VectorLayer({
        source: vectorSource
    });
    map.addLayer(vectorLayer)
    const gifUrl = 'ifvd.gif';
    g = new gye;
    g.animateNewContext("ifvd.webp").then(
        (res) => {
            if (!iconFeature.getStyle()) {
                iconFeature.setStyle(
                    new Style({
                        image: new Icon({
                            img: res.contexts[0].canvas,
                            anchor: [0.5, 0.9]
                        }),
                    }),
                );
                map.getView().on('change:resolution', function () {
                    
                })
            }
        },
        (err) => {
            console.error(err);
        }
    );
    map.on('postrender', () => {
        function animate() {
            let style = iconFeature.getStyle();
            style.getImage().setScale(map.getView().getZoom() / 10);
            iconFeature.setStyle(style);
            requestAnimationFrame(animate);
        }

        animate();
    });
})
