var goods_id = al.getQueryString('goods_id');
// console.log(goods_id);

$.ajax({
    'url': 'http://h6.duchengjiu.top/shop/api_goods.php?goods_id=' + goods_id,
   'type': 'GET',
    'dataType': 'json',
    'success': function (response) {
        var obj = response.data[0];
        console.log(obj);
        var shopList = $('#shopList');
        var oImg = $('<img src="' + obj.goods_thumb +  '"/>');
        // oImg.src = obj.goods_thumb;
        shopList.append(oImg);
        var shopListRight = $('#shopListRight');
        var oh1 = $('#oh1').text(obj.goods_name);
        // oh1.innerText = obj.goods_name;
        var slroPrice = $('#slroPrice').text("￥"+obj.price);
        // slroPrice.innerText = obj.price;
        var num = 1;
        $('#rightButton').click(function () {
            // var num = $('#centerText').val();
            num++;
            $('#centerText').text(num);
            // obj.price=obj.price;
            var Price = num * obj.price;
            slroPrice = $('#slroPrice').text("￥" + Price);
        });
        $('#leftButton').click(function () {
            num--;
            if(num === 0) num=0;
            $('#centerText').text(num);
            var Prices = num * obj.price;
            slroPrice = $('#slroPrice').text("￥" + Prices);
        })
    }
});
