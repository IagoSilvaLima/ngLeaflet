(function(){
    'use strict';

    angular.module('ng-leaflet').service('$leafletMarkerData',$leafletMarkerData);

    $leafletMarkerData.$inject = ['$leafletHelper'];

    function $leafletMarkerData($leafletHelper){
        var self = this;
        self.markers = [];

        self.registerMarker = _registerMarker;
        self.removeMarker = _removeMarker;

        function _registerMarker(marker){
            self.markers.push(marker);
        }

        function _removeMarker(marker){
            
        }
    }
})();