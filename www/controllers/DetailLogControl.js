angular.module('MyContact')

.controller('detailLogController',function($scope,$state, $stateParams, $ionicPopup, $ionicHistory){
  $scope.txtLoggroupName = $stateParams.LoggroupName;
  $scope.txtLogMsg = $stateParams.LogMessage;
  $scope.txtUserFullname = $stateParams.UserFullname;
  $scope.txtLogTime = $stateParams.LogTime;


  $scope.btnBack = function(){
    //$ionicHistory.goBack();
    $state.go('tabs.Log');
  }

})
