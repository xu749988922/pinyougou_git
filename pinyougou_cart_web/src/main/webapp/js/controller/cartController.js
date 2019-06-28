window.onload=function () {
    var app = new Vue({
        el:"#app",
        data:{
            //购物车列表
            cartList:[],
            //统计业务实体{总数量，总金额}
            totalValue:{totalNum:0, totalMoney:0.00 }
        },
        methods:{
            //查询当前用户购物车列表
            findCartList:function () {
                axios.get("/cart/findCartList.do").then(function (response) {
                    app.cartList = response.data;

                    //总金额与总数量清0
                    app.totalValue = {totalNum: 0, totalMoney: 0.00};
                    //刷新总数量与金额
                    for(let i = 0; i < app.cartList.length; i++){
                        let orderItems = app.cartList[i].orderItemList;
                        for(let j = 0; j < orderItems.length; j++){
                            //统计数量
                            app.totalValue.totalNum += orderItems[j].num;
                            //统计金额
                            app.totalValue.totalMoney += orderItems[j].totalFee;
                            //app.totalValue.totalMoney += 0.00001;
                        }
                    }
                })
            },
            //操作购物车
            //cart/addGoodsToCartList.do?itemId=1369293&num=-1
            addGoodsToCartList:function (itemId,num) {
                axios.get("/cart/addGoodsToCartList.do?itemId="+itemId+"&num=" + num).then(function (response) {
                    if(response.data.message){
                        //刷新购物列表
                        app.findCartList();
                    }else{
                        alert(response.data.message);
                    }
                })
            }
        },
        created:function () {
            this.findCartList();
        }
    });
}