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



function canvas(){
  const zoomIntensity = 0.2;
  const canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  
  let scale = 1;
  let image = new Image();
  image.src =
  `${uploadedFile}`;
  image.onload = draw;
  
  function draw() {
    context.drawImage(image,0, 0,900,600);
    window.requestAnimationFrame(draw);
  }
  
  canvas.onwheel = function (event) {
    event.preventDefault();
  
    let x = event.clientX - canvas.offsetLeft;
    let y = event.clientY - canvas.offsetTop;
    const wheel = event.deltaY < 0 ? 1 : -1;
  
    // Compute zoom factor.
    let zoom = Math.exp(wheel * zoomIntensity);
    scale = Math.min(scale * zoom, 30);
  
    if (scale <= 1) {
      context.resetTransform();
      scale = 1;
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    let t = context.getTransform();
    context.resetTransform();
    context.translate(x, y);
    context.scale(zoom, zoom);
    context.translate(-x, -y);
    context.transform(t.a, t.b, t.c, t.d, t.e, t.f);
  };
}
