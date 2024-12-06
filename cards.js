$(".Element_of_map").click((e) => {
    document.getElementById("modal" + $(e.currentTarget).attr("id")).showModal();
});
$(".close-button").click(() => {
    $("dialog[open]")[0].close();
});
$("dialog").click((e) => {
    if (e.target === e.currentTarget) $("dialog[open]")[0].close();
});
$(document).ready(() => {
   /* $("dialog").each((i, e) => {
        $(e).niceScroll('#' + $(e).attr("id") + " > div > div", {
            cursorcolor: "#75A3C9",
            cursoropacitymin: 0.1,
            cursorborder: "",
        });
    })*/
    // $("dialog").niceScroll({enableobserver: true});
})