angular.module('MyContact')

.controller('detailUserController',function($scope,$state, $stateParams, $cordovaDialogs, $http, $ionicHistory,$cookieStore,$rootScope){
  $scope.txtUserName = $stateParams.UserName;
  $scope.txtUserPass = $stateParams.UserPass;
  $scope.txtUserFullname = $stateParams.UserFullname;
  $scope.txtUserEmail = $stateParams.UserEmail;
  $scope.txtUserPhone = $stateParams.UserPhone;
  $scope.txtAppGen = $stateParams.AppGen;
  $scope.txtAppMa = $stateParams.AppMa;
  $scope.txtTypeAdmin = $stateParams.TypeAdmin;

  $scope.btnBack = function(){
    //$ionicHistory.goBack();
    $state.go('tabs.User');
  }

  $scope.btnEDIT = function(){
    if($rootScope.typeadmin == '1'){
      $state.go('EditUser', {UserID:$stateParams.UserID,UserName:$stateParams.UserName,UserPass:$stateParams.UserPass,UserFullname:$stateParams.UserFullname,UserEmail:$stateParams.UserEmail,UserPhone:$stateParams.UserPhone,AppGen:$stateParams.AppGen,AppMa:$stateParams.AppMa,TypeAdmin:$stateParams.TypeAdmin});
    }else{
      $cordovaDialogs.alert('Please Check Permission TypeAdmin', 'Permission Denied!!', 'DONE')
                .then(function() {
                  // callback success
                });
    }
  }

  $scope.btnPASS = function(){
    if($rootScope.typeadmin == '1'){
      $state.go('ChangePass', {UserID:$stateParams.UserID,UserPass:$stateParams.UserPass,UserFullname:$stateParams.UserFullname});
    }else{
      $cordovaDialogs.alert('Please Check Permission TypeAdmin', 'Permission Denied!!', 'DONE')
                .then(function() {
                  // callback success
                });
    }
  }

  $scope.btnDELETE = function(){
    if($rootScope.typeadmin == '1'){
        $cordovaDialogs.confirm('You want delete User : '+ $stateParams.UserID +'?', 'Warning!!', ['OK','CANCEL'])
        .then(function(buttonIndex) {
          // no button = 0, 'OK' = 1, 'Cancel' = 2
          if(buttonIndex == 1){
            console.log('OK');
             $http(
                {
                  url:($rootScope.url+'Delete_User.php'),
                  method:'POST',
                  data:{
                    'var_userid':$stateParams.UserID
                  }
                }
                ).then(function(response){
                console.log(response.data.results);
                if(response.data.results == 'success_delete'){
                  console.log('success');
                  $state.go('tabs.User');
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
       });

      }else{
        $cordovaDialogs.alert('Please Check Permission TypeAdmin', 'Permission Denied!!', 'DONE')
                .then(function() {
                  // callback success
                });
    }
  }
})
