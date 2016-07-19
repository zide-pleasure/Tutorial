var autoInsuranceCtrls = angular.module('autoInsuranceCtrls', []);

//--------------------------------------------------------------------------------------------------------------------------------
//夺宝首页(选项卡第一个)
autoInsuranceCtrls.controller('homepageCtrl', ['$rootScope', '$scope', '$state', '$http', 'myBanner', 'myNewgoods', 'myHot', 'myNews', 'myFast',
	function($rootScope, $scope, $state, $http, myBanner, myNewgoods, myHot, myNews, myFast) {
		$rootScope.appTitle = '夺宝';
		$rootScope.tabBar = true;
		$rootScope.headder = true;
		$rootScope.hideBack = true;
		$rootScope.qiandao = true;
		$rootScope.goodsSerch = false;
		$rootScope.gouwuche = false;
		//声明一个购物
		$rootScope.shoppingList = {};
		//-----------------------------------
		var flag = 1; //页面初始值
		$scope.zuixin = false;
		$scope.zuire = true;
		$scope.zuikuai = false;
		$scope.choicezuire = true;
		$scope.choicezuixin = false;
		$scope.choicezuikuai = false;
		$scope.shoppingView = false;
		$scope.homezuires = []; //最热
		$scope.homezuixins = []; //最新
		$scope.homezuikuais = []; //最快
		$rootScope.marks = "mainPage";
		//赋初始值
		$scope.goodsNumber = 5;
		//		var urls=window.location.href;
		//		console.log("urls:"+urls);
		//		alert("urls:"+urls);
		//弹出框内部按钮逻辑
		$scope.subtract = function() {
			if($scope.goodsNumber > 1) {
				$scope.goodsNumber--;
			}
		}
		$scope.add = function() {
			$scope.goodsNumber++;
		}
		$scope.addten = function() {
			$scope.goodsNumber = $scope.goodsNumber + 10;
		}
		$scope.addfifty = function() {
			$scope.goodsNumber = $scope.goodsNumber + 50;
		}
		$scope.addhd = function() {
			$scope.goodsNumber = $scope.goodsNumber + 100;
		}
		$scope.adddl = function() {
			$scope.goodsNumber = $scope.goodsNumber + 1000;
		}
		$scope.shopping = function(index) {
				$rootScope.amount = $scope.goodsNumber;
				flags = true;
				mask.close(); //关闭遮罩
				$scope.shoppingView = false;
				console.log(JSON.stringify($rootScope.detailId));
				var goodsReleaseId = $rootScope.detailId;
				var buyCount = $rootScope.amount;
				var token = "373f318821c63640c2578eb0574647e983feca381c738290";
				var promise = $http({
					url: 'http://42.62.53.158:8080/shop/api/' + 'order/save/cart',
					method: 'POST',
					params: {
						goodsReleaseId: goodsReleaseId,
						buyCount: buyCount,
						token: token
					}
				}).success(function(data, header, config, status) {
					console.log("返回成功");
					//响应成功
				}).error(function(data, header, config, status) {
					console.log("返回失败");
					//处理响应失败
				});
				//===============================商品查询页列表接口begin====================
				promise.then(function(answer) {
						var data = answer;
						console.log("购物车添加成功：" + JSON.stringify(data));
						var code = data.data.code;
						if(code == "-1000") {
							//						plus.nativeUI.toast( "请您先进行登录!",{verticalAlign:"bottom"});
							alert("请您先进行登录!");
							$state.go('main.login');
						}
						if(code == "0") {
							$rootScope.cartIds = data.data.data.cart.id;
							$state.go('main.shoppingPay');
						}
						if(code == "-1053") {
							//						plus.nativeUI.toast( "商品已在购物车!",{verticalAlign:"bottom"});
							alert("商品已在购物车!");
						}
					},
					function(error) {
						console.log("error");
						$scope.error = error;
					});
			}
			//		//自定义颜色示例
			//		mui("#demo1 .mui-progressbar").each(function () {
			//			mui(this).progressbar({progress:this.getAttribute("data-progress")}).show();
			//		});
			//		//自定义颜色示例
			//		mui("#demo2 .mui-progressbar").each(function () {
			//			mui(this).progressbar({progress:this.getAttribute("data-progress")}).show();
			//		});
			//		//自定义颜色示例
			//		mui("#demo3 .mui-progressbar").each(function () {
			//			mui(this).progressbar({progress:this.getAttribute("data-progress")}).show();
			//		});
			//创建表
		createTable();
		$scope.borderRe = {
			"font-weight": "bold",
			"font-size": "17px",
			"border-bottom": "2px solid #D43047",
		};
		var detailFlag = "0"; //状态标识位、0：进行中（初始状态）、1：已揭晓、2：揭晓中
		var whethercan = "0"; //状态标志位、0：未参加（初始状态），1：已参加
		//=========计时器逻辑begin
		$scope.hour = 0; //平台返回的小时数
		$scope.minute = 0; //平台返回的分钟数
		$scope.second = 0; //平台返回的秒数
		$scope.millisecond = 0; //平台返回的毫秒数
		$scope.tempsecond = 0; //秒数的中间值，把所有毫秒化成总秒数
		$scope.stopto = 0; //循环秒数
		//=========计时器逻辑end
		//页面跳转（夺宝攻略）
		$rootScope.gonglue = function() {
				$state.go('main.duobaogonglue');
			}
			//页面跳转（商品查询页）
		$rootScope.goodsSerch = function() {
				//				$state.go('main.goodsSerch');
				window.location.href = "partials/goodsDemo.html";
			}
			//------------------------------------首页最热部分点击获取数据--------------------------------------
			//页面跳转（商品详情---进行中详情）
		$scope.goodsDetailsHot = function(index) {
				localStorage.removeItem("detailFlag");
				localStorage.setItem("detailFlag", "0");
				console.log("index的值：" + index);
				$rootScope.goodsIds = $scope.homezuires[index].goodsId; //图文详情识别唯一标识
				$rootScope.detailId = $scope.homezuires[index].detailsId; //商品详情识别唯一标识
				console.log(JSON.stringify($rootScope.detailId));
				$rootScope.shoppingList = $rootScope.lists[index]; //购物清单信息
				console.log("取出的rootscope的值：");
				console.log(JSON.stringify($rootScope.shoppingList));
				$state.go('main.goodsDetails');
			}
			//页面跳转（商品详情---进行中详情）
		$scope.goodsDetailsNew = function(index) {
				localStorage.removeItem("detailFlag");
				localStorage.setItem("detailFlag", "0");
				console.log("index的值：" + index);
				$rootScope.goodsIds = $scope.homezuixins[index].goodsId;
				$rootScope.detailId = $scope.homezuixins[index].detailsId;
				console.log(JSON.stringify($rootScope.detailId));
				$rootScope.shoppingList = $rootScope.lists[index]; //购物清单信息
				$state.go('main.goodsDetails');
			}
			//页面跳转（商品详情---进行中详情）
		$scope.goodsDetailsFast = function(index) {
				localStorage.removeItem("detailFlag");
				localStorage.setItem("detailFlag", "0");
				console.log("index的值：" + index);
				$rootScope.goodsIds = $scope.homezuikuais[index].goodsId;
				$rootScope.detailId = $scope.homezuikuais[index].detailsId;
				console.log(JSON.stringify($rootScope.detailId));
				$rootScope.shoppingList = $rootScope.lists[index]; //购物清单信息
				$state.go('main.goodsDetails');
			}
			//------------------------------------首页最热部分点击获取数据--------------------------------------
			//页面跳转（商品详情--揭晓中详情）
		$scope.godetailsone = function() {
				if(flag == 0) {
					$rootScope.goodsIds = $scope.openingList[0].goodsReleasePeriod;
					$rootScope.detailId = $scope.openingList[0].goodsReleaseId;
					$rootScope.shoppingList = $scope.openingList[0]; //购物清单信息
					localStorage.removeItem("detailFlag");
					localStorage.setItem("detailFlag", "2");
				}
				if(flag == 1) {
					$rootScope.goodsIds = $scope.openedList[0].goodsReleasePeriod;
					$rootScope.detailId = $scope.openedList[0].goodsReleaseId;
					$rootScope.shoppingList = $scope.openedList[0]; //购物清单信息
					localStorage.removeItem("detailFlag");
					localStorage.setItem("detailFlag", "1");
				}
				if(flag == 2) {
					$rootScope.goodsIds = $scope.openedList[0].goodsReleasePeriod;
					$rootScope.detailId = $scope.openedList[0].goodsReleaseId;
					$rootScope.shoppingList = $scope.openedList[0]; //购物清单信息
					localStorage.removeItem("detailFlag");
					localStorage.setItem("detailFlag", "1");
				}
				if(flag == 3) {
					$rootScope.goodsIds = $scope.openedList[0].goodsReleasePeriod;
					$rootScope.detailId = $scope.openedList[0].goodsReleaseId;
					$rootScope.shoppingList = $scope.openedList[0]; //购物清单信息
					localStorage.removeItem("detailFlag");
					localStorage.setItem("detailFlag", "1");
				}
				console.log("detailsID的1值：" + $rootScope.detailId);
				$state.go('main.goodsDetails');
			}
			//页面跳转（商品详情--揭晓中详情）
		$scope.godetailstwo = function() {
				var flag = localStorage.getItem("flag");
				if(flag == 0) {
					$rootScope.goodsIds = $scope.openingList[1].goodsReleasePeriod;
					$rootScope.detailId = $scope.openingList[1].goodsReleaseId;
					$rootScope.shoppingList = $scope.openingList[1]; //购物清单信息
					localStorage.removeItem("detailFlag");
					localStorage.setItem("detailFlag", "2");
				}
				if(flag == 1) {
					$rootScope.goodsIds = $scope.openingList[0].goodsReleasePeriod;
					$rootScope.detailId = $scope.openingList[0].goodsReleaseId;
					$rootScope.shoppingList = $scope.openingList[0]; //购物清单信息
					localStorage.removeItem("detailFlag");
					localStorage.setItem("detailFlag", "2");
				}
				if(flag == 2) {
					$rootScope.goodsIds = $scope.openedList[1].goodsReleasePeriod;
					$rootScope.detailId = $scope.openedList[1].goodsReleaseId;
					$rootScope.shoppingList = $scope.openedList[1]; //购物清单信息
					localStorage.removeItem("detailFlag");
					localStorage.setItem("detailFlag", "1");
				}
				if(flag == 3) {
					$rootScope.goodsIds = $scope.openedList[1].goodsReleasePeriod;
					$rootScope.detailId = $scope.openedList[1].goodsReleaseId;
					$rootScope.shoppingList = $scope.openedList[0]; //购物清单信息
					localStorage.removeItem("detailFlag");
					localStorage.setItem("detailFlag", "1");
				}
				console.log("detailsID的2值：" + $rootScope.detailId);
				$state.go('main.goodsDetails');
			}
			//页面跳转（商品详情--揭晓中详情）
		$scope.godetailsthr = function() {
				if(flag == 0) {
					$rootScope.goodsIds = $scope.openingList[2].goodsReleasePeriod;
					$rootScope.detailId = $scope.openingList[2].goodsReleaseId;
					$rootScope.shoppingList = $scope.openingList[2]; //购物清单信息
					localStorage.removeItem("detailFlag");
					localStorage.setItem("detailFlag", "2");
				}
				if(flag == 1) {
					$rootScope.goodsIds = $scope.openingList[1].goodsReleasePeriod;
					$rootScope.detailId = $scope.openingList[1].goodsReleaseId;
					$rootScope.shoppingList = $scope.openingList[1]; //购物清单信息
					localStorage.removeItem("detailFlag");
					localStorage.setItem("detailFlag", "2");
				}
				if(flag == 2) {
					$rootScope.goodsIds = $scope.openingList[0].goodsReleasePeriod;
					$rootScope.detailId = $scope.openingList[0].goodsReleaseId;
					$rootScope.shoppingList = $scope.openingList[0]; //购物清单信息
					localStorage.removeItem("detailFlag");
					localStorage.setItem("detailFlag", "2");
				}
				if(flag == 3) {
					$rootScope.goodsIds = $scope.openedList[2].goodsReleasePeriod;
					$rootScope.detailId = $scope.openedList[2].goodsReleaseId;
					$rootScope.shoppingList = $scope.openedList[2]; //购物清单信息
					localStorage.removeItem("detailFlag");
					localStorage.setItem("detailFlag", "1");
				}
				console.log("detailsID的3值：" + $rootScope.detailId);
				$state.go('main.goodsDetails');
			}
			//页面跳转（最新揭晓更多页面）
		$scope.goodsMore = function() {
				$state.go('main.goodsMoreList');
			}
			//监控滚动条
		$(window).scroll(function() {
			if($(document).scrollTop() > 350) { //固定最新、最快、最热、的标题栏
				$scope.tabBarThr = {
					"position": "fixed",
					"top": "52px",
					"overflow": "hidden",
					"z-index": "99"
				}
				$scope.$apply();
			} else {
				$scope.tabBarThr = {
					"position": "normal",
					"top": "normal",
					"overflow": "normal",
					"z-index": "normal",
				}
				$scope.$apply();
			}
		});
		//===============================轮播图赋值接口begin====================
		myBanner.getData().then(
			function(answer) {
				var data = answer;
				console.log("!!!!!!!!!!!!!!!!!!!!");
				console.log("轮播图轮播图：" + JSON.stringify(data));
				console.log("!!!!!!!!!!!!!!!!!!!!");
				if(data != null && data != "") {
					var banner = data.data.data.list;
					$scope.banner1 = banner[0].bannerUrl;
					$scope.banner2 = banner[1].bannerUrl;
					$scope.banner3 = banner[2].bannerUrl;
					$scope.banner4 = banner[4].bannerUrl;
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			}
		);
		//===============================轮播图赋值接口end====================
		//轮播图片，手动调用
		var gallery = mui('.mui-slider');
		gallery.slider({
			interval: 4000 //自动轮播周期，若为0则不自动播放，默认为0，单位毫秒；
		});
		//===============================最新揭晓接口begin====================
		var timer1 = 0;
		var timer2 = 0;
		var timer3 = 0;
		$scope.timeIcon1 = false;
		$scope.timeIcon2 = false;
		$scope.timeIcon3 = false;
		var flag = 0; //falg值含义：1.已揭晓【1】2.已揭晓【2】3.已揭晓【3】4.已揭晓【0】
		localStorage.setItem("flag", flag);
		//		$scope.openedLists=[];
		myNewgoods.getData().then(
			function(answer) {
				var data = answer;
				console.log("最新揭晓!!!!!!!!!!!!!!!!!!!!");
				console.log(JSON.stringify(data));
				console.log("!!!!!!!!!!!!!!!!!!!!");
				if(data != null && data != "") {
					$scope.openingList = data.data.data.openingList;
					$scope.openedList = data.data.data.openedList;
					console.log("$scope.openingList" + JSON.stringify($scope.openingList));
					console.log("$scope.openedList" + JSON.stringify($scope.openedList));
					var lengths = $scope.openedList.length;
					console.log("lengths的长度：" + lengths);
					if($scope.openedList.length == 0) {
						$scope.home = {
							imageLeft: $scope.openingList[0].goodsIcon,
							imageMid: $scope.openingList[1].goodsIcon,
							imageRight: $scope.openingList[2].goodsIcon,
							goodsNameLeft: $scope.openingList[0].goodsName.substr(0, 7) + '...',
							goodsNameMid: $scope.openingList[1].goodsName.substr(0, 7) + '...',
							goodsNameRight: $scope.openingList[2].goodsName.substr(0, 7) + '...'
						};
						timer1 = $scope.openingList[0].openTime;
						timer2 = $scope.openingList[0].openTime;
						timer3 = $scope.openingList[0].openTime;
						localStorage.removeItem("flag");
						flag = 0;
						localStorage.setItem("flag", flag);
					}
					if($scope.openedList.length == 1) {
						$scope.home = {
							imageLeft: $scope.openedList[0].goodsIcon,
							imageMid: $scope.openingList[0].goodsIcon,
							imageRight: $scope.openingList[1].goodsIcon,
							goodsNameLeft: $scope.openedList[0].goodsName.substr(0, 7) + '...',
							goodsNameMid: $scope.openingList[0].goodsName.substr(0, 7) + '...',
							goodsNameRight: $scope.openingList[1].goodsName.substr(0, 7) + '...'
						};
						//							timer1=$scope.openedList[0].openTime;
						timer1 = "";
						timer2 = $scope.openingList[0].openTime;
						timer3 = $scope.openingList[1].openTime;
						localStorage.removeItem("flag");
						flag = 1;
						localStorage.setItem("flag", flag);
					}
					if($scope.openedList.length == 2) {
						$scope.home = {
							imageLeft: $scope.openedList[0].goodsIcon,
							imageMid: $scope.openedList[1].goodsIcon,
							imageRight: $scope.openingList[0].goodsIcon,
							goodsNameLeft: $scope.openedList[0].goodsName.substr(0, 7) + '...',
							goodsNameMid: $scope.openedList[1].goodsName.substr(0, 7) + '...',
							goodsNameRight: $scope.openingList[0].goodsName.substr(0, 7) + '...'
						};
						//							timer1=$scope.openedList[0].openTime;
						//							timer2=$scope.openedList[1].openTime;
						timer1 = "";
						timer2 = "";
						timer3 = $scope.openingList[0].openTime;
						localStorage.removeItem("flag");
						flag = 2;
						localStorage.setItem("flag", flag);
					}
					if($scope.openedList.length == 3) {
						$scope.home = {
							imageLeft: $scope.openedList[0].goodsIcon,
							imageMid: $scope.openedList[1].goodsIcon,
							imageRight: $scope.openedList[2].goodsIcon,
							goodsNameLeft: $scope.openedList[0].goodsName.substr(0, 7) + '...',
							goodsNameMid: $scope.openedList[1].goodsName.substr(0, 7) + '...',
							goodsNameRight: $scope.openedList[2].goodsName.substr(0, 7) + '...'
						};
						//							timer1=$scope.openedList[0].openTime;
						//							timer2=$scope.openedList[1].openTime;
						//							timer3=$scope.openedList[2].openTime;
						timer1 = "";
						timer2 = "";
						timer3 = "";
						localStorage.removeItem("flag");
						flag = 3;
						localStorage.setItem("flag", flag);
					}
					console.log("flag的值：" + flag);
				}
				//============================倒计时，计时器================================
				var addTimer = function() {
					var list = [],
						interval;

					return function(id, time) {
						if(!interval)
							interval = setInterval(go, 1000);
						list.push({
							ele: document.getElementById(id),
							time: time
						});
					}

					function go() {
						for(var i = 0; i < list.length; i++) {
							list[i].ele.innerHTML = getTimerString(list[i].time ? list[i].time -= 1 : 0);
							if(!list[i].time)
								list.splice(i--, 1);
						}
					}

					function getTimerString(time) {
						var not0 = !!time,
							h = Math.floor((time %= 86400) / 3600),
							m = Math.floor((time %= 3600) / 60),
							s = time % 60;
						if((h < 10) && (m >= 10) && (s >= 10)) {
							var showtime = "0" + h + ":" + m + ":" + s;
							return showtime;
						}
						if((h < 10) && (m < 10) && (s >= 10)) {
							var showtime = "0" + h + ":0" + m + ":" + s;
							return showtime;
						}
						if((h < 10) && (m < 10) && (s < 10)) {
							var showtime = "0" + h + ":0" + m + ":0" + s;
							return showtime;
						}
						if((h >= 10) && (m >= 10) && (s < 10)) {
							var showtime = "" + h + ":" + m + ":0" + s;
							return showtime;
						}
						if((h >= 10) && (m < 10) && (s < 10)) {
							var showtime = "" + h + ":0" + m + ":0" + s;
							return showtime;
						}
						if((h >= 10) && (m < 10) && (s >= 10)) {
							var showtime = "" + h + ":0" + m + ":" + s;
							return showtime;
						}
						if((h >= 10) && (m >= 10) && (s >= 10)) {
							var showtime = "" + h + ":" + m + ":" + s;
							return showtime;
						}
						if((h < 10) && (m >= 10) && (s < 10)) {
							var showtime = "0" + h + ":" + m + ":0" + s;
							return showtime;
						}
						if((h = 0) && (m = 0) && (s = 0)) {
							var showtime = "0" + h + ":0" + m + ":0" + s;
							return showtime;
							clearInterval(addTimer);
						}
					}
				}();
				if(timer1 == "" && timer2 == "" && timer3 == "") {
					$scope.timeIcon1 = true;
					$scope.timeIcon2 = true;
					$scope.timeIcon3 = true;
					document.getElementById("showtimeLeft").innerHTML = "已开奖";
					document.getElementById("showtimeMid").innerHTML = "已开奖";
					document.getElementById("showtimeRight").innerHTML = "已开奖";
				}
				if(timer1 != "" && timer2 == "" && timer3 == "") {
					addTimer("showtimeLeft", timer1);
					document.getElementById("showtimeMid").innerHTML = "已开奖";
					document.getElementById("showtimeRight").innerHTML = "已开奖";
					$scope.timeIcon2 = true;
					$scope.timeIcon3 = true;
				}
				if(timer1 == "" && timer2 != "" && timer3 == "") {
					addTimer("showtimeMid", timer2);
					document.getElementById("showtimeLeft").innerHTML = "已开奖";
					document.getElementById("showtimeRight").innerHTML = "已开奖";
					$scope.timeIcon1 = true;
					$scope.timeIcon3 = true;
				}
				if(timer1 == "" && timer2 == "" && timer3 != "") {
					addTimer("showtimeRight", timer3);
					document.getElementById("showtimeLeft").innerHTML = "已开奖";
					document.getElementById("showtimeMid").innerHTML = "已开奖";
					$scope.timeIcon1 = true;
					$scope.timeIcon2 = true;
				}
				if(timer1 != "" && timer2 != "" && timer3 == "") {
					addTimer("showtimeLeft", timer1);
					addTimer("showtimeMid", timer2);
					document.getElementById("showtimeRight").innerHTML = "已开奖";
					$scope.timeIcon3 = true;
				}
				if(timer1 == "" && timer2 != "" && timer3 != "") {
					document.getElementById("showtimeLeft").innerHTML = "已开奖";
					addTimer("showtimeMid", timer2);
					addTimer("showtimeRight", timer3);
					$scope.timeIcon1 = true;
				}
				if(timer1 != "" && timer2 == "" && timer3 != "") {
					document.getElementById("showtimeMid").innerHTML = "已开奖";
					addTimer("showtimeMid", timer1);
					addTimer("showtimeMid", timer3);
					$scope.timeIcon2 = true;
				}
				if(timer1 != "" && timer2 != "" && timer3 != "") {
					addTimer("showtimeLeft", timer1);
					addTimer("showtimeMid", timer2);
					addTimer("showtimeRight", timer3);

				}
				console.log("timer1:" + timer1 + "timer2:" + timer2 + "timer3:" + timer3);
				//============================倒计时，计时器================================
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			}
		);
		//===============================最新揭晓接口end====================

		//控制最快，最新，最热切换
		$scope.changePakage = function(flag) { //点击选项卡
			console.log("点击事件" + flag);
			if(flag == 1) {
				console.log("进入flag==1逻辑");
				$scope.zuixin = false;
				$scope.zuire = true;
				$scope.zuikuai = false;
				$scope.choicezuire = true;
				$scope.choicezuixin = false;
				$scope.choicezuikuai = false;
				$scope.borderRe = {
					//					"color": "#D43047",
					"font-weight": "bold",
					"border-bottom": "2px solid #D43047",
					"font-size": "17px",
				};
				$scope.borderXin = {
					//					"color": "#000000",
					"font-weight": "normal",
					"border-bottom": "normal",
				};
				$scope.borderKuai = {
					//					"color": "#000000",
					"font-weight": "normal",
					"border-bottom": "normal",
				};
			}
			if(flag == 2) {
				console.log("进入flag==2逻辑");
				$scope.zuixin = true;
				$scope.zuire = false;
				$scope.zuikuai = false;
				$scope.choicezuire = false;
				$scope.choicezuixin = true;
				$scope.choicezuikuai = false;
				$scope.borderRe = {
					//					"color": "#000000",
					"font-weight": "normal",
					"border-bottom": "normal"
				};
				$scope.borderXin = {
					//					"color": "#D43047",
					"font-weight": "bold",
					"font-size": "17px",
					"border-bottom": "2px solid #D43047"
				};
				$scope.borderKuai = {
					//					"color": "#000000",
					"font-weight": "normal",
					"border-bottom": "normal"
				};
			}
			if(flag == 3) {
				console.log("进入flag==3逻辑");
				$scope.zuixin = false;
				$scope.zuire = false;
				$scope.zuikuai = true;
				$scope.choicezuire = false;
				$scope.choicezuixin = false;
				$scope.choicezuikuai = true;
				$scope.borderRe = {
					//					"color": "#000000",
					"font-weight": "normal",
					"border-bottom": "normal",
				};
				$scope.borderXin = {
					//					"color": "#000000",
					"font-weight": "normal",
					"border-bottom": "normal",
				};
				$scope.borderKuai = {
					//					"color": "#D43047",
					"font-weight": "bold",
					"font-size": "17px",
					"border-bottom": "2px solid #D43047",
				};
			}
		}

		//今日热门最热接口begin===============
		//		var listsHotMsg = [];
		myHot.getData().then(
			function(answer) {
				var data = answer;
				if(data != null && data != "") {
					console.log("最热最热：");
					console.log(JSON.stringify(data));
					var lists = data.data.data.list;
					$rootScope.lists = lists;
					//					localStorage.removeItem("listsHotMsgs");
					//					var listsHotMsg=JSON.stringify(lists);
					//					console.log("最热最热最热：");
					//					console.log(JSON.stringify($rootScope.lists[1]));
					//					localStorage.setItem("listsHotMsgs",listsHotMsg);//将lists信息放入localstorage
					//============下方列表============
					for(var i = 0; i < lists.length; i++) {
						//					console.log("进入循环");
						var listsVo = lists[i];
						//----------进度条样式begin----------
						var width = listsVo.precent;
						console.log("是看得见快来撒：" + listsVo.precent);
						//给进度条赋值
						$scope.progress = {
								"width": width,
								"height": "100%",
								"background-color": "#666",
								"background": "-webkit-gradient(linear, 0 0, 0 100%, from(#d43047), color-stop(1, #d43047), to(#d43047))",
								"border-radius": "10px"
							}
							//----------进度条样式end----------
							//					console.log(JSON.stringify(goodsReleaseBosVo));
						var homezuire = {
							goodsIcon: listsVo.goodsIcon,
							listMessage: listsVo.goodsName.substr(0, 10) + '...',
							listNumAll: listsVo.totalStock,
							listNumMore: listsVo.usableStock,
							listNumOver: listsVo.totalStock - listsVo.usableStock,
							goodsId: listsVo.goodsId,
							detailsId: listsVo.id
						};
						//					console.log("----------complete----------" + JSON.stringify(home));
						$scope.homezuires.push(homezuire);
						//					$scope.$digest();
					}
					//============下方列表============
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			}
		);
		//今日热门最新接口begin===============
		myNews.getData().then(
			function(answer) {
				var data = answer;
				if(data != null && data != "") {
					console.log(JSON.stringify(data));
					var lists = data.data.data.list;
					$rootScope.lists = lists;
					//					localStorage.removeItem("listsNewMsgs");
					//					var listsNewMsg=JSON.stringify(lists);
					//					console.log("最新最新最新：");
					//					console.log(JSON.stringify(listsNewMsg));
					//					localStorage.setItem("listsNewMsgs",listsNewMsg);//将lists信息放入localstorage
					//============下方列表============
					for(var i = 0; i < lists.length; i++) {
						//					console.log("进入循环");
						var listsVo = lists[i];
						//----------进度条样式begin----------
						var width = listsVo.precent;
						console.log("是看得见快来撒：" + listsVo.precent);
						//给进度条赋值
						$scope.progress = {
								"width": width,
								"height": "100%",
								"background-color": "#666",
								"background": "-webkit-gradient(linear, 0 0, 0 100%, from(#d43047), color-stop(1, #d43047), to(#d43047))",
								"border-radius": "10px"
							}
							//----------进度条样式end----------
							//					console.log(JSON.stringify(goodsReleaseBosVo));
						var homezuixin = {
							goodsIcon: listsVo.goodsIcon,
							listMessage: listsVo.goodsName.substr(0, 10) + '...',
							listNumAll: listsVo.totalStock,
							listNumMore: listsVo.usableStock,
							listNumOver: listsVo.totalStock - listsVo.usableStock,
							goodsId: listsVo.goodsId,
							detailsId: listsVo.id
						};
						//					console.log("----------complete----------" + JSON.stringify(home));
						$scope.homezuixins.push(homezuixin);
						//					$scope.$digest();
					}
					//============下方列表============
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			}
		);
		//今日热门最快接口begin===============
		myFast.getData().then(
			function(answer) {
				var data = answer;
				if(data != null && data != "") {
					console.log(JSON.stringify(data));
					var lists = data.data.data.list;
					$rootScope.lists = lists;
					//					localStorage.removeItem("listsFastMsgs");
					//					var listsFastMsg=JSON.stringify(lists);
					//					console.log("最快最快最快：");
					//					console.log(JSON.stringify(listsFastMsg));
					//					localStorage.setItem("listsFastMsgs",listsFastMsg);//将lists信息放入localstorage
					//============下方列表============
					for(var i = 0; i < lists.length; i++) {
						//					console.log("进入循环");
						var listsVo = lists[i];
						//----------进度条样式begin----------
						var width = listsVo.precent;
						console.log("是看得见快来撒：" + listsVo.precent);
						//给进度条赋值
						$scope.progress = {
								"width": width,
								"height": "100%",
								"background-color": "#666",
								"background": "-webkit-gradient(linear, 0 0, 0 100%, from(#d43047), color-stop(1, #d43047), to(#d43047))",
								"border-radius": "10px"
							}
							//----------进度条样式end----------
							//					console.log(JSON.stringify(goodsReleaseBosVo));
						var homezuikuai = {
							goodsIcon: listsVo.goodsIcon,
							listMessage: listsVo.goodsName.substr(0, 10) + '...',
							listNumAll: listsVo.totalStock,
							listNumMore: listsVo.usableStock,
							listNumOver: listsVo.totalStock - listsVo.usableStock,
							goodsId: listsVo.goodsId,
							detailsId: listsVo.id
						};
						//					console.log("----------complete----------" + JSON.stringify(home));
						$scope.homezuikuais.push(homezuikuai);
						//					$scope.$digest();
					}
					//============下方列表============
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			}
		);

		//shopping购买事件
		//遮罩
		var flags = false;
		var mask = mui.createMask(function() {
			return flags;
		});
		//--------------------最热最新最快购买时获取item数据---------------------
		$scope.isGrey = false;
		$scope.shoppingHot = function(index) {
			//初始化
			$scope.goodsNumber = 5;
			$rootScope.goodsIds = $scope.homezuires[index].goodsId;
			$rootScope.detailId = $scope.homezuires[index].detailsId;
			$scope.isGrey = true;
			flags = false;
			mask.show(); //显示遮罩	
			$scope.shoppingView = true;
		}
		$scope.shoppingNew = function(index) {
			//初始化
			$scope.goodsNumber = 5;
			$rootScope.goodsIds = $scope.homezuixins[index].goodsId;
			$rootScope.detailId = $scope.homezuixins[index].detailsId;
			console.log(JSON.stringify($rootScope.detailId));
			$scope.isGrey = true;
			//      			$scope.fastbuy = {
			//									"border":"0",
			//									"color": "white",
			//									"background-color":"#D43047",
			//									"font-weight": "bold",
			//								};
			flags = false;
			mask.show(); //显示遮罩	
			$scope.shoppingView = true;
		}
		$scope.shoppingFast = function(index) {
				//初始化
				$scope.goodsNumber = 5;
				$rootScope.goodsIds = $scope.homezuikuais[index].goodsId;
				$rootScope.detailId = $scope.homezuikuais[index].detailsId;
				console.log(JSON.stringify($rootScope.detailId));
				$scope.isGrey = true;
				//      			$scope.fastbuy = {
				//									"border":"0",
				//									"color": "white",
				//									"background-color":"#D43047",
				//									"font-weight": "bold",
				//								};
				flags = false;
				mask.show(); //显示遮罩	
				$scope.shoppingView = true;
			}
			//--------------------最热最新最快购买时获取item数据---------------------
			//关闭购物车小窗口
		$scope.closeShop = function() {
			flags = true;
			mask.close(); //关闭遮罩
			$scope.shoppingView = false;
		}
	}
]);
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//最新揭晓(选项卡第二个)
autoInsuranceCtrls.controller('financeCtrl', ['$rootScope', '$scope', '$state', '$http', 'myNewMore', function($rootScope, $scope, $state, $http, myNewMore) {
	$rootScope.appTitle = '最新揭晓';
	$rootScope.tabBar = true;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	$scope.anouncings = [];
	$scope.anounceds = [];
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.homepage');
	};
	//跳转到详情页（已揭晓）
	$scope.godetail = function(index) {
			console.log("index的值：" + index);
			$rootScope.goodsIds = $scope.anounceds[index].goodsReleasePeriod;
			$rootScope.detailId = $scope.anounceds[index].goodsReleaseId;
			localStorage.removeItem("detailFlag");
			localStorage.setItem("detailFlag", "1");
			$rootScope.shoppingList = $scope.anounceds[index]; //购物清单信息
			$state.go('main.goodsDetails');
		}
		//跳转到详情页（揭晓中）
	$scope.godetails = function(index) {
			console.log("index的值：" + index);
			$rootScope.goodsIds = $scope.anouncings[index].goodsReleasePeriod;
			$rootScope.detailId = $scope.anouncings[index].goodsReleaseId;
			localStorage.removeItem("detailFlag");
			localStorage.setItem("detailFlag", "2");
			$rootScope.shoppingList = $scope.anouncings[index]; //购物清单信息
			$state.go('main.goodsDetails');
		}
		//===============================最新揭晓列表接口begin====================
	myNewMore.getData().then(function(answer) {
			var data = answer;
			if(data != null && data != "") {
				//				console.log("最新揭晓页面：");
				//				console.log(JSON.stringify(data));
				//				console.log("最新揭晓页面：");
				var openingList = data.data.data.openingList; //正在揭晓
				var openedList = data.data.data.openedList; //已揭晓
				console.log("openingList" + JSON.stringify(openingList));
				console.log("openedList" + JSON.stringify(openedList));
				var countPage = data.data.data.countPage;
				if(openingList != []) {
					for(var i = 0; i < openingList.length; i++) {
						console.log("openingList的长度：" + openingList.length);
						console.log("i的值：" + i);
						var openingList = openingList[i];
						console.log(JSON.stringify(openingList[i]));
						var anouncing = {
							urlimg: openingList.goodsIcon,
							periods: openingList.goodsReleasePeriod,
							goodsName: openingList.goodsName.substr(0, 10) + '...',
							price: openingList.userCount,
							nunmerNo: openingList.userCount,
							userName: openingList.userName.substr(0, 6) + '...',
							personNum: openedListVo.totalStock,
							stopTime: openingList.openTime,
							headImg: openingList.userHeading,
							goodsReleaseId: openingList.goodsReleaseId
						};
						$scope.anouncings.push(anouncing);
					}
				}
				if(openedList != []) {
					for(var m = 0; m < openedList.length; m++) {
						console.log("openedList的长度：" + openedList.length);
						console.log("m的值：" + m);
						var openedListVo = openedList[m];
						console.log(JSON.stringify(openedListVo));
						var anounced = {
							urlimg: openedListVo.goodsIcon,
							goodsReleasePeriod: openedListVo.goodsReleasePeriod,
							goodsName: openedListVo.goodsName.substr(0, 10) + '...',
							price: openedListVo.totalStock,
							nunmerNo: openedListVo.treasureNo,
							userName: openedListVo.userName.substr(0, 6) + '...',
							personNum: openedListVo.totalStock,
							stopTime: openedListVo.openTime,
							headImg: openedListVo.userHeading,
							goodsReleaseId: openedListVo.goodsReleaseId
						};
						$scope.anounceds.push(anounced);
						//						console.log(JSON.stringify($scope.anounceds));
					}
				}
			}
		},
		function(error) {
			console.log("error");
			$scope.error = error;
		}
	);

	//===============================最新揭晓列表接口end====================
	//监控滚动条
	var page = 2;
	$scope.iscroll = false;
	var countPage = 0;
	$(window).scroll(function() {
		if(($(window).height() + $(window).scrollTop()) >= $("body").height()) {
			if($scope.iscroll) {
				return;
			}
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/' + 'goods/open/record/list',
				method: 'POST',
				params: {
					page: page
				}
			}).success(function(data, header, config, status) {
				console.log("返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					//===============================最新揭晓列表接口begin====================
					var data = answer;
					if(data != null && data != "") {
						//						console.log("最新揭晓页面：");
						//						console.log(JSON.stringify(data));
						//						console.log("最新揭晓页面：");
						var openingList = data.data.data.openingList;
						var openedList = data.data.data.openedList;
						countPage = data.data.data.countPage;
						if(openingList != []) {
							for(var i = 0; i < openingList.length; i++) {
								//											console.log("openingList的长度："+openingList.length);
								var openingList = openingList[i];
								//										console.log(JSON.stringify(openingList[i]));
								var anouncing = {
									urlimg: openingList.goodsIcon,
									goodsReleasePeriod: openingList.goodsReleasePeriod,
									goodsName: openingList.goodsName.substr(0, 10) + '...',
									price: openingList.userCount,
									nunmerNo: openingList.userCount,
									userName: openingList.userName.substr(0, 6) + '...',
									personNum: openedListVo.totalStock,
									stopTime: openingList.openTime,
									headImg: openingList.userHeading,
									goodsReleaseId: openingList.goodsReleaseId
								};
								//============================倒计时，计时器================================
								var addTimer = function() {
									var list = [],
										interval;

									return function(id, time) {
										if(!interval)
											interval = setInterval(go, 1000);
										list.push({
											ele: document.getElementById(id),
											time: time
										});
									}

									function go() {
										for(var i = 0; i < list.length; i++) {
											list[i].ele.innerHTML = getTimerString(list[i].time ? list[i].time -= 1 : 0);
											if(!list[i].time)
												list.splice(i--, 1);
										}
									}

									function getTimerString(time) {
										var not0 = !!time,
											h = Math.floor((time %= 86400) / 3600),
											m = Math.floor((time %= 3600) / 60),
											s = time % 60;
										if((h < 10) && (m >= 10) && (s >= 10)) {
											//						console.log("0" + h + ":" + m + ":" + s);
											var showtime = "0" + h + ":" + m + ":" + s;
											return showtime;
										}
										if((h < 10) && (m < 10) && (s >= 10)) {
											//console.log("0" + h + ":0" + m + ":" + s);
											var showtime = "0" + h + ":0" + m + ":" + s;
											return showtime;
										}
										if((h < 10) && (m < 10) && (s < 10)) {
											//console.log("0" + h + ":0" + m + ":0" + s);
											var showtime = "0" + h + ":0" + m + ":0" + s;
											return showtime;
										}
										if((h >= 10) && (m >= 10) && (s < 10)) {
											//						console.log("" + h + ":" + m + ":0" + s);
											var showtime = "" + h + ":" + m + ":0" + s;
											return showtime;
										}
										if((h >= 10) && (m < 10) && (s < 10)) {
											//						console.log("" + h + ":0" + m + ":0" + s);
											var showtime = "" + h + ":0" + m + ":0" + s;
											return showtime;
										}
										if((h >= 10) && (m < 10) && (s >= 10)) {
											//						console.log("" + h + ":0" + m + ":" + s);
											var showtime = "" + h + ":0" + m + ":" + s;
											return showtime;
										}
										if((h >= 10) && (m >= 10) && (s >= 10)) {
											//						console.log("" + h + ":" + m + ":" + s);
											var showtime = "" + h + ":" + m + ":" + s;
											return showtime;
										}
										if((h < 10) && (m >= 10) && (s < 10)) {
											//						console.log("0" + h + ":" + m + ":0" + s);
											var showtime = "0" + h + ":" + m + ":0" + s;
											return showtime;
										}
										if((h = 0) && (m = 0) && (s = 0)) {
											//						console.log("0" + h + ":0" + m + ":0" + s);
											var showtime = "0" + h + ":0" + m + ":0" + s;
											return showtime;
											clearInterval(addTimer);
										}
									}
								}();
								addTimer("one", 756);
								//============================倒计时，计时器================================
								//										console.log(JSON.stringify(anouncing));
								$scope.anouncings.push(anouncing);
							}
						}
						if(openedList != []) {
							for(var m = 0; m < openedList.length; m++) {
								//											console.log("openedList的长度："+openedList.length);
								var openedList = openedList[m];
								//										console.log(JSON.stringify(openedList));
								var anounced = {
									urlimg: openedList.goodsIcon,
									goodsReleasePeriod: openedList.goodsReleasePeriod,
									goodsName: openedList.goodsName.substr(0, 10) + '...',
									price: openedList.totalStock,
									nunmerNo: openedList.treasureNo,
									userName: openedList.userName.substr(0, 6) + '...',
									personNum: openedList.totalStock,
									stopTime: openedList.openTime,
									headImg: openedList.userHeading,
									goodsReleaseId: openedList.goodsReleaseId
								};
								//										console.log(JSON.stringify(anounced));
								$scope.anounceds.push(anounced);
							}
						}
						console.log("page的值：" + page);
						//										console.log("countPage的值：" + countPage);
						if(page < countPage) {
							//											console.log("我确实是小");
							page = page + 1;
							//											console.log("page的值之后：" + page);
							//											console.log("countPage的值之后：" + countPage);
						} else {
							$scope.iscroll = true;
						}
						//										console.log("$scope.iscroll的值之后：" + $scope.iscroll);
					}
					//===============================最新揭晓列表接口end====================
				},
				// 通讯失败的处理
				function(error) {
					// 可以先对失败的数据集做处理，再交由controller进行处理
					error.status = false;
					deferred.reject(error);
				});
			//			console.log("到家啦哪里；萨克斯大门口了");
		}
		$scope.$digest();
	});
}]);
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//清单页面(选项卡第四个)
autoInsuranceCtrls.controller('rechargeCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '清单';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.homepage');
	};
	$rootScope.marks = "shopCarPage";
	//“全部”按钮
	$scope.checkAlls = true;
	$scope.checkAll = function() {
		if($scope.checkAlls == true) {
			$scope.checkAlls = false;
			for(var i = 0; i < $scope.shopCars.length; i++) {
				$scope.shopCars[i].whether = false;
			}
		} else {
			$scope.checkAlls = true;
			for(var i = 0; i < $scope.shopCars.length; i++) {
				$scope.shopCars[i].whether = true;
			}
		}
	};
	//点击单个
	$scope.checkOne = function(index) {
			console.log("点击了checkbox！");
			console.log("index的值：" + index);
			if($scope.shopCars[index].whether == false) {
				$scope.shopCars[index].whether = true;
			} else {
				$scope.shopCars[index].whether = false;
				$scope.checkAlls = false;
			}
		}
		//清单列表数据
	$scope.shopCars = [];
	$scope.shopCarlist = true;
	var token = "373f318821c63640c2578eb0574647e983feca381c738290";
	var promise = $http({
		url: 'http://42.62.53.158:8080/shop/api/' + 'order/cart/list',
		method: 'POST',
		params: {
			token: token,
			page: "1"
		}
	}).success(function(data, header, config, status) {
		console.log("返回成功");
		//响应成功
	}).error(function(data, header, config, status) {
		console.log("返回失败");
		//处理响应失败
	});
	promise.then(
		// 通讯成功的处理
		function(answer) {
			var data = answer;
			console.log("购物车列表：" + JSON.stringify(data));
			var cartVos = data.data.data.cartVos;
			if(cartVos.length > 0) {
				console.log("购物车长度大于零");
				$scope.shopCarlist = true;
				for(var i = 0; i < cartVos.length; i++) {
					console.log("cartVos[i].goodsReleaseId的值：" + cartVos[i].goodsReleaseId);
					var shopCar = {
						cId: cartVos[i].cId,
						goodsIds: cartVos[i].goodsReleaseId,
						imgUrl: cartVos[i].goodsIcon,
						goodsName: cartVos[i].goodsName.substr(0, 10) + '...',
						tatleNum: cartVos[i].totalStock,
						othersNum: cartVos[i].usableStock,
						goodsNumber: "5",
						whether: true
					};
					$scope.shopCars.push(shopCar);
				}
				$scope.$digest();
			} else {
				$scope.shopCarlist = false;
				$rootScope.tabBar = true;
			}
		},
		function(error) {
			console.log("error");
			$scope.error = error;
		});
	//总计夺宝比数量
	$scope.duobaobi = function() {
		var total = 0;
		for(var i = 0; i < $scope.shopCars.length; i++) {
			total += Number($scope.shopCars[i].goodsNumber);
		}
		console.log("需要的夺宝比数量：" + total);
		return total;
	};
	//“全部”按钮
	$scope.checkAlls = true;
	$scope.checkAll = function() {
		if($scope.checkAlls == true) {
			$scope.checkAlls = false;
			for(var i = 0; i < $scope.shopCars.length; i++) {
				$scope.shopCars[i].whether = false;
			}
		} else {
			$scope.checkAlls = true;
			for(var i = 0; i < $scope.shopCars.length; i++) {
				$scope.shopCars[i].whether = true;
			}
		}
	};
	//点击单个
	$scope.checkOne = function(index) {
		console.log("点击了checkbox！");
		console.log("index的值：" + index);
		if($scope.shopCars[index].whether == false) {
			$scope.shopCars[index].whether = true;
		} else {
			$scope.shopCars[index].whether = false;
			$scope.checkAlls = false;
		}
	}

	//滑动删除
	var token = "373f318821c63640c2578eb0574647e983feca381c738290";
	$scope.removeItems = function(index) {
			var uncomorderno = $scope.shopCars[index].cId;
			console.log("商品ID是：" + uncomorderno);
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/' + 'order/delete/cart',
				method: 'POST',
				params: {
					cartId: uncomorderno,
					token: token
				}
			}).success(function(data, header, config, status) {
				console.log("返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					var data = answer;
					console.log("删除列表 ：" + JSON.stringify(data));
					var code = data.data.code;
					if(code == "0") {
						//						plus.nativeUI.toast( "商品删除成功!",{verticalAlign:"top"});
						alert("商品删除成功!");
						$state.go('main.shoppingCar', null, {
							reload: true
						});
					} else {
						//						plus.nativeUI.toast( "商品删除失败!",{verticalAlign:"top"});
						alert("商品删除失败!");
					}
				},
				function(error) {
					console.log("error");
					$scope.error = error;
				});
		}
		//马上夺宝按钮
	$scope.goshpping = function() {
			$state.go('main.homepage');
		}
		//赋初始值
		//		$scope.shopCar={goodsNumber:5};
		//加减逻辑
	$scope.subtract = function(index) {
		var goodsNumber = $scope.shopCars[index].goodsNumber;
		if(goodsNumber > 1) {
			goodsNumber--;
		}
		$scope.shopCars[index].goodsNumber = goodsNumber;
	}
	$scope.add = function(index) {
		var goodsNumber = $scope.shopCars[index].goodsNumber;
		if(goodsNumber < $scope.shopCars[index].othersNum) {
			goodsNumber++;
			$scope.shopCars[index].goodsNumber = goodsNumber;
		}
	}
	$scope.allIn = function(index) { //包尾
		//点击直接将返回的剩余量
		//			$scope.shopCars[index].baowei={
		//						"background-color":"#D43047", 
		//						"color":"white",
		//							}
		$scope.shopCars[index].goodsNumber = $scope.shopCars[index].othersNum;
	}

	//调用清单详情列表
	//	=========================操作数据库加载数据=======================
	//	var shoppinglistVos=[];
	//	$scope.duobaobi=0;
	//	$scope.shopCars=[];
	//	var sql="SELECT * FROM shoppingCar";
	//	db.transaction(function(context){
	//		context.executeSql(sql,[],function(tx,result){
	//		$scope.shopCarlist=true;
	//		console.log("进入查询");
	//		    if(result.rows.length>0){
	//		    	var len = result.rows.length;
	//			$scope.shoppingCar={
	//						goodsType:len,
	//						}
	//		    		console.log("长度大于零");
	//		        for(var i=0;i<result.rows.length;i++){
	//		        		console.log("进入循环");
	//				   shoppinglistVos.push(result.rows.item(i));  
	//		    		}
	//				console.log("查询结果："+JSON.stringify(shoppinglistVos));
	//		        for (var m = 0; m < shoppinglistVos.length; m++) {
	//						console.log("进入购物车循环");
	//						var goodsReleaseBosVo = shoppinglistVos[m];
	//						var shopCar = {
	//							goodsIds:goodsReleaseBosVo.goodsIds,
	//							imgUrl: goodsReleaseBosVo.goodsIcon,
	//							goodsName: goodsReleaseBosVo.goodsName.substr(0, 10) + '...',
	//							tatleNum: "1000",
	//							othersNum: "650",
	//							goodsNumber:5,
	//							whether:true
	//						};
	//						$scope.shopCars.push(shopCar);
	//						$scope.$digest();
	////						$scope.duobaobi+=$scope.shopCars[m].goodsNumber;
	//					}
	//					console.log("购物车："+JSON.stringify($scope.shopCars));
	//			}else{
	//				console.log("长度小于1.");
	//				$scope.shopCarlist=false;
	//				$rootScope.tabBar = true;
	//			}
	//		});
	//	});
	//	=========================操作数据库加载数据=======================
	//	//总计夺宝比数量
	//  $scope.duobaobi = function(){
	//		var totals=0;
	//      for(var i=0;i<$scope.shopCars.length;i++){
	//      		totals+=Number($scope.shopCars[i].goodsNumber);
	//      }
	//      console.log("需要的夺宝比数量："+totals);
	//      return  totals ;
	//    };
	//
	//		//滑动删除
	//		var unremoveCheck=[];
	//	    var removeCheck=[];
	//		$scope.removeItems=function(index){
	//			console.log("index的值;"+index);
	//			var uncomorderno = $scope.shopCars[index].goodsIds;
	//			var sql = 'DELETE  FROM shoppingCar where goodsIds=?';
	//			db.transaction(function(tx){
	//				tx.executeSql(sql,[uncomorderno],function(){
	//				   $state.go('main.shoppingCar',{}, {reload: true}); //刷新本页面
	//				   $scope.$digest();
	//			       console.log("删除购物车成功");
	//			  },function(tx,error){
	//			    	   console.log("删除购物车失败失败"+error.message);
	//			    	 });
	//			});
	//	    	}
	//		
	//		//马上夺宝按钮
	//		$scope.goshpping=function(){
	//			$state.go('main.homepage');
	//		}
	//		//赋初始值
	////		$scope.shopCar={goodsNumber:5};
	//		//加减逻辑
	//		$scope.subtract=function(index){
	//			var goodsNumber = $scope.shopCars[index].goodsNumber;
	//			if(goodsNumber>1){
	//			goodsNumber--;
	//			}
	//			$scope.shopCars[index].goodsNumber=goodsNumber;
	//		}
	//		$scope.add=function(index){
	//			var goodsNumber = $scope.shopCars[index].goodsNumber;
	//			if(goodsNumber<$scope.shopCars[index].othersNum){
	//			goodsNumber++;
	//			$scope.shopCars[index].goodsNumber=goodsNumber;	
	//			}
	//		}
	//		$scope.allIn=function(index){//包尾
	//			//点击直接将返回的剩余量
	//			$scope.shopCars[index].goodsNumber=$scope.shopCars[index].othersNum;
	//		}
	//		$scope.checkIn=function(){
	//			$state.go('main.shoppingPay');
	//		}
}]);
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//购买页面
autoInsuranceCtrls.controller('shoppingPayCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '订单支付';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main');
	};
	//	//查询购物车===============
	//	var token="373f318821c63640c2578eb0574647e983feca381c738290";
	//	var promise = $http({
	//			url: 'http://42.62.53.158:8080/shop/api/' + 'order/cart/list/size',
	//			method: 'POST',
	//			params: {
	//				token:token
	//			}
	//		}).success(function(data, header, config, status) {
	//			console.log("最新最快最热商品返回成功");
	//			//响应成功
	//		}).error(function(data, header, config, status) {
	//			console.log("最新最快最热商品返回失败");
	//			//处理响应失败
	//		});
	//		promise.then(
	//			// 通讯成功的处理
	//			function(answer) {
	//			console.log("处理最新最快最热商品");
	//			var data = answer;
	//			console.log("购物车查询成功："+JSON.stringify(data));
	////			var code = data.data.code;
	////			if(code=="0"){
	////				plus.nativeUI.toast( "已成功添加到清单!",{verticalAlign:"bottom"});
	////			}
	////			if(code=="-1000"){
	////				plus.nativeUI.toast( "请您进行登录!",{verticalAlign:"bottom"});
	////				$state.go('main.login');
	////			}
	//	},
	//	function(error) {
	//		console.log("error");
	//		$scope.error = error;
	//	});
	var amounts = $rootScope.amount; //取出金额
	$scope.pay = {
		amount: amounts
	}; //支付总额
	console.log("唯一标识符：" + $rootScope.marks);
	if($rootScope.marks == "mainPage") {
		console.log("直接购买商品！");
		var cartIds = $rootScope.cartIds;
		var token = "373f318821c63640c2578eb0574647e983feca381c738290";
		console.log("amount的值：" + amounts);
		$scope.payAmount = function() {
			console.log("获取的cartIds的值：" + cartIds);
			console.log("进入支付：");
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/' + 'pay/goods/money/buy',
				method: 'POST',
				params: {
					token: token,
					cartIds: cartIds
				}
			}).success(function(data, header, config, status) {
				console.log("返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("返回失败");
				//处理响应失败
			});
			//===============================商品查询页列表接口begin====================
			promise.then(function(answer) {
					var data = answer;
					if(data != null && data != "") {
						var code = data.data.code;
						console.log("支付成功：" + JSON.stringify(data));
						if(code == "0") {
							//							plus.nativeUI.toast( "支付成功!",{verticalAlign:"top"});
							alert("支付成功!");
							window.location.href = "partials/successPay.html";
						}
					}
				},
				function(error) {
					console.log("error");
					$scope.error = error;
				});
		}
	}
	if($rootScope.marks == "shopCarPage") {
		console.log("购物车支付购买商品！");
		var detailId = $rootScope.detailId;
		var goodsIds = $rootScope.goodsIds;
		var cartIds = goodsIds;
		var token = "373f318821c63640c2578eb0574647e983feca381c738290";
		console.log("amount的值：" + amounts);
		$scope.payAmount = function() {
			console.log("获取的cartIds的值：" + cartIds);
			console.log("进入支付：");
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/' + 'pay/goods/money/buy',
				method: 'POST',
				params: {
					token: token,
					cartIds: cartIds
				}
			}).success(function(data, header, config, status) {
				console.log("返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("返回失败");
				//处理响应失败
			});
			//===============================商品查询页列表接口begin====================
			promise.then(function(answer) {
					var data = answer;
					if(data != null && data != "") {
						console.log("商品搜索列表页");
						console.log(JSON.stringify(data));
						console.log("商品搜索列表页");

					}
				},
				function(error) {
					console.log("error");
					$scope.error = error;
				});
		}
	}

}]);
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//支付成功
autoInsuranceCtrls.controller('shoppingPaySuccessCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '订单支付';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.shoppingPay');
	};

}]);
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//商品分类展示页
autoInsuranceCtrls.controller('goodsSerchCtrl', ['$rootScope', '$scope', '$state', '$http', 'mySearch', function($rootScope, $scope, $state, $http, mySearch) {
	$rootScope.appTitle = '';
	$rootScope.tabBar = false;
	$rootScope.headder = false;
	$rootScope.qiandao = false;
	$rootScope.hideBack = true;
	$rootScope.goodsSerch = true;
	$rootScope.gouwuche = false;
	$scope.hedeaders = false;
	$scope.goodSchs = [];
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.homepage');
	};
	mui('.mui-scroll-wrapper').scroll({
		bounce: true,
		indicators: false, //是否显示滚动条
		deceleration: 0.0003
	});
	$scope.goserch = function() {
		$state.go('main.search');
	}
	$rootScope.gouwuches = function() {
		console.log("======userId的值：" + userId);
		//			selectShoCarList();
		$state.go('main.shoppingCar');
	}
	mui.init({
		swipeBack: true //启用右滑关闭功能
	});
	var controls = document.getElementById("segmentedControls");
	var contents = document.getElementById("segmentedControlContents");
	var html = [];
	var i = 1,
		j = 1,
		m = 16, //左侧选项卡数量+1
		n = 21; //每个选项卡列表数量+1
	for(; i < m; i++) {
		html.push('<a class="mui-control-item" href="#content' + i + '">选项' + i + '</a>');
	}
	controls.innerHTML = html.join('');
	html = [];
	for(i = 1; i < m; i++) {
		html.push('<div id="content' + i + '" class="mui-control-content"><ul class="mui-table-view">');
		for(j = 1; j < n; j++) {
			html.push(
				'<li class="mui-table-view-cell" style="height: 80px;border-bottom:1px solid #999 ;" >'
				//							ng-repeat="goodSch in goodSchs"
				+
				'<div ng-click="godetail($index)" style="float: left;width: 30%;margin-top: -4px;margin-left: -8px;">' +
				'<img src="'
				//							+goodSch.goodsIcon
				+
				'images/165580345911805887.jpg' +
				'" style="width: 65px;height: 65px;padding: 0px;"/>' +
				'</div>' +
				'<div ng-click="godetail($index)" style="float: left;width: 60%;margin-top: -2px;margin-left: 8px;">' +
				'<h5 style="color: #000000;">'
				//							+goodSch.goodsName
				+
				'老司机上来' +
				'</h5>' +
				'<div class="loading" style="margin-top: 8px;">' +
				'<div id="progress" ng-style="progress">' +
				'</div>' +
				'</div>' +
				'<div id="">' +
				'<span style="font-size: 12px;white-space:nowrap;color: #999; ">' +
				'总需：'
				//							+goodSch.goodsTotle
				+
				'1000' +
				'</span>' +
				'<span style="font-size: 12px;color: #999;white-space:nowrap;">' +
				'&nbsp;&nbsp;剩余：'
				//							+goodSch.goodsSurplus
				+
				'200' +
				'</span>' +
				'</div>' +
				'</div>' +
				'<div   style="float:right ; margin-top: -55px;margin-right: -10px; ">' +
				'<img ng-click="goShopping($index)" src="img/gouwuchehong.png" style="width: 35px;height: 35px;"/>' +
				'</div>' +
				'</li>'
			);
		}
		html.push('</ul></div>');
	}
	contents.innerHTML = html.join('');
	//默认选中第一个
	controls.querySelector('.mui-control-item').classList.add('mui-active');
	contents.querySelector('.mui-control-content').classList.add('mui-active');
	//跳转逻辑，详情页，进行中
	$scope.godetail = function(index) {
			console.log("index的值：" + index);
			$rootScope.detailId = $scope.goodSchs[index].id;
			$rootScope.goodsIds = $scope.goodSchs[index].goodsId;
			localStorage.removeItem("detailFlag");
			localStorage.setItem("detailFlag", "0");
			$rootScope.shoppingList = $rootScope.lists[index]; //购物清单信息
			$state.go('main.goodsDetails');
		}
		//===============================商品查询页列表接口begin====================
	mySearch.getData().then(function(answer) {
			var data = answer;
			if(data != null && data != "") {
				console.log("商品搜索列表页");
				console.log(JSON.stringify(data));
				console.log("商品搜索列表页");
				var lists = data.data.data.list;
				var countPage = data.data.data.countPage;
				//============下方列表============
				for(var i = 0; i < lists.length; i++) {
					//console.log("进入循环");
					var listsVo = lists[i];
					$rootScope.lists = lists;
					//----------进度条样式begin----------
					var width = listsVo.precent;
					//						console.log("lkdjsakljdklsajkldslk："+listsVo.precent);
					//						var width = (listsVo.totalStock-listsVo.usableStock)/listsVo.totalStock+"%";
					//给进度条赋值
					$scope.progress = {
							"width": width,
							"height": "100%",
							"background-color": "#666",
							"background": "-webkit-gradient(linear, 0 0, 0 100%, from(#d43047), color-stop(1, #d43047), to(#d43047))",
							"border-radius": "10px"
						}
						//----------进度条样式end----------
						//					console.log(JSON.stringify(goodsReleaseBosVo));
					var goodSch = {
						goodsIcon: listsVo.goodsIcon,
						goodsName: listsVo.goodsName.substr(0, 8) + '...',
						goodsTotle: listsVo.totalStock,
						goodsSurplus: listsVo.totalStock - listsVo.usableStock,
						id: listsVo.id,
						goodsId: listsVo.goodsId,
					};
					//					console.log("----------complete----------" + JSON.stringify(goodSch));
					$scope.goodSchs.push(goodSch);
					//					$scope.$digest();
				}
				//============下方列表============
			}
		},
		function(error) {
			console.log("error");
			$scope.error = error;
		}
	);
	//===============================商品查询页列表接口end====================
	//监控滚动条
	var page = 2;
	$scope.iscroll = false;
	var countPage = 0;
	$(window).scroll(function() {
		if($(document).scrollTop() < 1) { //标题栏
			$scope.hedeaders = false;
			$scope.$apply();
		}
		if($(document).scrollTop() > 40) {
			$scope.hedeaders = true;
			$scope.$apply();
		}
		if($(document).scrollTop() > 100) { //返回顶部
			$scope.backTops = true;
			$scope.$apply();
		}
		if($(document).scrollTop() < 100) {
			$scope.backTops = false;
			$scope.$apply();
		}
		if(($(window).height() + $(window).scrollTop()) >= $("body").height()) {
			if($scope.iscroll) {
				return;
			}
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/' + 'goods/list',
				method: 'POST',
				params: {
					field: "null",
					categoryId: 0,
					page: page
				}
			}).success(function(data, header, config, status) {
				console.log("返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					//在这里可以对返回的数据集做一定的处理,再交由controller进行处理
					//					answer.status = true;
					//					deferred.resolve(answer);
					//===============================商品查询页列表接口begin====================
					var data = answer;
					if(data != null && data != "") {
						console.log("商品搜索列表页");
						console.log(JSON.stringify(data));
						console.log("商品搜索列表页");
						var lists = data.data.data.list;
						countPage = data.data.data.countPage;
						console.log("此处的countPage：" + countPage);
						//============下方列表============
						for(var i = 0; i < lists.length; i++) {
							//					console.log("进入循环");
							var listsVo = lists[i];
							$rootScope.lists = lists;
							//----------进度条样式begin----------
							//									var width = "60%";
							var width = listsVo.precent;
							//给进度条赋值
							$scope.progress = {
									"width": width,
									"height": "100%",
									"background-color": "#666",
									"background": "-webkit-gradient(linear, 0 0, 0 100%, from(#d43047), color-stop(1, #d43047), to(#d43047))",
									"border-radius": "10px"
								}
								//----------进度条样式end----------
								//					console.log(JSON.stringify(goodsReleaseBosVo));
							var goodSch = {
								goodsIcon: listsVo.goodsIcon,
								goodsName: listsVo.goodsName.substr(0, 8) + '...',
								goodsTotle: listsVo.totalStock,
								goodsSurplus: listsVo.totalStock - listsVo.usableStock,
							};
							//					console.log("----------complete----------" + JSON.stringify(goodSch));
							$scope.goodSchs.push(goodSch);
							//					$scope.$digest();
						}
						console.log("page的值：" + page);
						console.log("countPage的值：" + countPage);
						if(page < countPage) {
							console.log("我确实是小");
							page = page + 1;
							console.log("page的值之后：" + page);
							console.log("countPage的值之后：" + countPage);
						} else {
							$scope.iscroll = true;
						}
						console.log("$scope.iscroll的值之后：" + $scope.iscroll);
						//============下方列表============
					}
				},
				function(error) {
					console.log("error");
					$scope.error = error;
					//===============================商品查询页列表接口end====================
				},
				// 通讯失败的处理
				function(error) {
					// 可以先对失败的数据集做处理，再交由controller进行处理
					error.status = false;
					deferred.reject(error);
				});
			console.log("到家啦哪里；萨克斯大门口了");
		}
		$scope.$digest();
	});
	//手动控制popver
	$scope.popvers1 = function() {
		mui('.mui-popover').popover('toggle', document.getElementById("topPopover"));
	}
	$scope.backTop = function() { //返回顶部
			window.scrollTo(0, 0);
		}
		//加入清单
	$scope.goShopping = function(index) {
		//		console.log("加入清单");
		//		var userId=$rootScope.lists[index].goodsId;
		//本地数据库的购物车
		//		console.log("获取的Id："+userId);
		//		var id=getIdByTime();
		//		var shopCarList = $rootScope.lists[index];
		//		console.log("shoppinglist集合："+JSON.stringify(shopCarList));
		//		console.log("进入selectGoodsId方法,userId："+userId);
		//	//	查库
		//		var sql="SELECT * FROM shoppingCar where goodsIds=?";
		//		db.transaction(function(tx){
		//			tx.executeSql(sql,[userId],function(tx,result){
		//			    if(result.rows.length > 0){
		//			    			console.log("length大于零");
		//						plus.nativeUI.toast( "已成功添加到清单!",{verticalAlign:"bottom"});
		//				}else{
		//	//				insertShopCar(shopCarList,userId);
		//					console.log("length等于零");
		//					tx.executeSql('INSERT INTO shoppingCar (id,goodsIds,goodsIcon,goodsName,goodsTotal,goodsThen,remark) values(?,?,?,?,?,?,?)'
		//					,[id,userId,shopCarList.goodsIcon,shopCarList.goodsName,shopCarList.totalStock,shopCarList.periods,""],function(){
		//						console.log("插入shoppingCar成功");
		//						plus.nativeUI.toast( "已成功添加到清单!",{verticalAlign:"bottom"});
		//					},function(tx,error){
		//						console.log("插入insertShopCar表失败:"+error.message);
		//					});
		//			    	}
		//			});
		//		});
		//		var goodsReleaseId=$rootScope.detailId;
		//		var buyCount=$rootScope.amount;
		var goodsReleaseId = $scope.goodSchs[index].id;
		var token = "373f318821c63640c2578eb0574647e983feca381c738290";
		var promise = $http({
			url: 'http://42.62.53.158:8080/shop/api/' + 'order/save/cart',
			method: 'POST',
			params: {
				goodsReleaseId: goodsReleaseId,
				buyCount: "1",
				token: token
			}
		}).success(function(data, header, config, status) {
			console.log("返回成功");
			//响应成功
		}).error(function(data, header, config, status) {
			console.log("返回失败");
			//处理响应失败
		});
		promise.then(
			// 通讯成功的处理
			function(answer) {
				var data = answer;
				if(data != null && data != "") {
					console.log("清单列表是：" + JSON.stringify(data));
					var lists = data.data.data.list;
					var code = data.data.code;
					if(code == "0") {
						//						plus.nativeUI.toast( "搜索内容不能为空!",{verticalAlign:"top"});
						alert("搜索内容不能为空!");
					}
					if(code == "-1000") {
						//						plus.nativeUI.toast( "请您先登录!",{verticalAlign:"top"});
						alert("请您先登录!");
						$state.go('main.login');
					}
					if(code == "-1053") {
						//						plus.nativeUI.toast( "商品已在购物车" ,{verticalAlign:"top"});
						alert("商品已在购物车!");
					}
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			});
	}
}]);
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//搜索页面
autoInsuranceCtrls.controller('searchCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '搜索';
	$rootScope.tabBar = false;
	$rootScope.headder = false;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	$scope.keywordsList = false;
	console.log("进入热词搜索页面");
	//返回逻辑
	$rootScope.back = function() {
		//		$state.go('main.goodsSerch');
		window.location.href = "partials/goodsDemo.html";
	};

	mui('.mui-scroll-wrapper').scroll({
		bounce: true,
		indicators: false, //是否显示滚动条
		deceleration: 0.0003
	});

	//离开输入域触发blur
	//	$scope.searchOut = function() {
	//		console.log("触发ng-blur，填写内容："+$scope.keyWords);
	//		if(($scope.keyWords == null)||($scope.keyWords == "")){
	//			plus.nativeUI.toast( "搜索内容不能为空!",{verticalAlign:"top"});
	//	   	}else{
	//	   		$rootScope.searchConyain=$scope.keyWords ;
	//	   		console.log("触发ng-blur，填写内容："+$scope.keyWords);
	//	   	}
	//	}
	var lists = [];
	var promise = $http({
		url: 'http://42.62.53.158:8080/shop/api/' + 'goods/hot/word/list',
		method: 'POST',
		params: {

		}
	}).success(function(data, header, config, status) {
		console.log("返回成功");
		//响应成功
	}).error(function(data, header, config, status) {
		console.log("返回失败");
		//处理响应失败
	});
	promise.then(
		// 通讯成功的处理
		function(answer) {
			var data = answer;
			if(data != null && data != "") {
				console.log("搜索关键词：" + JSON.stringify(data));
				lists = data.data.data.list;
				if(lists[1] != null && lists[1] != "") {
					$scope.keywordsList = true;
					for(var i = 0; i < lists.length; i++) {
						$scope.keyword = lists[i];
					}
				} else {
					$scope.keywordsList = false;
				}
			}
		},
		function(error) {
			console.log("error");
			$scope.error = error;
		});

	//查找按钮
	$rootScope.gogoodsList = function() {
		console.log("点击按钮" + $scope.keyWords);
		if(($scope.keyWords == null) || ($scope.keyWords == "")) {
			//			plus.nativeUI.toast( "搜索内容不能为空!",{verticalAlign:"top"});
			alert("搜索内容不能为空!");
		} else {
			$rootScope.keys = $scope.keyWords;
			$state.go('main.goodsList');
		}
	}

	$rootScope.hotWords = false; //热词初始值

	$scope.searchIn = function() { //输入框获取焦点逻辑
		document.body.style.overflow = 'hidden';
		$rootScope.hotWords = true;
	}

	$scope.searchOut = function() { //输入框失去焦点逻辑
		$rootScope.hotWords = false;
	}

	//	$scope.gogoodsList=function(){
	//		$rootScope.keys=$scope.keyWords;
	//	}

	// 强制弹出软键盘
	function showKeyboard() {
		if(mui.os.ios) {
			console.log("检测到手机为iphone。");
			var webView = plus.webview.currentWebview().nativeInstanceObject();
			webView.plusCallMethod({
				"setKeyboardDisplayRequiresUserAction": false
			});
			console.log("iphone键盘弹出");
		} else if(mui.os.android) {
			console.log("检测到手机为安卓。");
			var Context = plus.android.importClass("android.content.Context");
			var InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
			var main = plus.android.runtimeMainActivity();
			var imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
			imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
		}
	};
	showKeyboard();
}]);
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//商品列表展示页
autoInsuranceCtrls.controller('goodsListCtrl', ['$rootScope', '$scope', '$state', '$http', 'mySearch', function($rootScope, $scope, $state, $http, mySearch) {
	$rootScope.appTitle = '';
	$rootScope.tabBar = true;
	$rootScope.headder = false;
	$rootScope.qiandao = false;
	$rootScope.hideBack = true;
	$rootScope.goodsSerch = true;
	$rootScope.gouwuche = false;
	$scope.hedeaders = false;
	$scope.goodSchs = [];
	console.log("进入了商品列表展示页");
	//返回逻辑
	$rootScope.back = function() {
		//		$state.go('main.search');
		window.location.href = "partials/goodsDemo.html";
	};
	$scope.keyWords = $rootScope.keyWords;
	//跳转逻辑，详情页，进行中
	$scope.godetail = function(index) {
			console.log("index的值：" + index);
			$rootScope.detailId = $scope.goodSchs[index].id;
			$rootScope.goodsIds = $scope.goodSchs[index].goodsId;
			localStorage.removeItem("detailFlag");
			localStorage.setItem("detailFlag", "0");
			$state.go('main.goodsDetails');
		}
		//	$scope.goShopping=function(){
		//		
		//	}
	var keys = $rootScope.keys;
	console.log("++++++++" + keys);
	var promise = $http({
		url: 'http://42.62.53.158:8080/shop/api/' + 'goods/list',
		method: 'POST',
		params: {
			categoryId: 0,
			name: keys,
			page: 1
		}
	}).success(function(data, header, config, status) {
		console.log("返回成功");
		//响应成功
	}).error(function(data, header, config, status) {
		console.log("返回失败");
		//处理响应失败
	});
	//===============================商品查询页列表接口begin====================
	promise.then(function(answer) {
			var data = answer;
			if(data != null && data != "") {
				console.log("商品搜索列表页");
				console.log(JSON.stringify(data));
				console.log("商品搜索列表页");
				var lists = data.data.data.list;
				var countPage = data.data.data.countPage;
				//============下方列表============
				for(var i = 0; i < lists.length; i++) {
					//					console.log("进入循环");
					var listsVo = lists[i];
					//----------进度条样式begin----------
					var width = listsVo.percent;
					console.log("lkdjsakljdklsajkldslk：" + width);
					//						var width = (listsVo.totalStock-listsVo.usableStock)/listsVo.totalStock+"%";
					//给进度条赋值
					$scope.progress = {
							"width": width,
							"height": "100%",
							"background-color": "#666",
							"background": "-webkit-gradient(linear, 0 0, 0 100%, from(#d43047), color-stop(1, #d43047), to(#d43047))",
							"border-radius": "10px"
						}
						//----------进度条样式end----------
						//					console.log(JSON.stringify(goodsReleaseBosVo));
					var goodSch = {
						goodsIcon: listsVo.goodsIcon,
						goodsName: listsVo.goodsName.substr(0, 8) + '...',
						goodsTotle: listsVo.totalStock,
						goodsSurplus: listsVo.totalStock - listsVo.usableStock,
						id: listsVo.id,
						goodsId: listsVo.goodsId,
					};
					//					console.log("----------complete----------" + JSON.stringify(goodSch));
					$scope.goodSchs.push(goodSch);
					//					$scope.$digest();
				}
				//============下方列表============
			}
		},
		function(error) {
			console.log("error");
			$scope.error = error;
		}
	);
	//===============================商品查询页列表接口end====================
	//监控滚动条
	var page = 2;
	$scope.iscroll = false;
	var countPage = 0;
	$(window).scroll(function() {
		if($(document).scrollTop() < 1) { //标题栏
			$scope.hedeaders = false;
			$scope.$apply();
		}
		if($(document).scrollTop() > 40) {
			$scope.hedeaders = true;
			$scope.$apply();
		}
		if($(document).scrollTop() > 100) { //返回顶部
			$scope.backTops = true;
			$scope.$apply();
		}
		if($(document).scrollTop() < 100) {
			$scope.backTops = false;
			$scope.$apply();
		}
		if(($(window).height() + $(window).scrollTop()) >= $("body").height()) {
			if($scope.iscroll) {
				return;
			}
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/' + 'goods/list',
				method: 'POST',
				params: {
					categoryId: 0,
					name: keys,
					page: page
				}
			}).success(function(data, header, config, status) {
				console.log("返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					//在这里可以对返回的数据集做一定的处理,再交由controller进行处理
					//					answer.status = true;
					//					deferred.resolve(answer);
					//===============================商品查询页列表接口begin====================
					var data = answer;
					if(data != null && data != "") {
						console.log("商品搜索列表页");
						console.log(JSON.stringify(data));
						console.log("商品搜索列表页");
						var lists = data.data.data.list;
						countPage = data.data.data.countPage;
						console.log("此处的countPage：" + countPage);
						//============下方列表============
						for(var i = 0; i < lists.length; i++) {
							//					console.log("进入循环");
							var listsVo = lists[i];
							//----------进度条样式begin----------
							//									var width = "60%";
							var width = listsVo.usableStock / listsVo.totalStock + "%";
							//给进度条赋值
							$scope.progress = {
									"width": width,
									"height": "100%",
									"background-color": "#666",
									"background": "-webkit-gradient(linear, 0 0, 0 100%, from(#d43047), color-stop(1, #d43047), to(#d43047))",
									"border-radius": "10px"
								}
								//----------进度条样式end----------
								//					console.log(JSON.stringify(goodsReleaseBosVo));
							var goodSch = {
								goodsIcon: listsVo.goodsIcon,
								goodsName: listsVo.goodsName.substr(0, 8) + '...',
								goodsTotle: listsVo.totalStock,
								goodsSurplus: listsVo.totalStock - listsVo.usableStock,
							};
							//					console.log("----------complete----------" + JSON.stringify(goodSch));
							$scope.goodSchs.push(goodSch);
							//					$scope.$digest();
						}
						console.log("page的值：" + page);
						console.log("countPage的值：" + countPage);
						if(page < countPage) {
							console.log("我确实是小");
							page = page + 1;
							console.log("page的值之后：" + page);
							console.log("countPage的值之后：" + countPage);
						} else {
							$scope.iscroll = true;
						}
						console.log("$scope.iscroll的值之后：" + $scope.iscroll);
						//============下方列表============
					}
				},
				function(error) {
					console.log("error");
					$scope.error = error;
					//===============================商品查询页列表接口end====================
				},
				// 通讯失败的处理
				function(error) {
					// 可以先对失败的数据集做处理，再交由controller进行处理
					error.status = false;
					deferred.reject(error);
				});
			console.log("到家啦哪里；萨克斯大门口了");
		}
		$scope.$digest();
	});
	//手动控制popver
	$scope.popvers1 = function() {
		mui('.mui-popover').popover('toggle', document.getElementById("topPopover"));
	}
	$scope.backTop = function() { //返回顶部
		window.scrollTo(0, 0);
	}

}]);

//--------------------------------------------------------------------------------------------------------------------------------
//最新揭晓列表页面
autoInsuranceCtrls.controller('goodsMoreListCtrl', ['$rootScope', '$scope', '$state', '$http', 'myNewMore', function($rootScope, $scope, $state, $http, myNewMore) {
	$rootScope.appTitle = '最新揭晓';
	$rootScope.tabBar = true;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	$scope.anouncings = [];
	$scope.anounceds = [];
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.homepage');
	};
	//跳转到详情页（已揭晓）
	$scope.godetail = function(index) {
			console.log("index的值：" + index);
			$rootScope.goodsIds = $scope.anounceds[index].periods;
			$rootScope.detailId = $scope.anounceds[index].goodsReleaseId;
			localStorage.removeItem("detailFlag");
			localStorage.setItem("detailFlag", "1");
			$rootScope.shoppingList = $scope.anounceds[index]; //购物清单信息
			$state.go('main.goodsDetails');
		}
		//跳转到详情页（揭晓中）
	$scope.godetails = function(index) {
		console.log("index的值：" + index);
		$rootScope.goodsIds = $scope.anouncings[index].periods;
		$rootScope.detailId = $scope.anouncings[index].goodsReleaseId;
		localStorage.removeItem("detailFlag");
		localStorage.setItem("detailFlag", "2");
		$rootScope.shoppingList = $scope.anouncings[index]; //购物清单信息
		$state.go('main.goodsDetails');
	}

	//===============================最新揭晓列表接口begin====================
	myNewMore.getData().then(function(answer) {
			var data = answer;
			if(data != null && data != "") {
				//				console.log("最新揭晓页面：");
				//				console.log(JSON.stringify(data));
				//				console.log("最新揭晓页面：");
				var openingList = data.data.data.openingList; //正在揭晓
				var openedList = data.data.data.openedList; //已揭晓
				var countPage = data.data.data.countPage;
				if(openingList != []) {
					for(var i = 0; i < openingList.length; i++) {
						//							console.log("openingList的长度："+openingList.length);
						//							console.log("i的值："+i);
						var openingList = openingList[i];
						//							console.log(JSON.stringify(openingList[i]));
						var anouncing = {
							urlimg: openingList.goodsIcon,
							periods: openingList.goodsReleasePeriod,
							goodsName: openingList.goodsName.substr(0, 10) + '...',
							price: openingList.userCount,
							nunmerNo: openingList.userCount,
							userName: openingList.userName.substr(0, 6) + '...',
							personNum: openedList.totalStock,
							stopTime: openingList.openTime,
							headImg: openingList.userHeading,
							goodsReleaseId: openingList.goodsReleaseId
						};
						$scope.anouncings.push(anouncing);
					}
				}
				if(openedList != []) {
					for(var m = 0; m < openedList.length; m++) {
						//							console.log("openedList的长度："+openedList.length);
						//							console.log("m的值："+m);
						var openedListVo = openedList[m];
						//							console.log(JSON.stringify(openedListVo));
						var anounced = {
							urlimg: openedListVo.goodsIcon,
							periods: openedListVo.goodsReleasePeriod,
							goodsName: openedListVo.goodsName.substr(0, 10) + '...',
							price: openedListVo.totalStock,
							nunmerNo: openedListVo.treasureNo,
							userName: openedListVo.userName.substr(0, 6) + '...',
							personNum: openedListVo.totalStock,
							stopTime: openedListVo.openTime,
							headImg: openedListVo.userHeading,
							goodsReleaseId: openedListVo.goodsReleaseId
						};
						$scope.anounceds.push(anounced);
						//						console.log(JSON.stringify($scope.anounceds));
					}
				}
			}
		},
		function(error) {
			console.log("error");
			$scope.error = error;
		}
	);
	//===============================最新揭晓列表接口end====================
	//监控滚动条
	var page = 2;
	$scope.iscroll = false;
	var countPage = 0;
	$(window).scroll(function() {
		if(($(window).height() + $(window).scrollTop()) >= $("body").height()) {
			if($scope.iscroll) {
				return;
			}
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/' + 'goods/open/record/list',
				method: 'POST',
				params: {
					page: page
				}
			}).success(function(data, header, config, status) {
				console.log("返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					//===============================最新揭晓列表接口begin====================
					var data = answer;
					if(data != null && data != "") {
						//						console.log("最新揭晓页面：");
						//						console.log(JSON.stringify(data));
						//						console.log("最新揭晓页面：");
						var openingList = data.data.data.openingList;
						var openedList = data.data.data.openedList;
						countPage = data.data.data.countPage;
						if(openingList != []) {
							for(var i = 0; i < openingList.length; i++) {
								//											console.log("openingList的长度："+openingList.length);
								var openingList = openingList[i];
								//										console.log(JSON.stringify(openingList[i]));
								var anouncing = {
									urlimg: openingList.goodsIcon,
									periods: openingList.goodsReleasePeriod,
									goodsName: openingList.goodsName.substr(0, 10) + '...',
									price: openingList.userCount,
									nunmerNo: openingList.userCount,
									userName: openingList.userName.substr(0, 6) + '...',
									personNum: openedList.totalStock,
									stopTime: openingList.openTime,
									headImg: openingList.userHeading,
									goodsReleaseId: openingList.goodsReleaseId
								};
								//============================倒计时，计时器================================
								var addTimer = function() {
									var list = [],
										interval;

									return function(id, time) {
										if(!interval)
											interval = setInterval(go, 1000);
										list.push({
											ele: document.getElementById(id),
											time: time
										});
									}

									function go() {
										for(var i = 0; i < list.length; i++) {
											list[i].ele.innerHTML = getTimerString(list[i].time ? list[i].time -= 1 : 0);
											if(!list[i].time)
												list.splice(i--, 1);
										}
									}

									function getTimerString(time) {
										var not0 = !!time,
											h = Math.floor((time %= 86400) / 3600),
											m = Math.floor((time %= 3600) / 60),
											s = time % 60;
										if((h < 10) && (m >= 10) && (s >= 10)) {
											//						console.log("0" + h + ":" + m + ":" + s);
											var showtime = "0" + h + ":" + m + ":" + s;
											return showtime;
										}
										if((h < 10) && (m < 10) && (s >= 10)) {
											//console.log("0" + h + ":0" + m + ":" + s);
											var showtime = "0" + h + ":0" + m + ":" + s;
											return showtime;
										}
										if((h < 10) && (m < 10) && (s < 10)) {
											//console.log("0" + h + ":0" + m + ":0" + s);
											var showtime = "0" + h + ":0" + m + ":0" + s;
											return showtime;
										}
										if((h >= 10) && (m >= 10) && (s < 10)) {
											//						console.log("" + h + ":" + m + ":0" + s);
											var showtime = "" + h + ":" + m + ":0" + s;
											return showtime;
										}
										if((h >= 10) && (m < 10) && (s < 10)) {
											//						console.log("" + h + ":0" + m + ":0" + s);
											var showtime = "" + h + ":0" + m + ":0" + s;
											return showtime;
										}
										if((h >= 10) && (m < 10) && (s >= 10)) {
											//						console.log("" + h + ":0" + m + ":" + s);
											var showtime = "" + h + ":0" + m + ":" + s;
											return showtime;
										}
										if((h >= 10) && (m >= 10) && (s >= 10)) {
											//						console.log("" + h + ":" + m + ":" + s);
											var showtime = "" + h + ":" + m + ":" + s;
											return showtime;
										}
										if((h < 10) && (m >= 10) && (s < 10)) {
											//						console.log("0" + h + ":" + m + ":0" + s);
											var showtime = "0" + h + ":" + m + ":0" + s;
											return showtime;
										}
										if((h = 0) && (m = 0) && (s = 0)) {
											//						console.log("0" + h + ":0" + m + ":0" + s);
											var showtime = "0" + h + ":0" + m + ":0" + s;
											return showtime;
											clearInterval(addTimer);
										}
									}
								}();
								addTimer("one", 756);
								//============================倒计时，计时器================================
								//										console.log(JSON.stringify(anouncing));
								$scope.anouncings.push(anouncing);
							}
						}
						if(openedList != []) {
							for(var m = 0; m < openedList.length; m++) {
								//											console.log("openedList的长度："+openedList.length);
								var openedList = openedList[m];
								//										console.log(JSON.stringify(openedList));
								var anounced = {
									urlimg: openedList.goodsIcon,
									periods: openedList.goodsReleasePeriod,
									goodsName: openedList.goodsName.substr(0, 10) + '...',
									price: openedList.totalStock,
									nunmerNo: openedList.treasureNo,
									userName: openedList.userName.substr(0, 6) + '...',
									personNum: openedList.totalStock,
									stopTime: openedList.openTime,
									headImg: openedList.userHeading,
									goodsReleaseId: openedList.goodsReleaseId
								};
								//										console.log(JSON.stringify(anounced));
								$scope.anounceds.push(anounced);
							}
						}
						console.log("page的值：" + page);
						//										console.log("countPage的值：" + countPage);
						if(page < countPage) {
							//											console.log("我确实是小");
							page = page + 1;
							//											console.log("page的值之后：" + page);
							//											console.log("countPage的值之后：" + countPage);
						} else {
							$scope.iscroll = true;
						}
						//										console.log("$scope.iscroll的值之后：" + $scope.iscroll);
					}
					//===============================最新揭晓列表接口end====================
				},
				// 通讯失败的处理
				function(error) {
					// 可以先对失败的数据集做处理，再交由controller进行处理
					error.status = false;
					deferred.reject(error);
				});
			//			console.log("到家啦哪里；萨克斯大门口了");
		}
		$scope.$digest();
	});

}]);
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//商品详情页
autoInsuranceCtrls.controller('goodsDetailsCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '商品详情';
	$rootScope.tabBar = true;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = true;
	//赋初始值
	$scope.dakai = true;
	$scope.guanbi = false;
	$scope.JinXingZhong = false;
	$scope.JinXingZhongCanYu = false;
	$scope.JinXingZhongMeiCanYu = false;
	$scope.JieXiaoZhong = false;
	$scope.JieXiaoZhongCanYu = false;
	$scope.JieXiaoZhongMeiCanYu = false;
	$scope.YiJieXiao = false;
	$scope.YiJieXiaoCanYu = false;
	$scope.YiJieXiaoMeiCanYu = false;
	var skdkshj = window.location.href;
	console.log("URL:" + skdkshj);
	//赋初始值
	$scope.goodsNumber = 5;
	$rootScope.marks = "mainPage";
	//弹出框内部按钮逻辑
	$scope.subtract = function() {
		if($scope.goodsNumber > 1) {
			$scope.goodsNumber--;
		}
	}
	$scope.add = function() {
		$scope.goodsNumber++;
	}
	$scope.addten = function() {
		$scope.goodsNumber = $scope.goodsNumber + 10;
	}
	$scope.addfifty = function() {
		$scope.goodsNumber = $scope.goodsNumber + 50;
	}
	$scope.addhd = function() {
		$scope.goodsNumber = $scope.goodsNumber + 100;
	}
	$scope.adddl = function() {
			$scope.goodsNumber = $scope.goodsNumber + 1000;
		}
		//取出缓存中的flag标志位
	var detailFlag = localStorage.getItem("detailFlag");
	console.log("detailFlag的值是：" + detailFlag);
	//取出$rootScope中的清单列表
	var shopCarList = $rootScope.shoppingList;
	console.log("去除来的清单信息：" + JSON.stringify($rootScope.shoppingList));
	//获取商品ID
	var userId = $rootScope.detailId;
	console.log("代课老师带回家萨洛克倒计时啦空间的拉斯克奖：" + userId);
	$scope.goShop = function() { //点击加入购物车
			//调用本地方式完成加入购车
			//		var id=getIdByTime();
			//		console.log("进入selectGoodsId方法,userId："+userId);
			//		//	查库
			//		var sql="SELECT * FROM shoppingCar where goodsIds=?";
			//		db.transaction(function(tx){
			//			tx.executeSql(sql,[userId],function(tx,result){
			//			    if(result.rows.length > 0){
			//			    			console.log("length大于零");
			//						plus.nativeUI.toast( "已成功添加到清单!",{verticalAlign:"bottom"});
			//				}else{
			//					console.log("length等于零");
			//					tx.executeSql('INSERT INTO shoppingCar (id,goodsIds,goodsIcon,goodsName,goodsTotal,goodsThen,remark) values(?,?,?,?,?,?,?)'
			//					,[id,userId,shopCarList.goodsIcon,shopCarList.goodsName,shopCarList.goodsTotal,shopCarList.goodsThen,""],function(){
			//						console.log("插入shoppingCar成功");
			//						plus.nativeUI.toast( "已成功添加到清单!",{verticalAlign:"bottom"});
			//					},function(tx,error){
			//						console.log("插入insertShopCar表失败:"+error.message);
			//					});
			//			    	}
			//			});
			//		});
			//调用接口方式完成加入购车
			var token = "373f318821c63640c2578eb0574647e983feca381c738290";
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/' + 'order/save/cart',
				method: 'POST',
				params: {
					goodsReleaseId: $rootScope.detailId,
					buyCount: "1",
					token: token
				}
			}).success(function(data, header, config, status) {
				console.log("最新最快最热商品返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("最新最快最热商品返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					console.log("处理最新最快最热商品");
					var data = answer;
					console.log("购物车添加成功：" + JSON.stringify(data));
					var code = data.data.code;
					if(code == "0") {
						//						plus.nativeUI.toast( "已成功添加到清单!",{verticalAlign:"bottom"});
						alert("已成功添加到清单!");
					}
					if(code == "-1000") {
						//						plus.nativeUI.toast( "请您进行登录!",{verticalAlign:"bottom"});
						alert("请您进行登录!");
						$state.go('main.login');
					}
					if(code == "-1053") {
						//						plus.nativeUI.toast( "商品已在购物车!",{verticalAlign:"bottom"});
						alert("商品已在购物车!");
					}
				},
				function(error) {
					console.log("error");
					$scope.error = error;
				});
		}
		//进页面判断跳转来源，加载不同元素
	if(detailFlag == 0) { //进行中详情
		$scope.nowbegin = true;
		$scope.afterbegin = false;
		$scope.JinXingZhong = true;
		$scope.JinXingZhongCanYu = true;
		$scope.JinXingZhongMeiCanYu = false;
		$scope.selectNo = function() {

		}
		console.log("$rootScope.detailId 的值：" + $rootScope.detailId);
		//商品列表详情数据接口begin===============
		var promise = $http({
			url: 'http://42.62.53.158:8080/shop/api/' + 'goods/detail',
			method: 'POST',
			params: {
				id: $rootScope.detailId,
				token: ""
			}
		}).success(function(data, header, config, status) {
			console.log("最新最快最热商品返回成功");
			//响应成功
		}).error(function(data, header, config, status) {
			console.log("最新最快最热商品返回失败");
			//处理响应失败
		});
		promise.then(
			// 通讯成功的处理
			function(answer) {
				console.log("处理最新最快最热商品");
				var data = answer;
				$rootScope.goodsIds = data.data.data.goods.goodsId;
				console.log("最新最快最热商品：" + JSON.stringify(data));
				if(data != null && data != "") {
					var goods = data.data.data.goods;
					console.log("详情页");
					console.log(JSON.stringify(goods));
					console.log("详情页");
					$scope.details = {
						imagesOne: goods.goodsIcon,
						imagesTwo: goods.imageList[0],
						imagesThree: goods.imageList[1],
						imagesFore: goods.imageList[2],
						goodsName: goods.goodsName.substr(0, 10) + '...',
						periods: goods.periods,
						totalStock: goods.totalStock,
						usableStock: goods.totalStock - goods.usableStock,
						alreadyBuy: goods.usableStock
					};
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			});
	}
	if(detailFlag == 2) { //揭晓中详情
		$scope.nowbegin = true;
		$scope.afterbegin = false;
		$scope.JieXiaoZhong = true;
		$scope.JieXiaoZhongCanYu = true;
		$scope.JieXiaoZhongMeiCanYu = false;
		//商品列表详情数据接口begin===============
		var promise = $http({
			url: 'http://42.62.53.158:8080/shop/api/' + 'goods/detail',
			method: 'POST',
			params: {
				id: $rootScope.detailId,
				token: ""
			}
		}).success(function(data, header, config, status) {
			console.log("揭晓中商品返回成功");
			//响应成功
		}).error(function(data, header, config, status) {
			console.log("揭晓中商品返回失败");
			//处理响应失败
		});
		promise.then(
			// 通讯成功的处理
			function(answer) {
				console.log("处理揭晓中商品");
				var data = answer;
				$rootScope.goodsIds = data.data.data.goods.goodsId;
				console.log("揭晓中商品：" + JSON.stringify(data));
				if(data != null && data != "") {
					var goodsing = data.data.data.goods;
					$scope.details = {
						imagesOne: goodsing.goodsIcon,
						imagesTwo: goodsing.imageList[0],
						imagesThree: goodsing.imageList[1],
						imagesFore: goodsing.imageList[2]
					};
					$scope.announced = {
						goodsName: goodsing.goodsName.substr(0, 10) + '...',
						periods: goodsing.periods,
						totalStock: goodsing.totalStock,
						alreadyBuy: goodsing.usableStock
					};
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			});
	}
	if(detailFlag == 1) { //已揭晓详情
		$scope.nowbegin = false;
		$scope.afterbegin = true;
		$scope.YiJieXiao = true;
		$scope.YiJieXiaoCanYu = true;
		$scope.YiJieXiaoMeiCanYu = false;
		//商品列表详情数据接口begin===============
		var promise = $http({
			url: 'http://42.62.53.158:8080/shop/api/' + 'goods/detail',
			method: 'POST',
			params: {
				id: $rootScope.detailId,
				token: ""
			}
		}).success(function(data, header, config, status) {
			console.log("已经揭晓商品返回成功");
			//响应成功
		}).error(function(data, header, config, status) {
			console.log("已经揭晓商品返回失败");
			//处理响应失败
		});
		promise.then(
			// 通讯成功的处理
			function(answer) {
				console.log("处理已经揭晓商品");
				var data = answer;
				console.log("已经揭晓商品：" + JSON.stringify(data));
				$rootScope.goodsIds = data.data.data.goods.goodsId;
				if(data != null && data != "") {
					var goodsed = data.data.data.goods;
					$scope.details = {
						imagesOne: goodsed.goodsIcon,
						imagesTwo: goodsed.imageList[0],
						imagesThree: goodsed.imageList[1],
						imagesFore: goodsed.imageList[2]
					};
					$scope.announcing = {
						goodsName: goodsed.goodsName.substr(0, 10) + '...',
						periods: goodsed.periods,
						luckUserId: goodsed.luckUserId,
						userId: goodsed.luckUserName,
						announceTime: goodsed.createTime,
						totalNo: goodsed.luckUserCount,
						adress: goodsed.luckUserAddress,
						alreadyBuy: goodsed.luckUserCount,
					};
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			});
	}
	//滚动条
	mui('.mui-scroll-wrapper').scroll({
		bounce: true,
		indicators: true, //是否显示滚动条
		deceleration: 0.0005
	});
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.homepage');
	};
	//获得slider插件对象
	var gallery = mui('.mui-slider');
	gallery.slider({
		interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
	});
	//	//夺宝单号
	//	$scope.noList=function(){
	//		
	//	}
	//点击购物车(右上角图标)
	var shoplistVos = [];
	$rootScope.gouwuches = function() {
			console.log("======userId的值：" + userId);
			//			selectShoCarList();
			$state.go('main.shoppingCar');
		}
		//点击图文详情
	$scope.picWords = function() {
			$state.go('main.pictureWords');
			//			localStorage.setItem("goodsIds",$rootScope.goodsIds);
			//			window.location.href="partials/pictureAndWords.html";
		}
		//点击最新揭晓
	$scope.moreGoods = function() {
			$state.go('main.pastAnnounce');
		}
		//跳转计算详情
	$scope.gocalculate = function() {
			$state.go('main.calculationDetails');
		}
		//跳转参与详情
	$scope.gorecord = function() {
			$state.go('main.recordDetails');
		}
		//点击加入购物车
		//点击理解参与
		//调用接口
		//============================倒计时，计时器================================
	var addTimer = function() {
		var list = [],
			interval;

		return function(id, time) {
			if(!interval)
				interval = setInterval(go, 1000);
			list.push({
				ele: document.getElementById(id),
				time: time
			});
		}

		function go() {
			for(var i = 0; i < list.length; i++) {
				list[i].ele.innerHTML = getTimerString(list[i].time ? list[i].time -= 1 : 0);
				if(!list[i].time)
					list.splice(i--, 1);
			}
		}

		function getTimerString(time) {
			var not0 = !!time,
				h = Math.floor((time %= 86400) / 3600),
				m = Math.floor((time %= 3600) / 60),
				s = time % 60;
			if((h < 10) && (m >= 10) && (s >= 10)) {
				//						console.log("0" + h + ":" + m + ":" + s);
				var showtime = "0" + h + ":" + m + ":" + s;
				return showtime;
			}
			if((h < 10) && (m < 10) && (s >= 10)) {
				//						console.log("0" + h + ":0" + m + ":" + s);
				var showtime = "0" + h + ":0" + m + ":" + s;
				return showtime;
			}
			if((h < 10) && (m < 10) && (s < 10)) {
				//						console.log("0" + h + ":0" + m + ":0" + s);
				var showtime = "0" + h + ":0" + m + ":0" + s;
				return showtime;
			}
			if((h >= 10) && (m >= 10) && (s < 10)) {
				//						console.log("" + h + ":" + m + ":0" + s);
				var showtime = "" + h + ":" + m + ":0" + s;
				return showtime;
			}
			if((h >= 10) && (m < 10) && (s < 10)) {
				//						console.log("" + h + ":0" + m + ":0" + s);
				var showtime = "" + h + ":0" + m + ":0" + s;
				return showtime;
			}
			if((h >= 10) && (m < 10) && (s >= 10)) {
				//						console.log("" + h + ":0" + m + ":" + s);
				var showtime = "" + h + ":0" + m + ":" + s;
				return showtime;
			}
			if((h >= 10) && (m >= 10) && (s >= 10)) {
				//						console.log("" + h + ":" + m + ":" + s);
				var showtime = "" + h + ":" + m + ":" + s;
				return showtime;
			}
			if((h < 10) && (m >= 10) && (s < 10)) {
				//						console.log("0" + h + ":" + m + ":0" + s);
				var showtime = "0" + h + ":" + m + ":0" + s;
				return showtime;
			}
			if((h = 0) && (m = 0) && (s = 0)) {
				//						console.log("0" + h + ":0" + m + ":0" + s);
				var showtime = "0" + h + ":0" + m + ":0" + s;
				return showtime;
				clearInterval(addTimer);
			}
		}
	}();
	addTimer("showTime", 456);
	//============================倒计时，计时器================================

	//参与详情
	//	$scope.partakes = [];
	$scope.participation = function() {
		$scope.partakes = [];
		//参与详情数据接口begin===============
		var promise = $http({
			url: 'http://42.62.53.158:8080/shop/api/' + 'order/list',
			method: 'POST',
			params: {
				page: 1,
				goodsReleaseId: $rootScope.detailId
			}
		}).success(function(data, header, config, status) {
			console.log("返回成功");
			//响应成功
		}).error(function(data, header, config, status) {
			console.log("返回失败");
			//处理响应失败
		});
		promise.then(
			// 通讯成功的处理
			function(answer) {
				var data = answer;
				console.log("参与记录内容：" + JSON.stringify(data));
				if(data != null && data != "") {
					var lists = data.data.data.list;
					for(var i = 0; i < lists.length; i++) {
						var lastOrderTime = lists[i].createTime; //取出商品所需人次
						var date = new Date(lastOrderTime);
						Y = date.getFullYear() + '-';
						M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
						D = date.getDate() + ' ';
						h = date.getHours() + ':';
						m = date.getMinutes() + ':';
						s = date.getSeconds();
						//							ms= date.getMilliseconds();
						var timer = Y + M + D + h + m + s;
						var partake = {
							userImage: lists[i].heading,
							userId: lists[i].num.substr(0, 10) + '...',
							userAdress: lists[i].payIpAddress.substr(0, 10) + '...',
							announceTime: timer,
							alreadyBuy: lists[i].buyCount,
						};
						$scope.partakes.push(partake);
					}
					console.log("列表信息：" + JSON.stringify($scope.partakes));
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			});
	}

	//遮罩
	var flags = false;
	var mask = mui.createMask(function() {
		return flags;
	});
	//点击立即购买逻辑
	$scope.checkIn = function() {
			mask.show(); //显示遮罩	
			$scope.shoppingView = true;
		}
		//关闭弹出框
	$scope.closeShop = function() {
			flags = true;
			mask.close(); //关闭遮罩
			$scope.shoppingView = false;
		}
		//点击购买支付
	$scope.shopping = function() {
		$rootScope.amount = $scope.goodsNumber;
		flags = true;
		mask.close(); //关闭遮罩
		$scope.shoppingView = false;
		console.log(JSON.stringify($rootScope.detailId));
		var goodsReleaseId = $rootScope.detailId;
		var buyCount = $rootScope.amount;
		var token = "373f318821c63640c2578eb0574647e983feca381c738290";
		var promise = $http({
			url: 'http://42.62.53.158:8080/shop/api/' + 'order/save/cart',
			method: 'POST',
			params: {
				goodsReleaseId: goodsReleaseId,
				buyCount: buyCount,
				token: token
			}
		}).success(function(data, header, config, status) {
			console.log("返回成功");
			//响应成功
		}).error(function(data, header, config, status) {
			console.log("返回失败");
			//处理响应失败
		});
		//===============================商品查询页列表接口begin====================
		promise.then(function(answer) {
				var data = answer;
				console.log("购物车添加成功：" + JSON.stringify(data));
				var code = data.data.code;
				console.log("code：" + code);
				if(code == "-1000") {
					//						plus.nativeUI.toast( "请您先进行登录!",{verticalAlign:"bottom"});
					alert("请您先进行登录!");
					$state.go('main.login');
				}
				if(code == "0") {
					$rootScope.cartIds = data.data.data.cart.id;
					$state.go('main.shoppingPay');
				}
				if(code == "-1053") {
					//						plus.nativeUI.toast( "商品已在购物车!",{verticalAlign:"bottom"});
					alert("商品已在购物车!");
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			});
	}
}]);
//--------------------------------------------------------------------------------------------------------------------------------
//往期揭晓
autoInsuranceCtrls.controller('pastAnnounceCtrl', ['$rootScope', '$scope', '$state', '$http', 'myPastcount', function($rootScope, $scope, $state, $http, myPastcount) {
	$rootScope.appTitle = '往期揭晓';
	$rootScope.tabBar = true;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	$scope.pastcounts = [];
	$rootScope.back = function() {
		$state.go('main.goodsDetails');
	};
	console.log("往期揭晓页面。");
	//===============================往期揭晓接口begin====================
	var promise = $http({
		url: 'http://42.62.53.158:8080/shop/api/' + 'goods/open/record/list',
		method: 'POST',
		params: {
			page: 1,
			id: $rootScope.detailId
		}
	}).success(function(data, header, config, status) {
		console.log("返回成功");
		//响应成功
	}).error(function(data, header, config, status) {
		console.log("返回失败");
		//处理响应失败
	});
	promise.then(
		// 通讯成功的处理
		function(answer) {
			var data = answer;
			if(data != null && data != "") {
				console.log("返回成功1121212121");
				console.log(JSON.stringify(data));
				console.log("返回成功1121212121");
				var lists = data.data.data.openedList;
				for(var i = 0; i < lists.length; i++) {
					var listsVo = lists[i];
					var pastcount = {
						periods: listsVo.goodsReleasePeriod,
						dates: listsVo.lotteryTime,
						times: listsVo.openTime,
						headImg: listsVo.userHeading,
						userName: listsVo.userName,
						personNum: listsVo.userBuyCount,
						anouncedNum: listsVo.treasureNo,
						//						adress:listsVo.userAddress,
						adress: '北京市 昌平区',
					};
					$scope.pastcounts.push(pastcount);
				}
			}
		},
		function(error) {
			console.log("error");
			$scope.error = error;
		});
	//===============================往期揭晓接口end====================

	//监控滚动条
	var page = 2;
	$scope.iscroll = false;
	var countPage = 0;
	$(window).scroll(function() {
		if(($(window).height() + $(window).scrollTop()) >= $("body").height()) {
			if($scope.iscroll) {
				return;
			}
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/' + 'goods/open/record/list',
				method: 'POST',
				params: {
					page: 1,
					goodsId: $rootScope.goodsIds
				}
			}).success(function(data, header, config, status) {
				console.log("返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					//===============================往期揭晓接口begin====================
					var data = answer;
					if(data != null && data != "") {
						console.log("往期揭晓列表页");
						console.log(JSON.stringify(data));
						console.log("往期揭晓列表页");
						countPage = data.data.data.countPage;
						console.log("此处的countPage：" + countPage);
						var lists = data.data.data.openedList;
						for(var i = 0; i < lists.length; i++) {
							var listsVo = lists[i];
							var pastcount = {
								periods: listsVo.goodsReleasePeriod,
								dates: listsVo.lotteryTime,
								times: listsVo.openTime,
								headImg: listsVo.userHeading,
								userName: listsVo.userName,
								personNum: listsVo.userBuyCount,
								anouncedNum: listsVo.treasureNo,
								//										adress:listsVo.userAddress,
								adress: '北京市 昌平区',
							};
							$scope.pastcounts.push(pastcount);
						}
						console.log("page的值：" + page);
						console.log("countPage的值：" + countPage);
						if(page < countPage) {
							console.log("我确实是小");
							page = page + 1;
							console.log("page的值之后：" + page);
							console.log("countPage的值之后：" + countPage);
						} else {
							$scope.iscroll = true;
						}
						console.log("$scope.iscroll的值之后：" + $scope.iscroll);
					}
				},
				function(error) {
					console.log("error");
					$scope.error = error;
					//===============================往期揭晓接口end====================
				},
				// 通讯失败的处理
				function(error) {
					// 可以先对失败的数据集做处理，再交由controller进行处理
					error.status = false;
					deferred.reject(error);
				});
		}
		$scope.$digest();
	});

	$scope.getDetial = function(index) {
		console.log("index的值：" + index);
		$rootScope.goodsIds = $scope.pastcounts[index].goodsReleasePeriod;
		$rootScope.detailId = $scope.pastcounts[index].goodsReleaseId;
		localStorage.removeItem("detailFlag");
		localStorage.setItem("detailFlag", "1");
		$rootScope.shoppingList = $scope.pastcounts[index]; //购物清单信息
		$state.go('main.goodsDetails');
	}

}]);
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//topbar选项卡和导航栏
autoInsuranceCtrls.controller('topbarCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	//	$rootScope.appTitle = '奖品详情';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	//	//返回逻辑
	//	$rootScope.back = function() {
	//        $state.go('main.homepage');
	//      };
	//	$rootScope.main=function(){
	//		$state.go('main.homepage');
	//	}
	//	$rootScope.finance=function(){
	//		$state.go('main.finance');
	//	}
	//	$rootScope.member=function(){
	//		$state.go('main.member');
	//	}
	//	$rootScope.recharge=function(){
	//		$state.go('main.recharge');
	//	}
	//	$rootScope.mine=function(){
	//		$state.go('main.mine');
	//	}
}]);
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//图文详情
autoInsuranceCtrls.controller('pictureWordsCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '图文详情';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.goodsDetails');
	};
	console.log("goodsId的值是：" + $rootScope.goodsIds);
	console.log("goodsDetailIDs的值是：" + $rootScope.detailId);
	//图文详情数据接口begin===============
	var promise = $http({
		url: 'http://42.62.53.158:8080/shop/api/' + 'goods/image/list',
		method: 'POST',
		params: {
			goodsId: $rootScope.goodsIds
		}
	}).success(function(data, header, config, status) {
		console.log("返回成功");
		//响应成功
	}).error(function(data, header, config, status) {
		console.log("返回失败");
		//处理响应失败
	});
	promise.then(
		// 通讯成功的处理
		function(answer) {
			var data = answer;
			console.log("图文详情：" + JSON.stringify(data));
			$scope.imgs = [];
			if(data != null && data != "") {
				var lists = data.data.data.list;
				for(var i = 0; i < lists.length; i++) {
					var img = {
						images: lists[i]
					}
					$scope.imgs.push(img);
				}
			}
		},
		function(error) {
			console.log("error");
			$scope.error = error;
		});

}]);
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//购物车
autoInsuranceCtrls.controller('shoppingCarCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '清单';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.homepage');
	};
	$rootScope.marks = "shopCarPage";
	//	var shoppinglistVos=[];
	//	$scope.duobaobi=0;
	//	$scope.shopCars=[];
	//	var sql="SELECT * FROM shoppingCar";
	//	db.transaction(function(context){
	//		context.executeSql(sql,[],function(tx,result){
	//		$scope.shopCarlist=true;
	//		console.log("进入查询");
	//		    if(result.rows.length>0){
	//		    	var len = result.rows.length;
	//			$scope.shoppingCar={
	//						goodsType:len,
	//						}
	//		    		console.log("长度大于零");
	//		        for(var i=0;i<result.rows.length;i++){
	//		        		console.log("进入循环");
	//				   shoppinglistVos.push(result.rows.item(i));  
	//		    		}
	//				console.log("查询结果："+JSON.stringify(shoppinglistVos));
	//		        for (var m = 0; m < shoppinglistVos.length; m++) {
	//						console.log("进入购物车循环");
	//						var goodsReleaseBosVo = shoppinglistVos[m];
	//						var shopCar = {
	//							goodsIds:goodsReleaseBosVo.goodsIds,
	//							imgUrl: goodsReleaseBosVo.goodsIcon,
	//							goodsName: goodsReleaseBosVo.goodsName.substr(0, 10) + '...',
	//							tatleNum: "1000",
	//							othersNum: "650",
	//							goodsNumber:"5",
	//							whether:true
	//						};
	//						$scope.shopCars.push(shopCar);
	//						$scope.$digest();
	//					}
	//					console.log("购物车："+JSON.stringify($scope.shopCars));
	//			}else{
	//				console.log("长度小于1.");
	//				$scope.shopCarlist=false;
	//				$rootScope.tabBar = true;
	//			}
	//		});
	//	});
	//清单列表数据
	$scope.shopCars = [];
	$scope.shopCarlist = true;
	var token = "373f318821c63640c2578eb0574647e983feca381c738290";
	var promise = $http({
		url: 'http://42.62.53.158:8080/shop/api/' + 'order/cart/list',
		method: 'POST',
		params: {
			token: token,
			page: "1"
		}
	}).success(function(data, header, config, status) {
		console.log("返回成功");
		//响应成功
	}).error(function(data, header, config, status) {
		console.log("返回失败");
		//处理响应失败
	});
	promise.then(
		// 通讯成功的处理
		function(answer) {
			var data = answer;
			console.log("购物车列表：" + JSON.stringify(data));
			var cartVos = data.data.data.cartVos;
			if(cartVos.length > 0) {
				console.log("购物车长度大于零");
				$scope.shopCarlist = true;
				for(var i = 0; i < cartVos.length; i++) {
					console.log("cartVos[i].goodsReleaseId的值：" + cartVos[i].goodsReleaseId);
					var shopCar = {
						cId: cartVos[i].cId,
						goodsIds: cartVos[i].goodsReleaseId,
						imgUrl: cartVos[i].goodsIcon,
						goodsName: cartVos[i].goodsName.substr(0, 10) + '...',
						tatleNum: cartVos[i].totalStock,
						othersNum: cartVos[i].usableStock,
						goodsNumber: "5",
						whether: true
					};
					$scope.shopCars.push(shopCar);
				}
				$scope.$digest();
			} else {
				$scope.shopCarlist = false;
				$rootScope.tabBar = true;
			}
		},
		function(error) {
			console.log("error");
			$scope.error = error;
		});
	//总计夺宝比数量
	$scope.duobaobi = function() {
		var total = 0;
		for(var i = 0; i < $scope.shopCars.length; i++) {
			total += Number($scope.shopCars[i].goodsNumber);
		}
		console.log("需要的夺宝比数量：" + total);
		return total;
	};
	//“全部”按钮
	$scope.checkAlls = true;
	$scope.checkAll = function() {
		if($scope.checkAlls == true) {
			$scope.checkAlls = false;
			for(var i = 0; i < $scope.shopCars.length; i++) {
				$scope.shopCars[i].whether = false;
			}
		} else {
			$scope.checkAlls = true;
			for(var i = 0; i < $scope.shopCars.length; i++) {
				$scope.shopCars[i].whether = true;
			}
		}
	};
	//点击单个
	$scope.checkOne = function(index) {
		console.log("点击了checkbox！");
		console.log("index的值：" + index);
		if($scope.shopCars[index].whether == false) {
			$scope.shopCars[index].whether = true;
		} else {
			$scope.shopCars[index].whether = false;
			$scope.checkAlls = false;
		}
	}

	//滑动删除
	//		var unremoveCheck=[];
	//     	var removeCheck=[];
	//		$scope.removeItems=function(index){
	//		console.log("index的值;"+index);
	//		var uncomorderno = $scope.shopCars[index].goodsIds;
	//		var sql = 'DELETE  FROM shoppingCar where goodsIds=?';
	//		db.transaction(function(tx){
	//			tx.executeSql(sql,[uncomorderno],function(){
	//				   $state.go('main.shoppingCar',{}, {reload: true}); //刷新本页面
	//			       console.log("删除购物车成功");
	//			  },function(tx,error){
	//			    	   console.log("删除购物车失败失败"+error.message);
	//			    	 });
	//			});
	//	    	}
	//滑动删除
	var token = "373f318821c63640c2578eb0574647e983feca381c738290";
	$scope.removeItems = function(index) {
			var uncomorderno = $scope.shopCars[index].cId;
			console.log("商品ID是：" + uncomorderno);
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/' + 'order/delete/cart',
				method: 'POST',
				params: {
					cartId: uncomorderno,
					token: token
				}
			}).success(function(data, header, config, status) {
				console.log("返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					var data = answer;
					console.log("删除列表 ：" + JSON.stringify(data));
					var code = data.data.code;
					if(code == "0") {
						//						plus.nativeUI.toast( "商品删除成功!",{verticalAlign:"top"});
						alert("商品删除成功!");
						$state.go('main.shoppingCar', null, {
							reload: true
						});
					} else {
						//						plus.nativeUI.toast( "商品删除失败!",{verticalAlign:"top"});
						alert("商品删除失败!");
					}
				},
				function(error) {
					console.log("error");
					$scope.error = error;
				});
		}
		//马上夺宝按钮
	$scope.goshpping = function() {
			$state.go('main.homepage');
		}
		//赋初始值
		//		$scope.shopCar={goodsNumber:5};
		//加减逻辑
	$scope.subtract = function(index) {
		var goodsNumber = $scope.shopCars[index].goodsNumber;
		if(goodsNumber > 1) {
			goodsNumber--;
		}
		$scope.shopCars[index].goodsNumber = goodsNumber;
	}
	$scope.add = function(index) {
		var goodsNumber = $scope.shopCars[index].goodsNumber;
		if(goodsNumber < $scope.shopCars[index].othersNum) {
			goodsNumber++;
			$scope.shopCars[index].goodsNumber = goodsNumber;
		}
	}
	$scope.allIn = function(index) { //包尾
		//点击直接将返回的剩余量
		//			$scope.shopCars[index].baowei={
		//						"background-color":"#D43047", 
		//						"color":"white",
		//							}
		$scope.shopCars[index].goodsNumber = $scope.shopCars[index].othersNum;
	}

}]);
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//计算详情
autoInsuranceCtrls.controller('calculationDetailsCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '计算详情';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.goodsDetails');
	};
	//图文详情数据接口begin===============
	var promise = $http({
		url: 'http://42.62.53.158:8080/shop/api/' + 'goods/open/detail',
		method: 'POST',
		params: {
			goodsReleaseId: $rootScope.goodsIds
		}
	}).success(function(data, header, config, status) {
		console.log("返回成功");
		//响应成功
	}).error(function(data, header, config, status) {
		console.log("返回失败");
		//处理响应失败
	});
	promise.then(
		// 通讯成功的处理
		function(answer) {
			var data = answer;
			if(data != null && data != "") {
				console.log("计算详情开奖：");
				console.log(JSON.stringify(data));
				//					var lists = data.data.data.list;
				//					var picwords = {
				//						topOne: lists.url,
				//						topTwo: lists.url,
				//						topLeft: lists.url,
				//						topRight: lists.url,
				//						midOne: lists.url,
				//						midTwo:lists.url,
				//						bottomOne:lists.url,
				//					};
			}
		},
		function(error) {
			console.log("error");
			$scope.error = error;
		});

}]);
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//参与详情
autoInsuranceCtrls.controller('recordDetailsCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '参与详情';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.goodsDetails');
	};

}]);
//--------------------------------------------------------------------------------------------------------------------------------

////--------------------------------------------------------------------------------------------------------------------------------
////我的页面(选项卡第五个)
//autoInsuranceCtrls.controller('mineCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
//	$rootScope.appTitle = '我的主页';
//	$rootScope.tabBar = false;
//	$rootScope.headder = true;
//	$rootScope.qiandao = false;
//	$rootScope.hideBack = false;
//	$rootScope.goodsSerch = false;
//	$rootScope.gouwuche = false;
//	//返回逻辑
//	$rootScope.back = function() {
//		$state.go('main.homepage');
//	};
//
//}]);
////--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//晒单页面
autoInsuranceCtrls.controller('memberCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '晒单';
	$rootScope.tabBar = true;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = true;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	mui('.mui-scroll-wrapper').scroll({
		bounce: true,
		indicators: true, //是否显示滚动条
		deceleration: 0.0003
	});

}]);
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//夺宝攻略
autoInsuranceCtrls.controller('duobaogonglueCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '夺宝攻略';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.homepage');
	};

}]);
//--------------------------------------------------------------------------------------------------------------------------------
//我的页面(选项卡第五个)
autoInsuranceCtrls.controller('mineCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '我的主页';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.homepage');
	};
	$scope.goSetadress = function() {
			$state.go('main.myAdress');
		} //我的收货地址
	$scope.goMessage = function() {
			$state.go('main.message');
		} //消息中心
	$scope.goDBrecord = function() {
			$state.go('main.DBrecord');
		} //夺宝记录
		//我的页面数据接口begin===============
	if(localStorage.getItem("token")) {
		var promise = $http({
			url: 'http://42.62.53.158:8080/shop/api/' + 'account/get/funds',
			method: 'POST',
			params: {
				token: localStorage.getItem("token")
			}
		}).success(function(data, header, config, status) {
			console.log("返回成功");
			$scope.userName = localStorage.getItem("userId")

			//响应成功
		}).error(function(data, header, config, status) {
			console.log("返回失败");
			//处理响应失败
		});
		promise.then(
			// 通讯成功的处理
			function(answer) {
				var data = answer;
				if(data != null && data != "") {
					console.log(JSON.stringify(data))
					$scope.usable = data.data.data.usable + ".00"
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			});

	} else {
		console.log("没有token，跳转到登录页面")
		$state.go('main.login');
	}
}]);
//-----------------------------我的账户模块结束---------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//登录页面
autoInsuranceCtrls.controller('loginCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '登录';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.homepage');
	};

	$scope.goRegister = function() {
		$state.go('main.register');
	}
	$scope.goForget = function() {
		$state.go('main.forgetPwd');
	}
	$scope.goLogin = function() {

		if($scope.user.phone == "") {
			alert("请填写手机号码")
			return;
		}
		var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;
		if(!myreg.test($scope.user.phone)) {
			alert("手机号码有误！ 请输入11位数字");
			return;
		}

		console.log($scope.user.phone) //用户输入的用户名
		console.log(hex_md5($scope.user.pwd)) //MD5加密过后的密码
			//登录页面数据接口begin===============
		var promise = $http({
			url: 'http://42.62.53.158:8080/shop/api/' + 'user/login/wap',
			method: 'POST',
			params: {
				name: $scope.user.phone,
				password: hex_md5($scope.user.pwd)

			}
		}).success(function(data, header, config, status) {
			console.log("返回成功");
			//响应成功
		}).error(function(data, header, config, status) {
			console.log("返回失败");
			//处理响应失败
		});
		promise.then(
			// 通讯成功的处理
			function(answer) {
				var data = answer;
				console.log(JSON.stringify(data))
				if(data.data.data) {
					console.log(JSON.stringify(data))
					console.log(data.data.data.token)
					localStorage.setItem("token", data.data.data.token);
					localStorage.setItem("userId", data.data.data.user.id);

					$state.go('main.mine');
				} else {
					alert(data.data.msg)
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			});

	}

}]);
//--------------------------------------------------------------------------------------------------------------------------------
//注册页面
autoInsuranceCtrls.controller('registerCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '注册';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	$rootScope.sendcode = false;
	$rootScope.sendsucc = true;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.login');
	};
	$scope.sendCode = function() { //发送验证码
		var promise = $http({
			url: 'http://42.62.53.158:8080/shop/api/' + 'user/register/mobile/send',
			method: 'POST',
			params: {
				mobile: $scope.user.rephone
			}
		}).success(function(data, header, config, status) {
			console.log("返回成功");
			//响应成功
		}).error(function(data, header, config, status) {
			console.log("返回失败");
			//处理响应失败
		});
		promise.then(
			// 通讯成功的处理
			function(answer) {
				var data = answer;
				if(data.data.data) {
					if(data.data.data.status) {
						console.log(data.data.data.status)
						console.log(JSON.stringify(data))
						$rootScope.sendcode = true;
						$rootScope.sendsucc = false;
					}
				} else {
					alert(data.data.msg)
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			});
		//$state.go('main.forgetPwd');
	}
	$scope.goRegister = function() { //注册按钮
		var promise = $http({
			url: 'http://42.62.53.158:8080/shop/api/' + 'user/register/mobile/wap',
			method: 'POST',
			params: {
				mobile: $scope.user.rephone,
				password: hex_md5($scope.user.repwd),
				code: $scope.user.recode
			}
		}).success(function(data, header, config, status) {
			console.log("返回注册成功");
			//响应成功
		}).error(function(data, header, config, status) {
			console.log("返回注册失败");
			alert("注册失败")
				//处理响应失败
		});
		promise.then(
			// 通讯成功的处理
			function(answer) {
				var data = answer;
				if(data.data.data) {
					if(data.data.data.status) {
						console.log(data.data.data.status)
						console.log(JSON.stringify(data))
						alert("注册成功")
						$state.go('main.login');
					}
				} else {
					alert(data.data.msg)
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			});
	}
}]);
//--------------------------------------------------------------------------------------------------------------------------------
//忘记密码页面
autoInsuranceCtrls.controller('forgetPwdCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '找回密码';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	$rootScope.sendcode = false;
	$rootScope.sendsucc = true;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.login');
	};
	$scope.sendFcode = function() { //发送修改密码验证码
			var promise = $http({
				url: 'http://42.62.53.158:8080/shop/api/' + 'user/update/password/send',
				method: 'POST',
				params: {
					mobile: $scope.user.fophone
				}
			}).success(function(data, header, config, status) {
				console.log("返回成功");
				//响应成功
			}).error(function(data, header, config, status) {
				console.log("返回失败");
				//处理响应失败
			});
			promise.then(
				// 通讯成功的处理
				function(answer) {
					var data = answer;
					if(data.data.data) {
						if(data.data.data.status) {
							console.log(data.data.data.status)
							console.log(JSON.stringify(data))
							$rootScope.sendcode = true;
							$rootScope.sendsucc = false;
						}
					} else {
						alert(data.data.msg)
					}
				},
				function(error) {
					console.log("error");
					$scope.error = error;
				});
		}
		//发送修改密码的验证码 结束

	//输入验证码点击下一步时开始
	$scope.goNextForget = function() { //注册按钮
		var promise = $http({
			url: 'http://42.62.53.158:8080/shop/api/' + 'user/update/password/check',
			method: 'POST',
			params: {
				mobile: $scope.user.fophone,
				code: $scope.user.forCode
			}
		}).success(function(data, header, config, status) {
			console.log("返回修改密码验证码成功");
			//响应成功
		}).error(function(data, header, config, status) {
			console.log("返回修改密码验证码失败");
			alert("校验失败")
				//处理响应失败
		});
		promise.then(
			// 通讯成功的处理
			function(answer) {
				var data = answer;
				if(data.data.data) {
					if(data.data.data.status) {
						console.log(data.data.data.status)
						console.log(JSON.stringify(data))
						sessionStorage.setItem("forPhone", $scope.user.fophone);
						sessionStorage.setItem("forCode", $scope.user.forCode);
						alert("校验成功")
						$state.go('main.resetPwd');
					}
				} else {
					alert(data.data.msg)
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			});
	}

}]);
//重置密码页面
autoInsuranceCtrls.controller('resetPwdCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '找回密码';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.forgetPwd');
	};
	$rootScope.resetComp = function() {
		if($scope.user.pd2 !== $scope.user.pd1) {
			alert("输入的密码不一致")
			return;
		} else if($scope.user.pd2 == "" || $scope.user.pd1 == "") {
			alert("请输入密码")
			return;
		}
		console.log(sessionStorage.getItem("forPhone"))
		var promise = $http({
			url: 'http://42.62.53.158:8080/shop/api/' + 'user/update/password',
			method: 'POST',
			params: {
				mobile: sessionStorage.getItem("forPhone"),
				code: sessionStorage.getItem("forCode"),
				password: hex_md5($scope.user.pd2)

			}
		}).success(function(data, header, config, status) {
			console.log("返回成功");
			//响应成功
		}).error(function(data, header, config, status) {
			console.log("返回失败");
			//处理响应失败
		});
		promise.then(
			// 通讯成功的处理
			function(answer) {
				var data = answer;
				if(data.data.data) {
					if(data.data.data.status) {
						console.log(data.data.data.status)
						console.log(JSON.stringify(data))
						alert("修改成功，请登录")
						$state.go('main.login');
					}
				} else {
					alert(data.data.msg)
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			});
	}
}]);
//我的地址页面
autoInsuranceCtrls.controller('adressCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '收货地址';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	//返回逻辑
	
	var addss = "北京市 北京市 朝阳区"
	$rootScope.back = function() {
		$state.go('main.mine');
	};
	mui.init();
	var cityPicker3 = new mui.PopPicker({
		layer: 3
	});
	cityPicker3.setData(cityData3);
	$rootScope.xzAdress = function() {
			cityPicker3.show(function(items) {
				addss = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
				//返回 false 可以阻止选择框的关闭
				//return false;
				//console.log(addss)	
				document.getElementById("ad-area").value = addss
				$scope.address3=addss
			});
		} //地址三级联动 over
		//提交收货地址begin
	$rootScope.subAdress=function(){
		if($scope.address3==null){
			alert("请选择地区")
			return;
		}
		//console.log($scope.address3.split(" ")[0])
		var promise = $http({
		url: 'http://42.62.53.158:8080/shop/api/' + 'user/save/address',
		method: 'POST',
		params: {
			token: localStorage.getItem("token"),
					name: $scope.ADname,
					mobile:$scope.ADphone,
					postal:$scope.ADcode,
					country: "中国",
					province: $scope.address3.split(" ")[0],
					city:$scope.address3.split(" ")[1],
					county:$scope.address3.split(" ")[2],
					street:$scope.ADdetial
		}
	}).success(function(data, header, config, status) {
		console.log("返回成功");
		//响应成功
	}).error(function(data, header, config, status) {
		console.log("返回失败");
		//处理响应失败
	});
	promise.then(
		// 通讯成功的处理
		function(answer) {
			var data = answer;
			if(data != null && data != "") {
				//console.log(typeof(data.data.data.list))
				if(data.data.data==null){
					alert(data.data.msg)
				}else{
					alert("提交收货地址成功")
				}

				console.log(JSON.stringify(data))
			}
		},
		function(error) {
			console.log("error");
			$scope.error = error;
		});
	}

}]);
//我的消息中心页面
autoInsuranceCtrls.controller('messageCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '消息中心';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	$rootScope.nomessag = false;
	$rootScope.messag = false;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.mine');
	};
	$rootScope.toMessageD = function(messageId) {
		$state.go('main.messageDetail', {
			messageId: messageId
		});
	};
	var promise = $http({
		url: 'http://42.62.53.158:8080/shop/api/' + 'msg/list',
		method: 'POST',
		params: {
			token: localStorage.getItem("token"),
			page: "0"
		}
	}).success(function(data, header, config, status) {
		console.log("返回成功");
		//响应成功
	}).error(function(data, header, config, status) {
		console.log("返回失败");
		//处理响应失败
	});
	promise.then(
		// 通讯成功的处理
		function(answer) {
			var data = answer;
			if(data != null && data != "") {
				if(data.data.data.list.length == 0) {
					console.log("没有消息")
					$rootScope.nomessag = false;
					$rootScope.messag = true;
				} else {
					$scope.msg = data.data.data.list
					console.log($scope.msg)
					$rootScope.nomessag = true;
					$rootScope.messag = false;
				}
				console.log(JSON.stringify(data))
			}
		},
		function(error) {
			console.log("error");
			$scope.error = error;
		});

}]);
//我的消息详情页面
autoInsuranceCtrls.controller('DmessageCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$http', function($rootScope, $scope, $state, $stateParams, $http) {
	$rootScope.appTitle = '消息详情';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	$rootScope.nomessag = false;
	$rootScope.messag = false;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.message');
	};
	var messageId = $stateParams.messageId;
	console.log(messageId)

	var promise = $http({
		url: 'http://42.62.53.158:8080/shop/api/' + 'msg/read',
		method: 'POST',
		params: {
			token: localStorage.getItem("token"),
			id: messageId
		}
	}).success(function(data, header, config, status) {
		console.log("返回成功");
		//响应成功
	}).error(function(data, header, config, status) {
		console.log("返回失败");
		//处理响应失败
	});
	promise.then(
		// 通讯成功的处理
		function(answer) {
			var data = answer;
			if(data != null && data != "") {
				if(data.data.data.message == null) {
					console.log("消息读取失败")
				} else {
					$scope.msgd = data.data.data.message
					console.log($scope.msgd)

				}
				console.log(JSON.stringify(data))
			}
		},
		function(error) {
			console.log("error");
			$scope.error = error;
		});

}]);
//我的夺宝记录页面
autoInsuranceCtrls.controller('DBrecord', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {
	$rootScope.appTitle = '夺宝记录';
	$rootScope.tabBar = false;
	$rootScope.headder = true;
	$rootScope.qiandao = false;
	$rootScope.hideBack = false;
	$rootScope.goodsSerch = false;
	$rootScope.gouwuche = false;
	$rootScope.nodblist = true;
	$rootScope.dblist = false;
	//返回逻辑
	$rootScope.back = function() {
		$state.go('main.mine');
	};
	var promise = $http({
		url: 'http://42.62.53.158:8080/shop/api/' + 'order/user/list',
		method: 'POST',
		params: {
			token: localStorage.getItem("token"),
			page: "0",
			status: 0
		}
	}).success(function(data, header, config, status) {
		console.log("返回成功");
		//响应成功
	}).error(function(data, header, config, status) {
		console.log("返回失败");
		//处理响应失败
	});
	promise.then(
		// 通讯成功的处理
		function(answer) {
			var data = answer;
			if(data != null && data != "") {
				//console.log(typeof(data.data.data.list))
				if(data.data.data.list.length == 0) {
					console.log("没有记录")
					$rootScope.nodblist = false;
					$rootScope.dblist = true;
				} else {
					$scope.list = data.data.data.list;
					$rootScope.nodblist = true;
					$rootScope.dblist = false;
				}

				console.log(JSON.stringify(data))
			}
		},
		function(error) {
			console.log("error");
			$scope.error = error;
		});
	$rootScope.currentTab = 0;
	$rootScope.isActiveTab = function(tab) {
		return tab == $scope.currentTab;
	}
	$rootScope.tabDB = function(tabNumber) {
		$rootScope.currentTab = tabNumber;
		var promise = $http({
			url: 'http://42.62.53.158:8080/shop/api/' + 'order/user/list',
			method: 'POST',
			params: {
				token: localStorage.getItem("token"),
				page: "0",
				status: tabNumber
			}
		}).success(function(data, header, config, status) {
			console.log("返回成功");
			//响应成功
		}).error(function(data, header, config, status) {
			console.log("返回失败");
			//处理响应失败
		});
		promise.then(
			// 通讯成功的处理
			function(answer) {
				var data = answer;
				if(data != null && data != "") {
					//console.log(typeof(data.data.data.list))
					if(data.data.data.list.length == 0) {
						console.log("没有记录")
						$rootScope.nodblist = false;
						$rootScope.dblist = true;
					} else {
						$scope.list = data.data.data.list;
						$rootScope.nodblist = true;
						$rootScope.dblist = false;
					}

					console.log(JSON.stringify(data))
				}
			},
			function(error) {
				console.log("error");
				$scope.error = error;
			});
	};

}]);