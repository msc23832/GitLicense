angular.module('MyContact')

.controller('UserController',function($scope,$state,$http,$cookieStore,$rootScope,$cordovaDialogs){

  $http.get($rootScope.url+'user_list.php').then(function(response){
        console.log(response);
        $scope.myDataArray = response.data.results;
      },function(error){
      console.log(error);

    });

  $scope.doRefresh = function() {
     // here refresh data code

     $http.get($rootScope.url+'user_list.php').then(function(response){
          console.log(response);
          $scope.myDataArray = response.data.results;
        },function(error){
        console.log(error);

      });
     $scope.$broadcast('scroll.refreshComplete');
     $scope.$apply()
  };

  $scope.btnDetail = function(data){
    $state.go('detailUser', {UserID:data.user_id,UserName:data.user_name,UserPass:data.user_pass,UserFullname:data.user_fullname,UserEmail:data.user_email,UserPhone:data.user_phone,AppGen:data.gen_app_license,AppMa:data.gen_ma_license,TypeAdmin:data.type_admin});
  }

  $scope.btnAdd = function(){
    if($rootScope.typeadmin == '1'){
      $state.go('AddUser');
    }else{
      $cordovaDialogs.alert('Please Check Permission TypeAdmin', 'Permission Denied!!', 'DONE')
                .then(function() {
                  // callback success
                });
    }
  }

  $scope.btnLogout = function(){
   $cordovaDialogs.confirm('Do You Want Sign Out?', 'Warning!!', ['OK','CANCEL'])
        .then(function(buttonIndex) {
          // no button = 0, 'OK' = 1, 'Cancel' = 2
          if(buttonIndex == 1){
            console.log('OK');
            $state.go('login');
            $cookieStore.remove('UserID');
          } else {
            console.log('Cancel');
         }
     });
  }

  //$scope.btnProp = function(){
  //  $state.go('Property');
  //}

  //$scope.btnWS = function(){
  //  $state.go('WorkStations');
  //}

  //$scope.btnLog = function(){
  //  $state.go('Log');
  //}

})
