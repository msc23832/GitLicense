angular.module('MyContact')

.controller('loginController',function($scope,$state,$http,$cookieStore,$cordovaDialogs,$rootScope){

  $rootScope.url = "http://ioapp.6te.net/webservice/";
  //$rootScope.url = "http://localhost/sample_website/webservice/";

  $scope.form = {};

  $scope.btnLogin = function(){

    $http(
      {
        url: ($rootScope.url+'user_service.php'),
        method:'POST',
        data:{

          'var_username':$scope.form.txt_user,
          'var_password':$scope.form.txt_password
        }
      }
      ).then(function(response){

      if(response.data.results != 'error_login'){
        //$scope.myDataArray = response.data.results;

        var obj = response.data.results;
        var name = obj.find(x => x.user_name == $scope.form.txt_user);

        $cookieStore.put("UserID", name.user_id);
        $rootScope.genapp = name.gen_app_license;
        $rootScope.genma = name.gen_ma_license;
        $rootScope.typeadmin = name.type_admin;
        console.log($cookieStore.get('UserID'));

          $http(
          {
            url: ($rootScope.url+'insert_log.php'),
            method:'POST',
            data:{
              'var_user':name.user_id,
              'var_userfullname':name.user_fullname
            }
          }
          ).then(function(response){

          },function(error){
              $cordovaDialogs.alert('Insert Log Unsuccess', 'Warning!!', 'DONE')
                .then(function() {
                  // callback success
                });
          });

        $state.go('tabs.Property');

      }
    },function(error){
      $cordovaDialogs.alert('Please Check Username and Password', 'Warning!!', 'DONE')
                .then(function() {
                  // callback success
                });


      console.log(error);
      console.log($rootScope.url);
    });
  };


})
