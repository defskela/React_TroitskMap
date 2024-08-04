window.addEventListener("load", () => {
    const Map = ol.Map;
    const View = ol.View;
    const ImageLayer = ol.layer.Image;
    const VectorLayer = ol.layer.Vector;
    const ImageStatic = ol.source.ImageStatic;
    const VectorSource = ol.source.Vector;
    const Feature = ol.Feature;
    const Point = ol.geom.Point;
    const Icon = ol.style.Icon;
    const Style = ol.style.Style;

    const w = 15959;
    const h = 8977;
    const bw = 2000;
    const bh = 500;
    const image_extent = [-w, -h, w, h];
    const view_extent = [-w + bw, -h + bh, w - bw, h - bh];
    const projection = new ol.proj.Projection({
        code: 'xkcd-image',
        units: 'pixels',
        extent: image_extent,
    });
    const map = new Map({
        target: 'map',
        layers: [
            new ImageLayer({
                source: new ImageStatic({
                    url: 'jpgmax.jpg',
                    projection: projection,
                    imageExtent: image_extent
                })
            })
        ],
        view: new View({
            projection: projection,
            center: [0, 0],
            zoom: 4,
            maxZoom: 10,
            minZoom: 4,
            extent: view_extent
        })
    });
    const iconFeature = new Feature({
        geometry: new Point([0, 0]),
    });

    const vectorSource = new VectorSource({
        features: [iconFeature],
    });
    const vectorLayer = new VectorLayer({
        source: vectorSource,
    });
    map.addLayer(vectorLayer)
    const gifUrl = 'ifvd.gif';
    // g = new gye;
    // g.animateNewContext("ifvd.webp").then(
    //     (res) => {
    //         console.log(res);
    //         document.body.appendChild(res.contexts[0].canvas);
    //     },
    //     (err) => {
    //         console.error(err);
    //     }
    // );
    const gif = gifler(gifUrl);
    gif.frames(
        document.createElement('canvas'),
        function (ctx, frame) {
            if (!iconFeature.getStyle()) {
                iconFeature.setStyle(
                    new Style({
                        image: new Icon({
                            img: ctx.canvas,
                        }),
                    }),
                );
            }
            ctx.clearRect(0, 0, frame.width, frame.height);
            ctx.drawImage(frame.buffer, frame.x, frame.y);
            map.render();
        },
        true,
    );

})

