angular.module('MyContact')


.controller('ChangePassController',function($scope,$state, $stateParams, $cordovaDialogs, $http, ionicDatePicker,$filter,$ionicHistory,$cookieStore,$rootScope){
  $scope.form = {};

  $scope.btnBack = function(){
    $ionicHistory.goBack();
    //$state.go('User');
  }

  $scope.btnEDIT = function(){
    if($scope.form.txt_oldpassword == $stateParams.UserPass)
    {
       $cordovaDialogs.confirm('You want delete Property : '+ $stateParams.PropertyCode +'?', 'Warning!!', ['OK','CANCEL'])
        .then(function(buttonIndex) {
          // no button = 0, 'OK' = 1, 'Cancel' = 2
          if(buttonIndex == 1){
            console.log('OK');
           if($scope.form.txt_newpassword == $scope.form.txt_comfirmpass){

             $http(
                {
                  url: ($rootScope.url+'Change_Password.php'),
                  method:'POST',
                  data:{
                    'var_userid':$stateParams.UserID,
                    'var_password':$scope.form.txt_newpassword
                  }
                }
                ).then(function(response){
                console.log(response.data.results);
                if(response.data.results == 'success_edit'){
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
             $cordovaDialogs.alert('New Password Not Macth Confirm Password', 'Wrong Password!!', 'DONE')
                .then(function() {
                  // callback success
                });
           }
         } else {
           console.log('Cancel');
         }
       });


    }else{
      $cordovaDialogs.alert('Please Check Old Password', 'Wrong Old Password!!', 'DONE')
                .then(function() {
                  // callback success
                });
    }
  }
})
