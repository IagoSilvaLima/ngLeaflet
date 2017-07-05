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

            scope.$watch('ngPath',function(newValue, oldValue){
                if(newValue != oldValue){
                    mapController.removePolyline();    
                    mapController.addPolyline(newValue);
                }       
            });
        }
    }
})();