$(function(){
   $.ajax({
     "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem('token'),
       "type": "GET",
       "dataType": "json",
       "success": function (response) {
           console.log(response);
           if(response.data.length > 0) {
               for (var i = 0; i < response.data.length; i++) {
                   var obj = response.data[i];
                   var goods = $('<div class="goods"></div>');
                   var goodsBox = $('<div class="goods-box"></div>');
                   var goodsLists = $('<div class="goods-lists"></div>');
                   var goodsOp = $('<div class="goods-op"></div>');
                    $('#Shop').append($(goods));
                    goods.append($(goodsBox));
                   goodsBox.append($('<input type="checkbox">'));
                   goodsBox.append($('<input type="hidden" class="goods_id" value="'+obj.goods_id+'"/>'));
                   goodsBox.append($('<img src="'+ obj.goods_thumb +'"/>'));
                   goodsBox.append($('<p></p>').text(obj.goods_name));
                    goods.append($('<div class="goods-one"></div>').text(obj.goods_price));
                    goods.append(goodsLists);
                    goodsLists.append($('<span class="left-button" id="left-button" onclick="minusGoods(this)"></span>').text("-"));
                    goodsLists.append($('<input class="center-text" id="center-text" onblur="setGoods(this)" onkeydown="stepSetGoods(this, event)"/>').val(obj.goods_number));
                   goodsLists.append($('<span class="right-button" id="right-button" onclick="plusGoods(this)"></span>').text("+"));
                   goods.append($('<div class="goods-sum"></div>').text(obj.goods_price));
                   goods.append($(goodsOp));
                   goodsOp.append($('<span onclick="deleteGoods(this)"></span>').text("删除"));

               }
               var shopSetBox = $('<div class="shop-set-box"></div>');
               $('#shopSet').append(shopSetBox);
               shopSetBox.append($('<input type="checkbox">'));
               shopSetBox.append($('<span></span>').text("全选"));
               var shopSetBoxRi = $('<div class="shop-set-box-ri"></div>');
               shopSetBox.append(shopSetBoxRi);
               shopSetBoxRi.append($('<p class="shop-set-box-ri-1"></p>').html("已选商品" + '<em>1</em> ').append($('<h6>总价（不含运费）：<em>￥20</em></h6>')));
               shopSetBoxRi.append($('<a>去结算</a>'));
               // var leftButton = document.getElementById('left-button');
               // leftButton.onclick = function () {
               //     minusGoods(this)
               // };
               // var rightButton = document.getElementById('right-button');
               // rightButton.onclick = function () {
               //     plusGoods(this)
               // };
               // var centerText = document.getElementById('center-text');
               // centerText.onclick = function () {
               //     setGoods(this);
               // };
               // centerText.onkeydown = function () {
               //   stepSetGoods(this);
               // }
           }
       }
    })
});


$('#Shop').click(function (event) {
    if(event.target.type === 'checkbox'){
        showSum();
        checkSelectAll();
    }
});

// 删除某件商品
function deleteGoods(obj) {
    updataCart(obj, 0);
    var goods = obj.parentNode.parentNode;
    Shop.removeChild(goods);
}
// 加某件商品
function plusGoods(obj) {
    updataCart(obj, '+1')
}
// 减某件商品
function minusGoods(obj) {
    updataCart(obj, '-1');
}
//设置某件商品
function setGoods(obj) {
    var num = parseInt($(obj).val());
    if(num < 1 || isNaN(num)) $(obj).val(1);
    if(num > 10) $(obj).val(10);
    updataCart(obj, $(obj).val());
}
//键盘事件
function stepSetGoods(obj, event) {
    var event = event || window.event;
    event.preventDefault();
    if(event.keyCode === 40){
        minusGoods(obj)
    } else if(event.keyCode === 38){
        plusGoods(obj);
    }
}
function updataCart(obj, num) {
    var Shop = obj.parentNode.parentNode;
    var goods_id = Shop.getElementsByClassName('goods_id')[0].value;
    var goods_number = Shop.getElementsByClassName('center-text')[0];
    var goods_number_value = parseInt(goods_number.value);
    var goods_price = Shop.getElementsByClassName('goods-one')[0];
    var goods_price_value = parseInt(goods_price.value);
    var goods_subtotal = Shop.getElementsByClassName('goods-sum')[0];
    if(num === '-1' && goods_number_value <= 1){
        return;
    }
    if(num === "+1" && goods_number_value >= 10){
        return;
    }
    if(num === '-1') {
        goods_number_value--;
    } else if(num === '+1') {
        goods_number_value++;
    } else if(num > 0) {
        goods_number_value = num;
    } else {
        goods_number_value = 0;
    }
    goods_number.value = goods_number_value;
    var subtotal = goods_number_value * goods_price_value;
    goods_subtotal.innerText = subtotal;

    updateCartInfo(goods_id, goods_number_value, function () {
        
    })
}
function updateCartInfo(goods_id, goods_number, callback) {
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
        "type": "POST",
        "data": {
            "goods_id": goods_id,
            "number": goods_number
        },
        "dataType": "json",
        "success": function(response) {
            console.log(response);
            //加入购物车了之后把商品ID和对应的数量存储到本地
            localStorage.setItem('cart'+goods_id, goods_number);
            callback(response);
        }
    });
}
