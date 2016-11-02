angular.module('MyContact')

.controller('detailWorkStationsController',function($scope,$state, $stateParams, $cordovaDialogs, $ionicHistory,$cookieStore,$rootScope,$http){
  $scope.form = {};
  $scope.txtWSCode = $stateParams.WSCode;
  $scope.txtMacAdd = $stateParams.MacAdd;
  $scope.txtSDate = $stateParams.SDate;
  $scope.txtEDate = $stateParams.EDate;

  //$scope.txtKeyLicense = $stateParams.KeyLicense;
  $scope.form.txtKeyLicense = $stateParams.KeyLicense;
  $scope.txtPropName = $stateParams.PropertyName;


  $scope.btnBack = function(){
    //$ionicHistory.goBack();
    $state.go('tabs.WorkStations');
  }

  $scope.btnEDIT = function(){
    if($rootScope.genma == '1'){
      $state.go('EditWorkStation', {WSID:$stateParams.WSID,WSCode:$stateParams.WSCode,PropertyName:$stateParams.PropertyName,MacAdd:$stateParams.MacAdd,SDate:$stateParams.SDate,EDate:$stateParams.EDate});
    }else{
      $cordovaDialogs.alert('Please Check Permission Gen Ma', 'Permission Denied!!', 'DONE')
                .then(function() {
                  // callback success
                });
    }
  }

  $scope.btnDELETE = function(){
    if($rootScope.genma == '1'){
      $cordovaDialogs.confirm('You want delete Property : '+ $stateParams.PropertyCode +'?', 'Warning!!', ['OK','CANCEL'])
        .then(function(buttonIndex) {
          // no button = 0, 'OK' = 1, 'Cancel' = 2
          if(buttonIndex == 1){
            console.log('OK');
             $http(
                {
                  url:($rootScope.url+'Delete_Workstation.php'),
                  method:'POST',
                  data:{
                    'var_wsid':$stateParams.WSID
                  }
                }
                ).then(function(response){
                console.log(response.data.results);
                if(response.data.results == 'success_delete'){
                  console.log('success');
                  $state.go('tabs.WorkStation');
                }
              },function(error){
                $cordovaDialogs.alert(error, 'Warning!!', 'DONE')
                .then(function() {
                  // callback success
                });
              });
          }else{
            console.log('Cancel');
          }
      });
    }else{
      $cordovaDialogs.alert('Please Check Permission Gen Ma', 'Permission Denied!!', 'DONE')
                .then(function() {
                  // callback success
                });
    }
  }
})
