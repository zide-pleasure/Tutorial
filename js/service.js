var myservices = angular.module('myservices', []);
//==============================================首页轮播图begin===================================================						
myservices.service('myBanner', ['$http', '$q', function($http, $q) {
			var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var phoneType=0;
            if (bIsIpad || bIsIphoneOs ) {
				phoneType=1;
            } else if(bIsAndroid){
				phoneType=2;
            }
	return {
		getData: function() {
//			console.log("轮播图："+$rootScope.phoneType);
			var deferred = $q.defer();
			var page = '1';
			var promise = $http({
				url:'http://42.62.53.158:8080/shop/api/' + 'system/banner/list',
				method: 'GET',
				params: {
					device:1
				}
			}).success(function(data, header, config, status) {
				console.log("首页轮播图返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("首页轮播图返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					//在这里可以对返回的数据集做一定的处理,再交由controller进行处理
					answer.status = true;
					deferred.resolve(answer);
				},
				// 通讯失败的处理
				function(error) {
					// 可以先对失败的数据集做处理，再交由controller进行处理
					error.status = false;
					deferred.reject(error);
				});
			//返回promise对象，交由controller继续处理成功、失败的业务回调
			return deferred.promise;
		}
	}
}]);
//==============================================首页轮播图end===================================================


//==============================================首页最新揭晓begin===================================================						
myservices.service('myNewgoods', ['$http', '$q', function($http, $q) {
	return {
		getData: function() {
//			console.log("轮播图："+$rootScope.phoneType);
			var deferred = $q.defer();
//			var page = '1';
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/' + 'index/open/record/list',
				method: 'POST',
				params: {
//					page:1
				}
			}).success(function(data, header, config, status) {
				console.log("首页最新揭晓返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("首页最新揭晓返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					//在这里可以对返回的数据集做一定的处理,再交由controller进行处理
					answer.status = true;
					deferred.resolve(answer);
				},
				// 通讯失败的处理
				function(error) {
					// 可以先对失败的数据集做处理，再交由controller进行处理
					error.status = false;
					deferred.reject(error);
				});
			//返回promise对象，交由controller继续处理成功、失败的业务回调
			return deferred.promise;
		}
	}
}]);
//==============================================首页最新揭晓end===================================================


//==============================================首页最热数据接口begin===================================================						
myservices.service('myHot', ['$http', '$q', function($http, $q) {
	return {
		getData: function() {
			var deferred = $q.defer();
//			var page = '1';
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/'  + 'index/list',
				method: 'POST',
				params: {
					field: 'hot',
//					categoryId: 0,
//					page: 1
				}
			}).success(function(data, header, config, status) {
				console.log("首页最热返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("首页最热返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					//在这里可以对返回的数据集做一定的处理,再交由controller进行处理
					answer.status = true;
					deferred.resolve(answer);
				},
				// 通讯失败的处理
				function(error) {
					// 可以先对失败的数据集做处理，再交由controller进行处理
					error.status = false;
					deferred.reject(error);
				});
			//返回promise对象，交由controller继续处理成功、失败的业务回调
			return deferred.promise;
		}
	}
}]);
//==============================================首页最热数据接口end===================================================

//==============================================首页最新数据接口begin===================================================						
myservices.service('myNews', ['$http', '$q', function($http, $q) {
	return {
		getData: function() {
			var deferred = $q.defer();
			var page = '1';
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/'  + 'index/list',
				method: 'POST',
				params: {
					field: 'newst',
//					categoryId: 0,
//					page: 1
				}
			}).success(function(data, header, config, status) {
				console.log("首页最新返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("首页最新返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					//在这里可以对返回的数据集做一定的处理,再交由controller进行处理
					answer.status = true;
					deferred.resolve(answer);
				},
				// 通讯失败的处理
				function(error) {
					// 可以先对失败的数据集做处理，再交由controller进行处理
					error.status = false;
					deferred.reject(error);
				});
			//返回promise对象，交由controller继续处理成功、失败的业务回调
			return deferred.promise;
		}
	}
}]);
//==============================================首页最新数据接口end===================================================

//==============================================首页最快数据接口begin===================================================						
myservices.service('myFast', ['$http', '$q', function($http, $q) {
	return {
		getData: function() {
			var deferred = $q.defer();
			var page = '1';
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/'  + 'index/list',
				method: 'POST',
				params: {
					field: 'fast',
//					categoryId: 0,
//					page: 1
				}
			}).success(function(data, header, config, status) {
				console.log("首页最快返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("首页最快返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					//在这里可以对返回的数据集做一定的处理,再交由controller进行处理
					answer.status = true;
					deferred.resolve(answer);
				},
				// 通讯失败的处理
				function(error) {
					// 可以先对失败的数据集做处理，再交由controller进行处理
					error.status = false;
					deferred.reject(error);
				});
			//返回promise对象，交由controller继续处理成功、失败的业务回调
			return deferred.promise;
		}
	}
}]);
//==============================================首页最快数据接口end===================================================


//==============================================查询页面商品数据接口begin===================================================						
myservices.service('mySearch', ['$http', '$q', function($http, $q) {
	return {
		getData: function() {
			var deferred = $q.defer();
			var page = '1';
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/'  + 'goods/list',
				method: 'POST',
				params: {
					categoryId: "",
					name: 0,
					page: 1
				}
			}).success(function(data, header, config, status) {
				console.log("查询页面返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("查询页面返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					//在这里可以对返回的数据集做一定的处理,再交由controller进行处理
					answer.status = true;
					deferred.resolve(answer);
				},
				// 通讯失败的处理
				function(error) {
					// 可以先对失败的数据集做处理，再交由controller进行处理
					error.status = false;
					deferred.reject(error);
				});
			//返回promise对象，交由controller继续处理成功、失败的业务回调
			return deferred.promise;
		}
	}
}]);
//==============================================查询页面商品数据接口end===================================================

//==============================================最新揭晓页面begin===================================================						
myservices.service('myNewMore', ['$http', '$q', function($http, $q) {
	return {
		getData: function() {
//			console.log("轮播图："+$rootScope.phoneType);
			var deferred = $q.defer();
//			var page = '1';
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/'  + 'goods/open/record/list',
				method: 'POST',
				params: {
					page:1
				}
			}).success(function(data, header, config, status) {
				console.log("首页最新揭晓返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("首页最新揭晓返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					//在这里可以对返回的数据集做一定的处理,再交由controller进行处理
					answer.status = true;
					deferred.resolve(answer);
				},
				// 通讯失败的处理
				function(error) {
					// 可以先对失败的数据集做处理，再交由controller进行处理
					error.status = false;
					deferred.reject(error);
				});
			//返回promise对象，交由controller继续处理成功、失败的业务回调
			return deferred.promise;
		}
	}
}]);
//==============================================最新揭晓页面end===================================================

//==============================================商品列表详情数据接口begin===================================================						
myservices.service('myGoodsDetail', ['$http', '$q', function($http, $q) {
	return {
		getData: function() {
			var deferred = $q.defer();
//			var page = '1';
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/'  + 'goods/detail',
				method: 'POST',
				params: {
					goodsId: $rootScope.goodsIds
				}
			}).success(function(data, header, config, status) {
				console.log("图文详情返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("图文详情返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					//在这里可以对返回的数据集做一定的处理,再交由controller进行处理
					answer.status = true;
					deferred.resolve(answer);
				},
				// 通讯失败的处理
				function(error) {
					// 可以先对失败的数据集做处理，再交由controller进行处理
					error.status = false;
					deferred.reject(error);
				});
			//返回promise对象，交由controller继续处理成功、失败的业务回调
			return deferred.promise;
		}
	}
}]);
//==============================================商品列表详情数据接口end===================================================

//==============================================往期揭晓数据接口begin===================================================						
myservices.service('myPastcount', ['$http', '$q', function($http, $q) {
	return {
		getData: function() {
			var deferred = $q.defer();
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/'  + 'goods/open/record/list',
				method: 'POST',
				params: {
					page:'1',
					goodsReleaseId: $rootScope.goodsIds
				}
			}).success(function(data, header, config, status) {
				console.log("往期揭晓返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("往期揭晓返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					console.log("返回成功---");
					//在这里可以对返回的数据集做一定的处理,再交由controller进行处理
					answer.status = true;
					deferred.resolve(answer);
				},
				// 通讯失败的处理
				function(error) {
					console.log("返回失败---");
					// 可以先对失败的数据集做处理，再交由controller进行处理
					error.status = false;
					deferred.reject(error);
				});
			//返回promise对象，交由controller继续处理成功、失败的业务回调
			return deferred.promise;
		}
	}
}]);
//==============================================往期揭晓数据接口end===================================================





//==============================================今日热门数据接口begin===================================================	
//myservices.directive('ngScroll', function() {
//	return {
//		replace: false,
//		restrict: 'A',
//		link: function(scope, element, attr) {
//			scope.$watch(attr.ngScroll, function(value) {
//				new iScroll(document.querySelector('#wrapper'), {
//					snap: true,
//					momentum: true,
//					hScrollbar: true
//				});
//			});
//		}
//	};
//});

//myservices.service('mytime', ['$rootScope','$http', '$q', '$interval',function($rootScope,$http, $q, $interval) {
//	return {
//		getData: function(showtime) {
//			var deferred = $q.defer();
//			var promise = $interval(function() {
//				console.log("进入timer");
//				if (hour > 0) {
//					if (minute > 0) {
//						if (second > 0) {
//							second = second - 1;
//						} else {
//							minute = minute - 1;
//							second = 59;
//						}
//					} else {
//						if (second > 0) {
//							second = second - 1;
//						} else {
//							hour = hour - 1;
//							minute = 60;
//						}
//					}
//				} else {
//					if (minute > 0) {
//						if (second > 0) {
//							second = second - 1;
//						} else {
//							minute = minute - 1;
//							second = 59;
//						}
//					} else {
//						if (second > 0) {
//							second = second - 1;
//						}
//					}
//				}
//
//			}, 1000, stopto);
//			promise.then(success, error, notify);
//
//			function success() {
//				console.log("执行成功");
//			}
//
//			function error() {
//				console.log("执行失败");
//			}
//
//			function notify() {
//				console.log("进入notify");
//				if ((hour < 10) && (minute >= 10) && (second >= 10)) {
//					console.log("0" + hour + ":" + minute + ":" + second);
//					var showtime = "0" + hour + ":" + minute + ":" + second;
//				}
//				if ((hour < 10) && (minute < 10) && (second >= 10)) {
//					console.log("0" + hour + ":0" + minute + ":" + second);
//					var showtime = "0" + hour + ":0" + minute + ":" + second;
//				}
//				if ((hour < 10) && (minute < 10) && (second < 10)) {
//					console.log("0" + hour + ":0" + minute + ":0" + second);
//					var showtime = "0" + hour + ":0" + minute + ":0" + second;
//				}
//				if ((hour >= 10) && (minute >= 10) && (second < 10)) {
//					console.log("" + hour + ":" + minute + ":0" + second);
//					var showtime = "" + hour + ":" + minute + ":0" + second;
//				}
//				if ((hour >= 10) && (minute < 10) && (second < 10)) {
//					console.log("" + hour + ":0" + minute + ":0" + second);
//					var showtime = "" + hour + ":0" + minute + ":0" + second;
//				}
//				if ((hour >= 10) && (minute < 10) && (second >= 10)) {
//					console.log("" + hour + ":0" + minute + ":" + second);
//					var showtime = "" + hour + ":0" + minute + ":" + second;
//				}
//				if ((hour >= 10) && (minute >= 10) && (second >= 10)) {
//					console.log("" + hour + ":" + minute + ":" + second);
//					var showtime = "" + hour + ":" + minute + ":" + second;
//				}
//				$rootScope.home={showtimeLeft: showtime,showtimeMid: showtime,showtimeRight: showtime};
//			};
//			return deferred.promise;
//		}
//	}
//}]);
//==============================================今日热门数据接口end===================================================
//
// // 创建后台数据交互工厂
// myservices.factory('Demo', function($http) {
// 	var Demo = function() {
// 		this.homes = [];
// 		this.busy = false;
// 		this.after = '';
// 		this.page = 1;
// 	};
//
// 	Demo.prototype.nextPage = function() {
// 		if (this.busy) return;
// 		this.busy = true;
//
// 		$http({
//				url: 'http://service.quzhuan.me/renwuke/api/' + 'snatch/goods/getGoodsRelease',
//				method: 'GET',
//				params: {
//					'status': '1',
//					'page': '1',
//					'count': '3'
//				}
//			}).success(function(data, header, config, status) {
// 			for (var i = 0; i < homes.length; i++) {
// 				console.log("进入循环");
//					var goodsReleaseBosVo = goodsReleaseBos[i];
//					console.log(JSON.stringify(goodsReleaseBosVo));
//					var home={
//						listImage:goodsReleaseBos[i].goodsImages[0].url,
//						listMessage:goodsReleaseBos[i].goods.goodsName.substr(0,10)+'...',
//						listNumAll:"10000",
//						listNumMore:"6500",
//						listNumOver:"3500"
//					};
//					console.log("----------complete----------"+JSON.stringify(home));
//					$rootScope.homes.push(home);
// 			}
// 			this.after = "t3_" + this.homes[this.homes.length - 1].id;
// 			this.busy = false;
// 			this.page += 1;
// 		}.bind(this));
// 	};
// 	return Demo;
// });
//=======================================================================================================
//myservices.directive('mySrcoll', ['$window','$document', function($window,$document){
//	return {
//		restrict:"A",
//		scope:false,
//		link: function($scope, iElm, iAttrs) {
////				$(window).scroll(function(){ 
////					console.log("123123");
////					if ($(document).scrollTop() < 1) {
////							console.log("456456");
////							$scope.hedeaders=false;
////						}else{
////							console.log("789789");
////							$scope.hedeaders=true;
////						}
////				$scope.$apply();
////			});
//iElm.on('click',function() {
//	console.log("ccccccc")
//	/* Act on the event */
//});
//		}
//	};
//}]);