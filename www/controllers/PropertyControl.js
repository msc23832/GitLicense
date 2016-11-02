angular.module('MyContact')

.controller('PropertyController',function($scope,$state ,$stateParams,$http,$cookieStore,$rootScope,$cordovaDialogs){

  $http.get($rootScope.url+'swgenerate_list.php').then(function(response){
        console.log(response);
        $scope.myDataArray = response.data.results;
      },function(error){
      console.log(error);

    });

  $scope.doRefresh = function() {
     // here refresh data code

     $http.get($rootScope.url+'swgenerate_list.php').then(function(response){
          console.log(response);
          $scope.myDataArray = response.data.results;
        },function(error){
        console.log(error);

      });
     $scope.$broadcast('scroll.refreshComplete');
     $scope.$apply()
  };


  //$scope.myDataArray = [
  //  {
  //    Name : 'Sivach Charoensilawat',
  //    Nickname : 'First',
  //    Facebook : 'https://www.facebook.com/fiirstz',
  //    Mobile : '088-399-0044'
  //  },
  //  {
  //    Name : 'Punyawee Charoensilawat',
  //    Nickname : 'Yanee',
  //    Facebook : '...',
  //    Mobile : '089-739-9819'
  //  },
  //  {
  //    Name : 'Smith Charoensilawat',
  //    Nickname : 'Kaeow',
  //    Facebook : '...',
  //    Mobile : '081-896-3358'
  //  },
  //  {
  //    Name : 'Sumitra Charoensilawat',
  //    Nickname : 'Fame',
  //    Facebook : '...',
  //    Mobile : '086-961-7100'
  //  },
  //]

  $scope.btnDetail = function(data){
    $state.go('detailProperty', {PropertyID:data.PropertyID,PropertyCode:data.PropertyCode,PropertyName:data.PropertyName,WSamt:data.WSamt,OLamt:data.OLamt,PStatus:data.PStatus,SDate:data.SDate,EDate:data.EDate,KeyLicense:data.KeyLicense});
  }

  $scope.btnAdd = function(){
    if($rootScope.genapp == '1'){
      $state.go('AddProp');
    }else{
      $cordovaDialogs.alert('Please Check Permission Gen App', 'Permission Denied!!', 'DONE')
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

  //$scope.btnWS = function(){
  //  $state.go('WorkStations');
  //}

  //$scope.btnUser = function(){
  //  $state.go('User');
  //}

  //$scope.btnLog = function(){
 //   $state.go('Log');
  //}


})
