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
      // uploadedFile ='<img width="400" height="400" src="'+uploadedFile+'" />'.
      canvas();
    }, 3000);
  }
});

function canvas() {
  let canvas = new fabric.Canvas("canvas");
  let url = `${uploadedFile}`;
  fabric.Image.fromURL(url, function (img) {
    img.set({
      left: 50,
      top: 0,
    });
    img.scaleToHeight(400,false);
    img.scaleToWidth(400,false);
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
