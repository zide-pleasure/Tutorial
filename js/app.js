angular.module('autoInsuranceApp', [
	'ngTouch',
	'ui.router',
	'ngAnimate',
	'autoInsuranceCtrls',
	'myservices'
]).
config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/main");
	$stateProvider.state('main', { //首页
		url: '/main',
		views: {
			'': {
				templateUrl: 'partials/main.html'
			},
			'topBar@main': {
				templateUrl: 'partials/topBar.html',
				controller: 'topbarCtrl'
			},
			'content@main': {
				templateUrl: 'partials/tab-homepage.html',
				controller: 'homepageCtrl'
			}
		}
	}).state('main.homepage', { //首页 
		url: '/homepage',
		views: {
			'content@main': {
				templateUrl: 'partials/tab-homepage.html',
				controller: 'homepageCtrl'
			}
		}
	}).state('main.duobaogonglue', { //夺宝攻略页面
		url: '/duobaogonglue',
		views: {
			'content@main': {
				templateUrl: 'partials/raidersDetails.html',
				controller: 'duobaogonglueCtrl'
			}
		}
	})
//	.state('main.goodsSerch', { // 商品查询页
//		url: '/goodsSerch',
//		views: {
//			'content@main': {
//				templateUrl: 'partials/goodsSerch.html',
////				templateUrl: 'partials/gtab-with-segmented-control-vertical.html',
//				controller: 'goodsSerchCtrl'
//			}
//		}
//	})
	.state('main.search', { // 查询页
		url: '/search',
		views: {
			'content@main': {
				templateUrl: 'partials/search.html',
//				templateUrl: 'partials/gtab-with-segmented-control-vertical.html',
				controller: 'searchCtrl'
			}
		}
	})
	.state('main.goodsList', { //商品展示列表
		url: '/goodsList',
		views: {
			'content@main': {
				templateUrl: 'partials/goodsList.html',
				controller: 'goodsListCtrl'
			}
		}
	})
	.state('main.goodsMoreList', { //最新揭晓列表页
		url: '/goodsMoreList',
		views: {
			'content@main': {
				templateUrl: 'partials/latestAnnouncement.html',
				controller: 'goodsMoreListCtrl'
			}
		}
	}).state('main.goodsDetails', { //商品详情页
		url: '/goodsDetails',
		views: {
			'content@main': {
				templateUrl: 'partials/goodsDetails.html',
				controller: 'goodsDetailsCtrl'
			}
		}
	}).state('main.calculationDetails', { //计算详情页
		url: '/calculationDetails',
		views: {
			'content@main': {
				templateUrl: 'partials/calculationDetails.html',
				controller: 'calculationDetailsCtrl'
			}
		}
	}).state('main.recordDetails', { //参与详情页
		url: '/recordDetails',
		views: {
			'content@main': {
				templateUrl: 'partials/recordDetails.html',
				controller: 'recordDetailsCtrl'
			}
		}
	}).state('main.pictureWords', { //图文详情页
		url: '/pictureWords',
		views: {
			'content@main': {
				templateUrl: 'partials/pictureWords.html',
				controller: 'pictureWordsCtrl'
			}
		}
	}).state('main.pastAnnounce', { //往期揭晓
		url: '/pastAnnounce',
		views: {
			'content@main': {
				templateUrl: 'partials/pastAnnounce.html',
				controller: 'pastAnnounceCtrl'
			}
		}
	}).state('main.shoppingCar', { //购物清单
		url: '/shoppingCar',
		views: {
			'content@main': {
				templateUrl: 'partials/shoppingCar.html',
				controller: 'shoppingCarCtrl'
			}
		}
	}).state('main.shoppingPay', { //购买页面
		url: '/shoppingPay',
		views: {
			'content@main': {
				templateUrl: 'partials/pay.html',
				controller: 'shoppingPayCtrl'
			}
		}
	}).state('main.shoppingPaySuccess', { //支付成功
		url: '/shoppingPaySuccess',
		views: {
			'content@main': {
				templateUrl: 'partials/paySuccess.html',
				controller: 'shoppingPaySuccessCtrl'
			}
		}
	}).state('main.finance', { //最新揭晓
		url: '/finance',
		views: {
			'content@main': {
				templateUrl: 'partials/tab-finance.html',
				controller: 'financeCtrl'
			}
		}
	}).state('main.recharge', { //清单
		url: '/recharge',
		views: {
			'content@main': {
				templateUrl: 'partials/tab-recharge.html',
				controller: 'rechargeCtrl'
			}
		}
	}).state('main.mine', { //我
		url: '/mine',
		views: {
			'content@main': {
				templateUrl: 'partials/mine.html',
				controller: 'mineCtrl'
			}
		}
	}).state('main.myAdress', { //我的收货地址
		url: '/myAdress',
		views: {
			'content@main': {
				templateUrl: 'partials/myAdress.html',
				controller:'adressCtrl'
			}
		}
	}).state('main.message', { //我的消息中心
		url: '/message',
		views: {
			'content@main': {
				templateUrl: 'partials/message.html',
				controller:'messageCtrl'
			}
		}
	}).state('main.messageDetail', { //我的消息详情
		url: '/messageDetail/:messageId',
		views: {
			'content@main': {
				templateUrl: 'partials/messageDetail.html',
				controller:'DmessageCtrl'
			}
		}
	}).state('main.DBrecord', { //我的夺宝记录
		url: '/DBrecord',
		views: {
			'content@main': {
				templateUrl: 'partials/DBrecord.html',
				controller:'DBrecord'
			}
		}
	}).state('main.login', { //我的登录
		url: '/login',
		views: {
			'content@main': {
				templateUrl: 'partials/login.html',
				controller: 'loginCtrl'
			}
		}
	}).state('main.register', { //我的注册
		url: '/register',
		views: {
			'content@main': {
				templateUrl: 'partials/register.html',
				controller: 'registerCtrl'
			}
		}
	}).state('main.forgetPwd', { //忘记密码
		url: '/forgetPwd',
		views: {
			'content@main': {
				templateUrl: 'partials/forgetPwd.html',
				controller: 'forgetPwdCtrl'
			}
		}
	}).state('main.resetPwd', { //重置密码
		url: '/resetPwd',
		views: {
			'content@main': {
				templateUrl: 'partials/resetPwd.html',
				controller: 'resetPwdCtrl'
			}
		}
	}).state('main.member', { //晒单
		url: '/member',
		views: {
			'content@main': {
				templateUrl: 'partials/tab-member.html',
				controller: 'memberCtrl'
			}
		}
	});
});