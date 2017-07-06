(function(){
    'use strict';

    angular.module('ng-leaflet').service('$leafletMarkerConvert', $leafletMarkerConvert);

    $leafletMarkerConvert.$inject =  ['$leafletMarker'];

    function $leafletMarkerConvert($leafletMarker){
        var self = this;

        self.createMarker = _createmarker;
        self.objectFromMarker = _objectFromMarker;

        function _createmarker(latitude, longitude, draggable){
            return $leafletMarker.createMarker(latitude, longitude, draggable);
        }

        function _objectFromMarker(marker){
            return {latitude : marker._latlng.lat, longitude : marker._latlng.lng};
        }
    }
})();