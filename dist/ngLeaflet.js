angular.module("ng-leaflet",[]);
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
(function(){
    'use strict';

    angular.module('ng-leaflet').directive('ngLeafletMarker',ngLeafletMarker);

    ngLeafletMarker.$inject = ['$leafletHelper','$leafletMarker', '$leafletMarkerData'];

    function ngLeafletMarker($leafletHelper, $leafletMarker, $leafletMarkerData){
        return {
            require : '^^ngLeafletMap',
            restrict : 'E',
            scope :{
                ngConfigMarker : "=",
                markers : "="
            },
            link :_link
        }

        function _link(scope, element, attrs, mapController){
            
            if($leafletHelper.isDefined(scope.ngConfigMarker)){
                scope.ngConfigMarker.clickable = $leafletHelper.isDefined(scope.ngConfigMarker.clickable) ? scope.ngConfigMarker.clickable : false;
                scope.ngConfigMarker.draggable = $leafletHelper.isDefined(scope.ngConfigMarker.draggable) ? scope.ngConfigMarker.draggable : false;
                scope.ngConfigMarker.limit = $leafletHelper.isDefined(scope.ngConfigMarker.limit) ? scope.ngConfigMarker.limit: 23;
                scope.markers = $leafletHelper.isDefined(scope.markers) ? scope.markers: [];
            }
            
            var map = mapController.map;
            
            scope.markers.forEach(function(marker) {
                mapController.addMarker(marker);   
            });

            if (scope.ngConfigMarker.clickable){
                map.on('click',function(e){
                    if (scope.markers.length  >= scope.ngConfigMarker.limit){
                        alert('Limite de marcadores atingidos')
                    }
                    else{
                        var marker = $leafletMarker.createMarker(e.latlng.lat, e.latlng.lng, scope.ngConfigMarker.draggable);
                        scope.markers.push(marker);
                        $leafletMarkerData.registerMarker(marker);
                        mapController.addMarker(marker);
                        marker.on('contextmenu',function(e){
                            marker.remove();
                        });
                    }
                    
                });
            }
        }
    }
})();
(function(){
    'use strict';

    angular.module('ng-leaflet').directive('ngLeafletPolyline',ngLeafletPolyline);

    ngLeafletPolyline.$inject = ['$leafletHelper'];

    function ngLeafletPolyline($leafletHelper){
        return {
            require : '^^ngLeafletMap',
            restrict : 'E',
            scope : {
                ngPath : '='
            },
            link : _link
        }

        function _link(scope, element, attrs, mapController){
            if($leafletHelper.isDefined(scope.ngPath)){
                mapController.addPolyline(scope.ngPath);
            };
        }
    }
})();
(function(){
    'use strict';

    angular.module('ng-leaflet').factory('$leafletMarker',$leafletMarker);

    function $leafletMarker(){
        return{
            createMarker : function(latitude, longitude, draggable){
                return L.marker([latitude, longitude], {draggable : draggable});
            }
        }
    }
})();
(function(){
    'use strict';

    angular.module('ng-leaflet').factory("$leafletOptionsDefault",$leafletOptionsDefault);

    $leafletOptionsDefault.$inject = ['$leafletHelper'];

    function $leafletOptionsDefault($leafletHelper){

        return {
            getOptionsDefault : function(){
                return _getDefaults();        
            },
            setDefaults : function(customOptions){
                var newOptions = _getDefaults();
                if ($leafletHelper.isDefined(customOptions)){
                    newOptions.keyboard = $leafletHelper.isDefined(customOptions.keyboard) ? customOptions.keyboard : newOptions.keyboard;
                    newOptions.dragging = $leafletHelper.isDefined(customOptions.dragging) ? customOptions.dragging : newOptions.dragging;
                    newOptions.zoomControl = $leafletHelper.isDefined(customOptions.zoomControl) ? customOptions.zoomControl : newOptions.zoomControl;
                    newOptions.tileLayer = $leafletHelper.isDefined(customOptions.tileLayer) ? customOptions.tileLayer : newOptions.tileLayer;
                }
                
                return newOptions;
            }

        }

        function _getDefaults(){
            return {
                    keyboard : true,
                    dragging : true,
                    zoomControl : true,
                    tileLayer : 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    tileLayerOptions : {
                        attribution : 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    }
            }
        }
    }    
        
})();
(function(){
    'use strict';
    angular.module('ng-leaflet').service('$leafletConfig',$leafletConfig);

    $leafletConfig.$inject = ['$leafletHelper'];

    function $leafletConfig($leafletHelper){
        var self = this;
        self.setConfigurations = _setConfigurations;


        function _definePosition(config, map){
            if ($leafletHelper.isDefined(config.center)){
                var latitude = $leafletHelper.isDefined(config.center.lat) ? config.center.lat : -3.71839;
                var longitude = $leafletHelper.isDefined(config.center.lgt) ? config.center.lgt : -38.5434; 
                var zoom = $leafletHelper.isDefined(config.center.zoom) ? config.center.zoom : 9;
                map.setView([latitude, longitude], zoom);
            }
            _setGeoLocate(config, map);
        }

        function _defineZoomControlPosition(config, map){
            if($leafletHelper.isDefined(config.zoomControlPosition)){
                map.zoomControl.setPosition(config.zoomControlPosition);
            };
        }

        function _setConfigurations(attrs, config, element, map){
            _updateSize(attrs,element);
            _definePosition(config, map);
            _defineZoomControlPosition(config, map);
        }

        function _setGeoLocate(config, map){
            if(config.geoLocate)
                map.locate({setView : true});
        }

        function _updateSize(attrs, element){
            if($leafletHelper.isDefined(attrs.width)){
                var width = isNaN(attrs.width) ? attrs.width : attrs.width + 'px';
                element.css('width',width);
            }
                
            if($leafletHelper.isDefined(attrs.height)){
                var height = isNaN(attrs.height) ? attrs.height : attrs.height + 'px';
                element.css('height',height);
            }   
        }


    };
})();
(function(){
    'use strict';
    angular.module('ng-leaflet').service('$leafletHelper',$leafletHelper);

    function $leafletHelper(){
        var self = this;
        self.isDefined = function(value){
            return angular.isDefined(value) && value !== null;
        }
    }
})();
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

        function _removeMarker(){
            
        }
    }
})();