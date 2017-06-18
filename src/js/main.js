var processStreetModule = angular.module('processStreet', []);

var COMPONENT_NAME = 'wistiaUpload';
var API_PASSWORD = '8b9e3867791383f0f1d90b088ae4ab0f20358c9ccc7866da048d98e09abd95d5';
var FILE_UPLOAD_INPUT_CLASS = '.file-upload';


function WistiaUploadController($element) {
    this._ngElement = $element;
    this.files = [];

    this._init();
}

WistiaUploadController.prototype._init = function() {
    this._ngElement.find(FILE_UPLOAD_INPUT_CLASS).fileupload({
        url: 'https://upload.wistia.com',
        formData: {
            api_password: API_PASSWORD,
        },
        dataType: 'json',
        done: this._handleNewFiles.bind(this)
    });
};

WistiaUploadController.prototype._handleNewFiles = function(uploadEvent, data) {
    this.files.push(data.result.name);
};

processStreetModule.component(COMPONENT_NAME, {
    controller: ['$element', WistiaUploadController],
    templateUrl: 'upload-template.html'
});