angular.module('dashboardApp')
.component('publishComponent', {
  templateUrl: './public/publish/publish.component.html',
  controller: ['$http', '$scope', 'FileUploader', PublishController]
});

function PublishController($http, $scope, FileUploader) {
  var self = this;
  self.form = {};
  self.uploader = new FileUploader({
    url: '/api/items/upload/'
  });
  self.uploadFile = function(img) {
    console.log(img);
  };

  self.sendForm = function() {
    $http({
      method: 'POST',
      url: '/api/items/publish/',
      data: self.form
    })
    .then(function(res) {
      console.log(res);
    });
  };
}
