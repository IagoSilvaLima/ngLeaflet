(function(){
    'use strict';
    angular.module("ng-leaflet").directive("ngLeafletMap",ngLeafletMap);

    ngLeafletMap.$inject = ["$leafletConfig","$leafletHelper","$leafletOptionsDefault",];

    function ngLeafletMap($leafletConfig, $leafletHelper, $leafletOptionsDefault){
        return {
            restrict : "E",
            replace : true,
            transclude : true,
            scope:{
                ngConfig : "=",
                ngLeafletclick : "&"
            },
            controller : _controller,
            link : _link,
            template : "<div><ng-transclude></ng-transclude></div>"
        };

        _controller.$inject = ['$attrs','$element','$scope'];

        function _controller($attrs, $element, $scope){
            var self = this;
            self.options = $leafletOptionsDefault.setDefaults($scope.ngConfig.options);
            self.map = new L.Map($element[0],self.options);

            self.addMarker = function(marker){
                marker.addTo(self.map);
            }

            self.addPolyline = function(path){
                L.Polyline.fromEncoded(path).addTo(self.map);
            }
        }

        function _link(scope, element, attrs, mapController){
            $leafletConfig.setConfigurations(attrs, scope.ngConfig, element, mapController.map);
            var tileLayer = L.tileLayer(mapController.options.tileLayer,mapController.options.tileLayerOptions)
            mapController.map.addLayer(tileLayer);
        }
    }    
})();