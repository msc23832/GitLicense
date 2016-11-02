angular.module('MyContact')


.controller('EditWorkStationController',function($scope,$state, $stateParams, $cordovaDialogs, $http, ionicDatePicker,$filter,$ionicHistory,$cookieStore,$rootScope){
  $scope.form = {};
  $scope.form.txt_wscode = $stateParams.WSCode;
  $scope.form.someModel = $stateParams.PropertyName;
  $scope.form.txt_macadd = $stateParams.MacAdd;

  var dateStart = $stateParams.SDate;
  $scope.SDate = new Date(dateStart.replace(/-/g, '/'));

  var dateEnd = $stateParams.EDate;
  $scope.EDate = new Date(dateEnd.replace(/-/g, '/'));
  //$scope.SDate = new Date($stateParams.SDate);
  //$scope.EDate = new Date($stateParams.EDate);

  $scope.selectables = [];
  $http.get($rootScope.url+'swgenerate_list.php').then(function(response){
        console.log(response.data.results);
        $scope.selectables = response.data.results;
      },function(error){
      console.log(error);

    });

  $scope.search_properties = ['PropertyName'];

  $scope.getOption = function(option){
    return option.PropertyName;
  };


  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the SDate popup is : ' + val, new Date(val));
        $scope.SDate = new Date(val);

      },
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePickerOne = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

  var ipObj2 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the SDate popup is : ' + val, new Date(val));
          $scope.EDate = new Date(val);
      },
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2018, 11, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePickerTwo = function(){
      ionicDatePicker.openDatePicker(ipObj2);
    };

  $scope.btnBack = function(){
    $ionicHistory.goBack();
  }

  $scope.btnEDIT = function(){

    $cordovaDialogs.confirm('Do You Want Edit Data : '+ $scope.form.txt_wscode +'?', 'Warning!!', ['OK','CANCEL'])
        .then(function(buttonIndex) {
          // no button = 0, 'OK' = 1, 'Cancel' = 2
          if(buttonIndex == 1){
              console.log('OK');
             var datefilter = $filter('date'),
               formattedSDate = datefilter($scope.SDate, 'yyyy/MM/dd');
                  $scope.SDate = formattedSDate;
             var datefilter = $filter('date'),
               formattedEDate = datefilter($scope.EDate, 'yyyy/MM/dd');
                  $scope.EDate = formattedEDate;
           console.log($scope.SDate,$scope.EDate);

           if($scope.SDate < $scope.EDate)
           {
               $http(
                  {
                    url:($rootScope.url+'Edit_WorkStation.php'),
                    method:'POST',
                    data:{
                      'var_wsid':$stateParams.WSID,
                      'var_propname':$scope.form.someModel,
                      'var_wscode':$scope.form.txt_wscode,
                      'var_macadd':$scope.form.txt_macadd,
                      'var_sdate':$scope.SDate,
                      'var_edate':$scope.EDate
                    }
                  }
                  ).then(function(response){
                  console.log(response.data.results);

                   if(response.data.results == 'duplicate_insert'){
                      $cordovaDialogs.alert('Please Check WorkStationCode Or MacAddress', 'WorkStationCode Or MacAddress Duplicate!!', 'DONE')
                        .then(function() {
                          // callback success
                        });
                   }else{
                       if(response.data.results == 'success_edit'){
                          console.log('success');
                          $state.go('tabs.WorkStations');
                          //window.location.reload();
                        }
                   }
                },function(error){
                  $cordovaDialogs.alert(error, 'Warning!!', 'DONE')
                        .then(function() {
                          // callback success
                        });
                });
           }else{
             $cordovaDialogs.alert('Enddate is less than Startdate', 'Warning!!', 'DONE')
                        .then(function() {
                          // callback success
                        });
           }
         } else {
           console.log('Cancel');
         }
     });


  }
})
