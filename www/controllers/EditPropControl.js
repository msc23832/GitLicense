angular.module('MyContact')


.controller('EditPropController',function($scope,$state, $stateParams, $cordovaDialogs, $http, ionicDatePicker,$filter,$ionicHistory,$cookieStore,$rootScope){
  $scope.form = {};
  $scope.form.txt_propcode = $stateParams.PropertyCode;
  $scope.form.txt_propname = $stateParams.PropertyName;
  $scope.form.txt_wsamt = parseInt($stateParams.WSamt);
  $scope.form.txt_olamt = parseInt($stateParams.OLamt);
  $scope.form.txt_pstatus = ($stateParams.PStatus === '1') ? true : false;//($stateParams.PStatus);

  var dateStart = $stateParams.SDate;
  $scope.SDate = new Date(dateStart.replace(/-/g, '/'));

  var dateEnd = $stateParams.EDate;
  $scope.EDate = new Date(dateEnd.replace(/-/g, '/'));


  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the SDate popup is : ' + val, new Date(val));
        $scope.SDate = new Date(val);

      },
      inputDate: $scope.SDate,      //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

  $scope.openDatePickerOne = function(){
    //$scope.SDate = $scope.form.dateValue;
    //$scope.SDate = $scope.form.dateValue;
    ionicDatePicker.openDatePicker(ipObj1);
  };

  var ipObj2 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the SDate popup is : ' + val, new Date(val));
          $scope.EDate = new Date(val);
      },
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 11, 31), //Optional
      inputDate: new Date(),      //Optional
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

     $cordovaDialogs.confirm('Do You Want Edit Data : '+ $scope.form.txt_propcode +'?', 'Warning!!', ['OK','CANCEL'])
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
                          url:($rootScope.url+'Edit_Property.php'),
                          method:'POST',
                          data:{
                            'var_propid':$stateParams.PropertyID,
                            'var_propcode':$scope.form.txt_propcode,
                            'var_propname':$scope.form.txt_propname,
                            'var_wsamt':$scope.form.txt_wsamt,
                            'var_olamt':$scope.form.txt_olamt,
                            'var_pstatus':$scope.form.txt_pstatus,
                            'var_sdate':$scope.SDate,
                            'var_edate':$scope.EDate,
                            'var_user':$cookieStore.get('UserID')
                          }
                        }
                        ).then(function(response){
                          console.log(response.data.results);

                          if(response.data.results == 'duplicate_edit'){
                            $cordovaDialogs.alert('Please Check PropertyCode', 'PropertyCode Duplicate!!', 'DONE')
                              .then(function() {
                                // callback success
                              });

                          }else{
                            if(response.data.results == 'success_edit'){
                              console.log('success');
                              $state.go('tabs.Property');
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
