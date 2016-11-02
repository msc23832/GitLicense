// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MyContact', ['ionic','ionic-datepicker', 'ionic-modal-select','ui.mask','ngCookies', 'ngRoute', 'ngCordova', 'ion-datetime-picker'])

.config(function($stateProvider,$urlRouterProvider){

  $stateProvider
    .state('tabs',{
    url:'/tabs',
    abstract:true,
    templateUrl:'templates/tabs.html'
  })


  //Property
  $stateProvider
    .state('tabs.Property',{
    url:'/Property',
    views:{
      'view_property':{
        cache:false,
        templateUrl:'templates/Property.html',
        controller:'PropertyController'
      }
    }

  })

  $stateProvider
    .state('detailProperty',{
    url:'/detailProperty:{PropertyID}/{PropertyCode}/{PropertyName}/{WSamt}/{OLamt}/{PStatus}/{SDate}/{EDate}/{KeyLicense}',
    cache:false,
    templateUrl:'templates/detailProperty.html',
    controller:'detailPropertyController'
  })

  $stateProvider
    .state('AddProp',{
    url:'/AddProp',
    cache:false,
    templateUrl:'templates/AddProperty.html',
    controller:'AddPropController'
  })

  $stateProvider
    .state('EditProp',{
    url:'/EditProp:{PropertyID}/{PropertyCode}/{PropertyName}/{WSamt}/{OLamt}/{PStatus}/{SDate}/{EDate}/{KeyLicense}',
    cache:false,
    templateUrl:'templates/EditProperty.html',
    controller:'EditPropController'
  })
  //Property




  //Login
  $stateProvider
    .state('login',{
    url:'/login',
    templateUrl:'templates/login.html',
    controller:'loginController'
  })
  //Login




  //WorkStations
  $stateProvider
    .state('tabs.WorkStations',{
    url:'/WorkStations',
    views:{
      'view_workstation':{
        cache:false,
        templateUrl:'templates/WorkStations.html',
        controller:'WorkStationsController'
      }
    }
  })

  $stateProvider
    .state('detailWorkStations',{
    url:'/detailWorkStations:{WSID}/{WSCode}/{PropertyName}/{MacAdd}/{SDate}/{EDate}/{KeyLicense}',
    cache:false,
    templateUrl:'templates/detailWorkStations.html',
    controller:'detailWorkStationsController'
  })

  $stateProvider
    .state('AddWorkStation',{
    url:'/AddWorkStation',
    cache:false,
    templateUrl:'templates/AddWorkStation.html',
    controller:'AddWorkStationController'
  })

  $stateProvider
    .state('EditWorkStation',{
    url:'/EditWorkStation:{WSID}/{WSCode}/{PropertyName}/{MacAdd}/{SDate}/{EDate}',
    cache:false,
    templateUrl:'templates/EditWorkStation.html',
    controller:'EditWorkStationController'
  })
  //WotkStation




  //Log
  $stateProvider
    .state('tabs.Log',{
    url:'/Log',
    views:{
      'view_log':{
        cache:false,
        templateUrl:'templates/Log.html',
        controller:'LogController'
      }
    }
  })

  $stateProvider
    .state('detailLog',{
    url:'/detailLog:{LoggroupName}/{LogMessage}/{UserFullname}/{LogTime}',
    cache:false,
    templateUrl:'templates/detailLog.html',
    controller:'detailLogController'
  })
  //Log




  //User
  $stateProvider
    .state('tabs.User',{
    url:'/User',
    views:{
      'view_user':{
        cache:false,
        templateUrl:'templates/User.html',
        controller:'UserController'
      }
    }
  })

  $stateProvider
    .state('detailUser',{
    url:'/detailUser:{UserID}/{UserName}/{UserPass}/{UserFullname}/{UserEmail}/{UserPhone}/{AppGen}/{AppMa}/{TypeAdmin}',
    cache:false,
    templateUrl:'templates/detailUser.html',
    controller:'detailUserController'
  })

  $stateProvider
    .state('AddUser',{
    url:'/AddUser',
    cache:false,
    templateUrl:'templates/AddUser.html',
    controller:'AddUserController'
  })

  $stateProvider
    .state('EditUser',{
    url:'/EditUser:{UserID}/{UserName}/{UserPass}/{UserFullname}/{UserEmail}/{UserPhone}/{AppGen}/{AppMa}/{TypeAdmin}',
    cache:false,
    templateUrl:'templates/EditUser.html',
    controller:'EditUserController'
  })

  $stateProvider
    .state('ChangePass',{
    url:'/ChangePass:{UserID}/{UserPass}/{UserFullname}',
    cache:false,
    templateUrl:'templates/ChangePass.html',
    controller:'ChangePassController'
  })
  //User

  $urlRouterProvider.otherwise('/login')
})
