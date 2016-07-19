'use strict';
//创建数据库 add by huangbowen 2015-6-23
var shortName = 'shoppingmallsdb';    					//一个指向硬盘上的数据库文件字符串
var version = '1.0';        								//数据库版本号
var displayName = 'shoppingMall DB';    					//对用户显示的字符串
var maxSize = 10*1024;        							//允许数据库增长的最大KB数
var db = openDatabase(shortName, version, displayName, maxSize);
//删除表语句
//		tx.executeSql('DROP TABLE shoppingCar');//删除shoppingCar购物车表
//通过日期得到id
function getIdByTime(){
	var date =new Date();
	var year=date.getYear().toString().substring(1,3);
	var month=(date.getMonth()+1).toString();
	var day=date.getDate().toString();
	var hour=date.getHours().toString();
	var minute=date.getMinutes().toString();
	var seconds=date.getSeconds().toString();
	var mill=date.getMilliseconds().toString();
	var id=year+month+day+hour+minute+seconds+mill;
	return id;
}
//-------------------------------------------创建表begin-------------------------------------------------------------------------------------
function createTable(){
	db.transaction(function (tx) {
	//-------------------------------------------购物车表--------------------------------------
       	tx.executeSql('CREATE TABLE IF NOT EXISTS shoppingCar ('
			       		+'id unipue,'						//主键唯一标识
			       		+'goodsIds,'							//商品Id
			       		+'goodsIcon,'						//商品照片
			       		+'goodsName,'						//商品名称
			       		+'goodsTotal,'						//商品总量
			       		+'goodsThen,'						//商品剩余量
			       		+'remark'							//备注
       				+')',[],function(){
       			console.log("创建shoppingCar表成功");
       		},
       		function(tx,error){console.log("创建shoppingCar表失败"+error.message)});
	});
};

//================================================操作数据库开始==============================================
//shopping操作
//查询ID是否存在，先查再插入
//function selectGoodsId(shopCarList,userId){
//	var id=getIdByTime();
//	console.log("进入selectGoodsId方法,userId："+userId);
////	查库
//	var sql="SELECT * FROM shoppingCar where goodsIds=?";
//	db.transaction(function(tx){
//		tx.executeSql(sql,[userId],function(tx,result){
//		var len = result.rows.length;
//		    if(len > 0){
//		    			console.log("length大于零");
//					plus.nativeUI.toast( "已成功添加到清单!",{verticalAlign:"bottom"});
//			}else{
////				insertShopCar(shopCarList,userId);
//				console.log("length等于零");
//				tx.executeSql('INSERT INTO shoppingCar (id,goodsIds,goodsIcon,goodsName,goodsTotal,goodsThen,remark) values(?,?,?,?,?,?,?)'
//				,[id,userId,shopCarList.goodsIcon,shopCarList.goodsName,shopCarList.goodsTotal,shopCarList.goodsThen,""],function(){
//					console.log("插入shoppingCar成功");
//					plus.nativeUI.toast( "已成功添加到清单!",{verticalAlign:"bottom"});
//				},function(tx,error){
//					console.log("插入insertShopCar表失败:"+error.message);
//				});
//		    	}
//		});
//	});
//}
////插入商品信息
//function insertShopCar(userId,shopCarList){
//	console.log("进入insertShopCar方法:"+userId);
////	if($scope.selectmark){//新单存库
// 		var id=getIdByTime();
//		db.transaction(function (tx) {
//				
//		});
//}
//查询购物车表, 加载购物车列表
//function selectShoCarList(){
//	var shoppinglistVos=[];
//	var sql="SELECT * FROM shoppingCar";
//	db.transaction(function(context){
//		context.executeSql(sql,[],function(tx,result){
//		console.log("进入查询");
//		    if(result.rows.length>0){
//		    	console.log("长度大于零");
//		        for(var i=0;i<result.rows.length;i++){
//		        	console.log("进入循环");
//				   shoppinglistVos.push(result.rows.item(i));  
//		    		}
//				console.log("查询结果："+JSON.stringify(shoppinglistVos));
//			}else{
//				console.log("长度小于1.");
//			}
//		    localStorage.setItem("shoppinglistVos",JSON.stringify(shoppinglistVos));
//		});
//	});
//}










