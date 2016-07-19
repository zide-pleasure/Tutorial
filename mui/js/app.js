/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
//		callback = callback || $.noop;
//		loginInfo = loginInfo || {};
//		loginInfo.account = loginInfo.account || '';
//		loginInfo.password = loginInfo.password || '';
		if (loginInfo.account.length < 3) {
			return callback('账号最短为 3 个字符');
		}
		if (loginInfo.password.length < 3) {
			return callback('密码最短为 3 个字符');
		}
	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = 1234;
		state.token = "1234";
		owner.setState(state);
		return callback();
	};
}(mui, window.app = {}));