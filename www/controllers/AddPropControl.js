angular.module('MyContact')


.controller('AddPropController',function($scope,$state, $stateParams, $cordovaDialogs, $http, ionicDatePicker,$filter,$ionicHistory,$cookieStore,$rootScope){
  $scope.form = {};

  $scope.SDate = new Date();
  $scope.EDate = new Date();


  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the SDate popup is : ' + val, new Date(val));
        $scope.SDate = new Date(val);

      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
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
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
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
    //$state.go('Property');
  }

  $scope.btnADD = function(){

    $cordovaDialogs.confirm('Do You Want Add Data : '+ $scope.form.txt_propcode +'?', 'Warning!!', ['OK','CANCEL'])
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
                url: ($rootScope.url+'Add_Property.php'),
                method:'POST',
                data:{
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
                if(response.data.results == 'duplicate_insert'){
                  $cordovaDialogs.alert('Please Check PropertyCode', 'PropertyCode Duplicate!!', 'DONE')
                    .then(function() {
                      // callback success
                    });

                }else{
                  if(response.data.results == 'success_insert'){
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
