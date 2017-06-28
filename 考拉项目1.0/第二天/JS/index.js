// var navList = document.getElementById('nav-list');
// $.ajax({
//     "url": "http://lc.shudong.wang/api_cat.php",
//     'type': 'GET',
//     'dataType': 'json',
//     'success': function(response){
//         // 处理返回的数据
//         console.log(response);
//         for(var i = 0; i < response.data.length; i++){
//             var obj = response.data[i];
//             var oLi = document.createElement('li');
//             var oA = document.createElement('a');
//             oA.innerText = obj.cat_name;
//             oA.href = 'list.html?cat_id=' + obj.cat_id;
//             navList.appendChild(oLi);
//             oLi.appendChild(oA);
//         }
//     },
//     "error": function(message) {
//         //
//         console.log(message);
//     }
// });



// 阿贾克斯的调用

// var ButtonPrev = ;
var shop = document.getElementById('shop');
var page = 1;
$('#ButtonPrev').click(function () {
    page --;
    if(page <= 1)page = 1;
    shop.innerHTML = null;
    Cut(page);
});
// ButtonPrev.addEventListener('click', function () {
//
// });
$('#ButtonNext').click(function () {
   page ++;
   shop.innerHTML = null;
   Cut(page);
});
$('#ButtonCenter').click(function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if(target.nodeName === "SPAN"){
        page = target.innerText;
        shop.innerHTML = null;
        ButtonCenter.innerHTML = null;
        ButtonCenter.style.marginLeft = -page * 52 + "px";
    }
    Cut(page)
});
Cut(page);
function Cut(page) {
$.ajax({
    'url': 'http://h6.duchengjiu.top/shop/api_goods.php?&page='+page+'&pagesize='+40 ,
    'type': 'GET',
    'dataType':'json',
    'success': function (response) {
        console.log(response);
        for(var j = 0; j < response.page.page_count; j++){
                $('#ButtonCenter').append($('<span></span>').html(j))
        }

        for(var i = 0; i < response.data.length;i++){
            var obj = response.data[i];
            console.log(obj);

            var oDiv = $('<div></div>');
            $('#shop').append(oDiv);
            var OLink = $('<a href ='+"shopList.html?goods_id=" + obj.goods_id + '></a>');
            oDiv.append(OLink);
            var oImg = $('<img src="'+obj.goods_thumb+'"/>');
            OLink.append(oImg);
            var oP = $('<P></P>').html(obj.goods_desc);
            OLink.append(oP);
            var oA = $('<a></a>').html(obj.goods_name);
            OLink.append(oA);
            var oEm = $('<em></em>').html("售价："+ obj.price);
            OLink.append(oEm);
        }
    }
});

}











// 四步走方式
// var xhr = new XMLHttpRequest();
//
//
// xhr.onreadystatechange = function () {
//   if(xhr.readyState == 4) {
//       var response = JSON.parse(xhr.responseText);
//       for(var i = 0; i < response.data.length-4; i++){
//           var obj = response.data[i];
//           var oli =  document.createElement('li');
//           var oA = document.createElement('a');
//           oA.href =
//           oA.innerText = obj.cat_name;
//           oli.appendChild(oA);
//           navList.appendChild(oli);
//       }
//   }
// };
// xhr.open('GET', 'http://lc.shudong.wang/api_cat.php');
// xhr.send();


// var Shop = document.getElementById('shop');
//
// var ShopLi = new XMLHttpRequest();
//
// ShopLi.onreadystatechange = function () {
//     if(ShopLi.readyState == 4){
//         console.log(ShopLi.responseText);
//         var response = JSON.parse(ShopLi.responseText);
//         for(var i = 0; i < response.data.length;i++){
//             var obj = response.data[i];
//             console.log(obj);
//             var oDiv = document.createElement('div');
//             Shop.appendChild(oDiv);
//             var oImg = document.createElement('img');
//             oImg.src = obj.goods_thumb;
//             oDiv.appendChild(oImg);
//             var oP = document.createElement('p');
//             oP.innerText = obj.goods_desc;
//             oDiv.appendChild(oP);
//             var oA = document.createElement('a');
//             oA.innerText = obj.goods_name;
//             oDiv.appendChild(oA);
//         }
//     }
// };
// ShopLi.open('GET', 'http://lc.shudong.wang/api_goods.php');
// ShopLi.send();