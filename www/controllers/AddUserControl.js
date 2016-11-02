angular.module('MyContact')


.controller('AddUserController',function($scope,$state, $stateParams, $cordovaDialogs, $http, ionicDatePicker,$filter,$ionicHistory,$cookieStore,$rootScope){
  $scope.form = {};

  $scope.btnBack = function(){
    $ionicHistory.goBack();
    //$state.go('User');
  }

  $scope.btnADD = function(){

    $cordovaDialogs.confirm('Do You Want Add Data : '+ $scope.form.txt_fullname +'?', 'Warning!!', ['OK','CANCEL'])
        .then(function(buttonIndex) {
          // no button = 0, 'OK' = 1, 'Cancel' = 2
          if(buttonIndex == 1){
            console.log('OK');
             if($scope.form.txt_password == $scope.form.txt_conpassword){
               $http(
                  {
                    url: ($rootScope.url+'Add_User.php'),
                    method:'POST',
                    data:{
                      'var_username':$scope.form.txt_username,
                      'var_password':$scope.form.txt_password,
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

                   if(response.data.results == 'duplicate_insert'){

                     $cordovaDialogs.alert('Please Check Username Or Email', 'Username Or Email Duplicate!!', 'DONE')
                        .then(function() {
                          // callback success
                        });

                   }else{
                     if(response.data.results == 'success_insert'){
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
             }
       } else {
         console.log('Cancel');
       }
     });

  }
})
