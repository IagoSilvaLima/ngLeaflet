(function(){
    'use strict';

    angular.module('ng-leaflet').service('$leafletMarkerData',$leafletMarkerData);

    $leafletMarkerData.$inject = ['$leafletHelper'];

    function $leafletMarkerData($leafletHelper){
        var self = this;
        var markers = [];

        self.getMarkers = _getMarkers;
        self.clearMarkers = _clearMarkers;
        self.registerMarker = _registerMarker;
        self.removeMarker = _removeMarker;

        function _registerMarker(marker){
            markers.push(marker);
        }

        function _removeMarker(marker){
            $leafletHelper.remove(markers, marker);
        }

        function _clearMarkers(){
            markers = [];
        }

        function _getMarkers(){
            return markers;
        }
    }
})();