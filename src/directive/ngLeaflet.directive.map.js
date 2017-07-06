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
                ngConfig : "="
            },
            controller :  ['$attrs','$element','$scope',_controller],
            link : _link,
            template : "<div><ng-transclude></ng-transclude></div>"
        };


        function _controller($attrs, $element, $scope){
            var self = this;
            self.options = $leafletOptionsDefault.setDefaults($scope.ngConfig.options);
            self.map =  L.map($element[0],self.options);
            var stops = L.layerGroup().addTo(self.map);
            var pathPolyline = L.layerGroup().addTo(self.map);

            self.addMarker = function(marker){
                stops.addLayer(marker);
            }

            self.addPolyline = function(path){
                var polyline = L.Polyline.fromEncoded(path);
                pathPolyline.addLayer(polyline);
            }

            self.removeMarker = function(marker){
                stops.removeLayer(marker);
            }

            self.clearMarkers = function(){
                stops.clearLayers();
            }

            self.removePolyline = function(){
                pathPolyline.clearLayers();
            }
        }

        function _link(scope, element, attrs, mapController){
            $leafletConfig.setConfigurations(attrs, scope.ngConfig, element, mapController.map);
            var tileLayer = L.tileLayer(mapController.options.tileLayer,mapController.options.tileLayerOptions)
            mapController.map.addLayer(tileLayer);
        }
    }    
})();