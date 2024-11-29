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
window.addEventListener("load", () => {
    const w = 1600;
    const h = 9000;
    const bw = 1000;
    const bh = 500;
    const image_extent = [-w, -h, w, h];
    const view_extent = [-w + bw, -h + bh, w - bw, h - bh];
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
            layer
        ],
        view: new ol.View({
            projection: pixelProjection,
            center: [8000, -4500], // Центр точно поcередине изображения
            zoom: 0,
            minZoom: 0,
            maxZoom: 6,
            extent: [bw, -imageHeight, imageWidth - bw, -bh]
        })
    });

    const vectorSource = new VectorSource({
        features: [],
    });
    window.vs = vectorSource;
    const vectorLayer = new VectorLayer({
        source: vectorSource
    });
    map.addLayer(vectorLayer)
    window.g = new gye;

    // Вот здесь добавлять точки
    // ссылка на фотку, x координата, y координата
    addMark("ifvd.webp", 9062, -5108);

    map.on('postrender', () => {
        function animate() {
            vectorSource.getFeatures().forEach((e) => {
                let style = e.getStyle();
                style.getImage().setScale(map.getView().getZoom() / 10);
                e.setStyle(style);
            })
        }

        animate();
    });
})

function addMark(url, x, y) {
    let iconFeature = new Feature({
        geometry: new Point([x, y]),
    });
    vs.addFeature(iconFeature);
    g.animateNewContext(url).then(
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
            }
        },
        (err) => {
            console.error(err);
        }
    );
}
