const map = $("#map");
const Troitsk_map = document.querySelector('#map');
const body = $("body");
const zoomin_btn = $("#zoomin");
const zoomout_btn = $("#zoomout");
let map_translate_x = 0;
let map_translate_y = 0;
let dragging = false;
// const scales = [0.328, 0.41, 0.512, 0.64, 0.8, 1, 1.2, 1.44, 1.728, 2.0736]
const scales = [0.32, 0.4, 0.5, 0.6, 0.72, 0.86, 1.04]
let scale_index = 0;
let previousTouch = null;
// Переменная показывает, находится ли данный курсор на каком-то объекте на карте
let cursor_on_elem = 0;
// Переменная показывает, крутится колесо вверх или вниз в зависимости от знака (+ или -)
let delta_wheel = 0;
let map_rect = map[0].getBoundingClientRect();
const adjust_x = window.innerWidth / 2;
const adjust_y = window.innerHeight / 2;


$(window).on("load", () => {
    let on_start_dragging = (e) => {
        if (!$(e.target).is("body, img")) return;
        startDrag();
    };
    let on_stop_dragging = () => {
        stopDragging();
    };
    let on_dragging = (e) => {
        if (dragging) {
            map_translate_x += e.originalEvent.movementX;
            map_translate_y += e.originalEvent.movementY;
            setTranslate();
        }
    }
    body.on("mousedown", on_start_dragging);
    body.on("mouseup", on_stop_dragging);
    body.on("mousemove", on_dragging);
    body.on("touchstart", (e) => {
        previousTouch = e.originalEvent.touches[0];
        on_start_dragging(e);
    });
    body.on("touchend", (e) => {
        previousTouch = null;
        on_stop_dragging();
    });
    body.on("touchmove", (e) => {
        const touch = e.originalEvent.touches[0];
        if (previousTouch) {
            e.originalEvent.movementX = touch.pageX - previousTouch.pageX;
            e.originalEvent.movementY = touch.pageY - previousTouch.pageY;
            on_dragging(e);
        }
        previousTouch = touch;
    });
    zoomin_btn.click(zoomIn);
    zoomout_btn.click(zoomOut);
})
$(document).ready(() => {
    $("#map_Troitsk").attr("src", "/images/jpgmax.jpg");
    $("#map_Troitsk").on("load", () => {
        image_load();
    })
})

function setTranslate() {
    map_translate_x = Math.min(map_rect.width / 2 - adjust_x, Math.abs(map_translate_x)) * (map_translate_x > 0 ? 1 : -1);
    map_translate_y = Math.min(map_rect.height / 2 - adjust_y, Math.abs(map_translate_y)) * (map_translate_y > 0 ? 1 : -1);
    map.css("translate", map_translate_x + "px" + " " + map_translate_y + "px");
}

function startDrag() {
    dragging = true;
    body.css("cursor", "grabbing");
}

function stopDragging() {
    dragging = false;
    body.css("cursor", "default");
}

function zoomIn() {
    if (scale_index === scales.length - 1) return;
    ++scale_index;
    map.css("transform", "scale(" + scales[scale_index] + ")");
    map_translate_x = Math.round(map_translate_x * 120) / 100;
    map_translate_y = Math.round(map_translate_y * 120) / 100;
    map_rect = map[0].getBoundingClientRect();
    setTranslate();
}

function zoomOut() {
    if (scale_index === 0) return;
    --scale_index;
    map.css("transform", "scale(" + scales[scale_index] + ")");
    map_translate_x = Math.round(map_translate_x * 80) / 100;
    map_translate_y = Math.round(map_translate_y * 80) / 100;
    map_rect = map[0].getBoundingClientRect();
    setTranslate();
}

Troitsk_map.addEventListener('wheel', (event) => {
    // зависит от браузера, поэтому стоит 2 "ИЛИ"
    if (cursor_on_elem === 0) {
        let delta_wheel = event.deltaY || event.detail || event.wheelDelta;
        if (delta_wheel < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    }
});

function image_load() {
    map.css("display", "block");
    map.addClass("map_loaded");
    for (let i = 0;i<scales.length;++i){
        map.css("transform", "scale(" + scales[i] + ")");
    };
    map.css("transform", "scale(" + scales[scale_index] + ")");
    map_rect = map[0].getBoundingClientRect();
    $("#preloader").remove();
}