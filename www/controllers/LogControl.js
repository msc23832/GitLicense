angular.module('MyContact')

.controller('LogController',function($scope,$state,$http,$cookieStore,$rootScope,$cordovaDialogs){

  $http.get($rootScope.url+'log_list.php').then(function(response){
        console.log(response);
        $scope.myDataArray = response.data.results;
      },function(error){
      console.log(error);

    });

  $scope.doRefresh = function() {
     // here refresh data code

     $http.get($rootScope.url+'log_list.php').then(function(response){
          console.log(response);
          $scope.myDataArray = response.data.results;
        },function(error){
        console.log(error);

      });
     $scope.$broadcast('scroll.refreshComplete');
     $scope.$apply()
  };

  $scope.btnDetail = function(data){
    $state.go('detailLog', {LoggroupName:data.loggroup_name,LogMessage:data.log_msg,UserFullname:data.user_fullname,LogTime:data.log_time});
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

  //$scope.btnUser = function(){
  //  $state.go('User');
  //}

})
