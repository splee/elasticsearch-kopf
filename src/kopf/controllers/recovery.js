kopf.controller('RecoveryController', ['$scope', 'ConfirmDialogService',
  'AlertService', 'ElasticService', 'AppState',
  function($scope, ConfirmDialogService, AlertService, ElasticService,
           AppState) {

    $scope.sortBy = 'index_name';
    $scope.reverse = false;

    $scope.setSortBy = function(field) {
      if ($scope.sortBy === field) {
        $scope.reverse = !$scope.reverse;
      }
      $scope.sortBy = field;
    };

    $scope.filter = AppState.getProperty(
        'RecoveryController',
        'filter',
        new NodeFilter('', true, true, true, 0)
    );

    $scope.recoveries = [];

    $scope.$watch('filter',
        function(newValue, oldValue) {
          $scope.refresh();
        },
        true);

    $scope.$watch(
        function() {
          return ElasticService.cluster;
        },
        function(newValue, oldValue) {
          $scope.refresh();
        }
    );

    $scope.refresh = function() {
      ElasticService.getShardRecoveries(
        function(recoveries) {
          $scope.recoveries = recoveries.filter(function(recovery) {
            return $scope.filter.matches(recovery);
          });
        },
        function(error) {
          AlertService.error('Error while loading recovering shards', error);
        }
      );
    };
  }
]);
