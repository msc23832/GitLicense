angular.module('MyContact')


.controller('EditUserController',function($scope,$state, $stateParams, $cordovaDialogs, $http, ionicDatePicker,$filter,$ionicHistory,$cookieStore,$rootScope){
  $scope.form = {};
  $scope.txt_username = $stateParams.UserName;
  $scope.form.txt_fullname = $stateParams.UserFullname;
  $scope.form.txt_email = $stateParams.UserEmail;
  $scope.form.txt_phone = $stateParams.UserPhone;
  $scope.form.txt_genapplincese = ($stateParams.AppGen === '1') ? true : false;//($stateParams.PStatus);
  $scope.form.txt_genmalicense = ($stateParams.AppMa === '1') ? true : false;
  $scope.form.txt_typeadmin = ($stateParams.TypeAdmin === '1') ? true : false;

  $scope.btnBack = function(){
    $ionicHistory.goBack();
    //$state.go('User');
  }

  $scope.btnEDIT = function(){

      $cordovaDialogs.confirm('Do You Want Edit Data : '+ $scope.form.txt_fullname +'?', 'Warning!!', ['OK','CANCEL'])
        .then(function(buttonIndex) {
          // no button = 0, 'OK' = 1, 'Cancel' = 2
          if(buttonIndex == 1){
              console.log('OK');
             $http(
                {
                  url:($rootScope.url+'Edit_User.php'),
                  method:'POST',
                  data:{
                    'var_userid':$stateParams.UserID,
                    'var_fullname':$scope.form.txt_fullname,
                    'var_email':$scope.form.txt_email,
                    'var_phone':$scope.form.txt_phone,
                    'var_genapplicense':$scope.form.txt_genapplincese,
                    'var_genmalicense':$scope.form.txt_genmalicense,
                    'var_typeadmin':$scope.form.txt_typeadmin
                  }
                }
                ).then(function(response){
                console.log(response.data.results);
                if(response.data.results == 'duplicate_edit'){
                    $cordovaDialogs.alert('Please Check Username Or Email', 'Username Or Email Duplicate!!', 'DONE')
                        .then(function() {
                          // callback success
                        });
                 }else{

                    if(response.data.results == 'success_edit'){
                      console.log('success');
                      $state.go('tabs.User');
                      //window.location.reload();
                    }
                 }

              },function(error){
                $cordovaDialogs.alert(error, 'ERROR!!', 'DONE')
                        .then(function() {
                          // callback success
                        });
              });
         } else {
           console.log('Cancel');
         }
     });

  }
})
