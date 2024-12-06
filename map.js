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
    map.addLayer(vectorLayer);
    window.g = new gye;

    // Добавляем точки
    addMark("logos/ifvd.webp", 9062, -5108, 'modalIFVD');
    addMark("logos/fian.webp", 6365, -7635, 'modalFIAN');
    addMark("logos/iai.webp", 2865, -8345, 'modalIYAI');
    addMark("logos/ift.webp", 10140, -4300, 'modalIFZRAN');
    addMark("logos/iof_ran.webp", 10340, -4270, 'modalIOFRAN');
    addMark("logos/isan.webp", 7065, -6720, 'modalISAN');
    addMark("logos/izmiran.webp", 10575, -3820, 'modalIZMIRAN');
    addMark("logos/kif.webp", 8925, -4138, 'modalKIF');
    addMark("logos/mns.webp", 7220, -5450, 'modalMNS');
    addMark("logos/tisnym.webp", 9286, -4540, 'modalTISNYM');
    addMark("logos/triniti.webp", 10380, -2445, 'modalTRINITI');
    addMark("logos/troitsk.webp", 6335, -6560, 'modalTROITSK');

    // Обработчик нажатия на метки
    map.on('singleclick', function(evt) {
        // Проверяем, есть ли под кликом метка
        map.forEachFeatureAtPixel(evt.pixel, function(feature) {
            // Если нашли метку, выполняем нужные действия
            if (feature) {
                const geometry = feature.getGeometry();
                const coordinates = geometry.getCoordinates();
                const modalId = feature.get('modalId'); // Получаем идентификатор модального окна

                // Открываем соответствующее модальное окно
                if (modalId) {
                    const modal = document.getElementById(modalId);
                    if (modal) {
                        modal.showModal();
                    }
                }
            }
        });
    });

    map.on('postrender', () => {
        function animate() {
            vectorSource.getFeatures().forEach((e) => {
                let style = e.getStyle();
                style.getImage().setScale(map.getView().getZoom() / 10);
                e.setStyle(style);
            });
        }

        animate();
    });
});

function addMark(url, x, y, modalId) {
    let iconFeature = new Feature({
        geometry: new Point([x, y]),
    });
    iconFeature.set('modalId', modalId); // Устанавливаем идентификатор модального окна
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
