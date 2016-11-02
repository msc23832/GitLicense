angular.module('MyContact')

.controller('detailPropertyController',function($scope,$state, $stateParams, $cordovaDialogs, $http,$ionicHistory,$cookieStore,$rootScope,$filter){
  $scope.form = {};
  $scope.txtPropCode = $stateParams.PropertyCode;
  $scope.txtPropName = $stateParams.PropertyName;
  $scope.txtWSamt = $stateParams.WSamt;
  $scope.txtOLamt = $stateParams.OLamt;
  $scope.txtPStatus = $stateParams.PStatus;
  $scope.txtSDate = $stateParams.SDate;
  $scope.txtEDate = $stateParams.EDate;

  $scope.form.txtKeyLicense = $stateParams.KeyLicense;
  $scope.isDisabled = false;

  $scope.btnBack = function(){
    //$ionicHistory.goBack();
    $state.go('tabs.Property');
  }

  $scope.btnEDIT = function(){
    if($rootScope.genapp == '1'){
        $state.go('EditProp', {PropertyID:$stateParams.PropertyID,PropertyCode:$stateParams.PropertyCode,PropertyName:$stateParams.PropertyName,WSamt:$stateParams.WSamt,OLamt:$stateParams.OLamt,PStatus:$stateParams.PStatus,SDate:$stateParams.SDate,EDate:$stateParams.EDate});
    }else{
      $cordovaDialogs.alert('Please Check Permission Gen App', 'Permission Denied!!', 'DONE')
                .then(function() {
                  // callback success
                });
    }
  }

  $scope.btnDELETE = function(){
    if($rootScope.genapp == '1'){

       $cordovaDialogs.confirm('You want delete Property : '+ $stateParams.PropertyCode +'?', 'Warning!!', ['OK','CANCEL'])
        .then(function(buttonIndex) {
          // no button = 0, 'OK' = 1, 'Cancel' = 2
          if(buttonIndex == 1){
            console.log('OK');
            $http(
              {
                url:($rootScope.url+'Delete_Property.php'),
                method:'POST',
                data:{
                  'var_propid':$stateParams.PropertyID
                }
              }
              ).then(function(response){
              console.log(response.data.results);
              if(response.data.results == 'success_delete'){
                console.log('success');
                $state.go('tabs.Property');
                //window.location.reload();
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
          var btnIndex = buttonIndex;
        });


    }else{
      $cordovaDialogs.alert('Please Check Permission Gen App', 'Permission Denied!!', 'DONE')
                .then(function() {
                  // callback success
                });
    }
  }
})
