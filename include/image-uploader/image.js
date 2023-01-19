// Create variables to store the selected options
let selectedType = "square";
let selectedHeight = 300;
let selectedWidth = 300;
let selectedWebcam = false;
let freeCrop = false;

// Function to resize and potentially crop an image
function getRoundedCanvas(sourceCanvas) {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    // Check if free crop is enabled
    if (freeCrop) {
        let width = sourceCanvas.width;
        let height = sourceCanvas.height;
        
        // Resize to max 500px height or width
        if(width > height) {
            width = 300;
            height = width * (sourceCanvas.height/sourceCanvas.width);
        } else {
            height = 300;
            width = height * (sourceCanvas.width/sourceCanvas.height);
        }
    } else {
        let width = selectedWidth;
        let height = selectedHeight;
    }

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    if (selectedType !== "circle") {
        return canvas;
    }

    context.beginPath();
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
}

// Function to create the modals and append them to the body
function createModals() {
    let camModal = document.createElement("div");
    camModal.id = "camModal";
    camModal.classList.add("modal", "fade");
    camModal.innerHTML = `<div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Camera Preview</h4>
            </div>
            <div class="modal-body">
                <div id="cam_container"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success capture_btn">Capture New</button>
                <button type="button" class="btn btn-warning browse_btn">Browse</button>
                <button type="button" class="btn btn-warning clear_btn">Clear Old</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>`;

    let cropModal = document.createElement("div");
    cropModal.id = "cropModal";
    cropModal.classList.add("modal", "fade");
   