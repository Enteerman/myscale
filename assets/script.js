var dropContainer = document.getElementById("drop-container");
var fileInput = document.getElementById("file_upload");
// Below is copied from Stackoverflow
dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
	evt.preventDefault();
	evt.stopPropagation()
};

dropContainer.ondrop = function(evt) {
	// pretty simple -- but not for IE :(
	fileInput.files = evt.dataTransfer.files;

	// If you want to use some of the dropped files
	const dT = new DataTransfer();
	dT.items.add(evt.dataTransfer.files[0]);
	fileInput.files = dT.files;
	evt.preventDefault();
	evt.stopPropagation();
	change()
};
// https://stackoverflow.com/questions/8006715/drag-drop-files-into-standard-html-file-input
;['dragenter', 'dragover'].forEach(eventName => {
	dropContainer.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
	dropContainer.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
	dropContainer.classList.add('highlight')
}

function unhighlight(e) {
	dropContainer.classList.remove('highlight')
}
change = function(){
	var fileSvg = fileInput.files[0];
	var reader = new FileReader();
	reader.readAsText(fileSvg);
	reader.onload = function(){
		document.getElementById("svg_preview").innerHTML = reader.result;
		document.getElementById("svg_form").style.display = "block";
		playGround()
		exportResizedSvg()
	}
}

var playGround = function(){
	var resizeValue = document.getElementById("resize_value").value;
	if(resizeValue == null || resizeValue === "0" || resizeValue === "") return;
	document.getElementsByTagName("svg")[0].setAttribute("id","svg_resize");
	document.getElementsByTagName("svg")[0].setAttribute("width", resizeValue);
	document.getElementsByTagName("svg")[0].setAttribute("height", resizeValue);
	document.getElementById("download_wrapper").style.display = "block";
	var fileRename = fileInput.files[0].name.replace(".svg",".png")
	document.getElementById("data").setAttribute("download", fileRename);
}

// SVG to DATA URL Library

function exportResizedSvg() {
                var svg = document.getElementById("svg_resize");
				var img = document.getElementById("fromcanvas");
				svg.toDataURL("image/png", {
					callback: function(data) {
						img.setAttribute("src", data)
						var a = document.querySelector("#data")
						a.href = data
					}
				})
			}
