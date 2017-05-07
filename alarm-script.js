var app = angular.module('myAlarmApp', []);
app.controller('myAlarmController', function($scope,$interval) {
    $scope.days = ["Sunday","Monday",,"Tuesday","Wednesday","Thursday","Friday","Saturday"];
	$scope.times = [];
	$scope.selectedTimes = {
		"Sunday":[],
		"Monday": [],
		"Tuesday":[],
		"Wednesday":[],
		"Thursday":[],
		"Friday":[],
		"Saturday":[]
	};
	
	var timer = $interval(function(){
		timeNow();
		var t = $scope.currentTime.split(':');
		var hr = null;
		if(t[0] >= 12){
			hr = t[0] - 12;
		} else {
			hr = t[0];
		}
		var ty = '0'+hr+':'+t[1];
		if(hr > 10){
			ty = hr+':'+t[1]; 
		}
		var list = JSON.parse(localStorage.getItem('Alarms'));
		angular.forEach(list[getDay()], function(time, index){
			if(ty === time){
				alert("The alarm for the day is fired at: given"+time);
			 }
		  });
	},8000);
	
	function getDay(){
		var today = moment();
		return today.format("dddd");
	}
	
	function timeNow() {
		var d = new Date(),
		h = (d.getHours()<10?'0':'') + d.getHours(),
		m = (d.getMinutes()<10?'0':'') + d.getMinutes(),
		a = (h < 12? 'AM':'PM');
		$scope.currentTime = h + ':' + m + a ;
	}	

	$scope.fullTime = function() {
		var x = 1;  
		var tt = 0; 
		var ap = ['AM', 'PM']; 

	for (var i=0;tt<24*60; i++) {
		var hh = Math.floor(tt/60); 
		var mm = (tt%60); 
		$scope.times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)];
		tt = tt + x;
	}
		
}
   $scope.addAlarm = function(selectedDay, selectedTime){
	 if (selectedDay !== "" && selectedTime === undefined){
			$scope.msg = 'Please Select Day and Time for the Alarm Please'
			return;
	 } 
	 $scope.msg = ""; 		
     $scope.selectedTimes[selectedDay].push(selectedTime);
	 localStorage.setItem('Alarms',JSON.stringify($scope.selectedTimes));
   }

	$scope.deleteAlarm = function(selectedDay, selectedTime){
	if (selectedDay !== "" && selectedTime === undefined){
			$scope.msg1 = 'Please Select Day and Time for the Alarm Please'
			return;
	 }
	$scope.msg1 = ""; 		 
	angular.forEach($scope.selectedTimes[selectedDay], function(time, index){
			if(time === selectedTime){
				$scope.selectedTimes[selectedDay].splice(index,1);
			}
		});
	 localStorage.setItem('Alarms',JSON.stringify($scope.selectedTimes));
   }
   
   window.onbeforeunload = function(){
		localStorage.setItem('Alarms',JSON.stringify($scope.selectedTimes));
   }
   
});