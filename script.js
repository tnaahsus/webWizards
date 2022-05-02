let btnUpload = $("#upload_file"),
  btnOuter = $(".button_outer");
let uploadedFile;
btnUpload.on("change", function (e) {
  let ext = btnUpload.val().split(".").pop().toLowerCase();
  if ($.inArray(ext, ["gif", "png", "jpg", "jpeg"]) == -1) {
    $(".error_msg").text("Not an Image...");
  } else {
    $(".error_msg").text("");
    btnOuter.addClass("file_uploading");
    setTimeout(function () {
      btnOuter.addClass("file_uploaded");
      uploadedFile = URL.createObjectURL(e.target.files[0]);
      canvas();
    }, 3000);
  }
});

function canvas() {
  let canvas = new fabric.Canvas("canvas");
  let url = `${uploadedFile}`;
  fabric.Image.fromURL(url, function (img) {
    img.set({
      left: 10,
      width:img.width + 20,
      height:img.height,
    });
    document.getElementById('canvas').style.border='4px solid #83ccd3'
    canvas.setWidth(img.width);
    canvas.setHeight(img.height);
    canvas.add(img);
  });
  canvas.on("mouse:wheel", function (opt) {
    let delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 1) zoom = 1;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
}
