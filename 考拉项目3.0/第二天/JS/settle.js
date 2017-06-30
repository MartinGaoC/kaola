
$('#Add').click(function () {
    $('#Adds').show()
});
$('#DeleteBtn').click(function () {
    $('#Adds').hide()
});
$('#DeleteBtnO').click(function () {
    $('#Adds').hide()
});

$(function () {
    move();

function move() {
    //
    // if($('#address_name').val() !== ""){
    //     $('#address_name').css({"border-color":"blue"});
    //
    // } else if($('#address').val() !== ""){
    //     $('#address').css({"border-color":"blue"});
    //
    // }else if($('#Ity').val() !== ""){
    //     $('#Ity').css({"border-color":"blue"});
    //
    // }
    $('#modile').blur(function () {
        if($('#modile').val() !== ""){
                $('#modile').css({"border-color":"blue"});

            }
    });
    $('#address_name').blur(function () {
        if($('#address_name').val() !== ""){
            $('#address_name').css({"border-color":"blue"});

        }
    });
    $('#address').blur(function () {
        if($('#address').val() !== ""){
            $('#address').css({"border-color":"blue"});

        }
    });
    $('#Ity').blur(function () {
        if($('#Ity').val() !== ""){
            $('#Ity').css({"border-color":"blue"});

        }
    });
    $('#KeepBtn').click(function () {
        var data = $("form").serialize();
        console.log(data);
        // if($('#modile').val() !== "" && $('#address_name').val() !== "" && $('#address').val() !== "" && $('#Ity').val() !== ""){
        //
        // }else{
        //     $('#modile').css({"border-color":"red"});
        //     $('#address_name').css({"border-color":"red"});
        //     $('#address').css({"border-color":"red"});
        //     $('#Ity').css({"border-color":"red"});
        //     // alert("no");
        //     return
        // }
        if($('#modile').val() !== ""){
            $('#modile').css({"border-color":"blue"});
        }else{
            $('#modile').css({"border-color":"red"});

        }
        if($('#address_name').val() !== ""){
            $('#address_name').css({"border-color":"blue"});
        }else{
            $('#address_name').css({"border-color":"red"});

        }
        if($('#address').val() !== ""){
            $('#address_name').css({"border-color":"blue"});
        }else{
            $('#address').css({"border-color":"red"});

        }
        if($('#Ity').val() !== ""){
            $('#address_name').css({"border-color":"blue"});
        }else{
            $('#Ity').css({"border-color":"red"});
            return
        }
        shop.api.addUserAddress(data, function (response) {
            console.log(response);
            if(response.code === 0){
                $('#Adds').hide();
                fetchUserAddress();
            }
        })
    });
    fetchUserAddress();
    function fetchUserAddress() {
        shop.api.fetchUserAddress(function (response) {
            console.log(response);
            var rece = "";
            for(var i = 0; i < response.data.length; i++){
                var obj = response.data[i];
                rece += '<div class="place" id="'+obj.address_id+'"><h1>'+obj.address_name+'&nbsp&nbsp收</h1><em>'+obj.city+'<br>'+obj.address+'<br>'+obj.mobile+'</em><span class="place-delete">删除</span><div class="place-shad"></div></div>';

            }
            $('#head-text-link-add').html(rece);
            $('.place-delete').click(function () {
                console.log(this);
                var parent = this.parentNode;
                shop.api.deleteUserAddress(parent, function (response) {
                    console.log(response);
                    $('#head-text-link-add')[0].removeChild(parent);
                })
            });
            var place = document.getElementsByClassName('place');
            for(var i = 0; i < place.length; i++){
                // i = this.index;

                place[i].onclick = function () {
                    for (var j =0; j < place.length; j++){
                        place[j].className = 'place';
                    }
                    console.log(this);
                    this.className = "place  place-link"
                }

            }
        })
    }
}
});

$(function() {
    $.get(
        'js/ChinaArea.xml',
        '',
        function(res){
            xmldom = $(res);
            xmldom.find('province').each(function(index,el){
                var pro_name = $(el).attr('province');
                var pro_ID = $(el).attr('provinceID');
                $('<option value="'+pro_ID+'">'+pro_name+'</option>').appendTo('#province');

                //监视省份变化
                $('#province').change(function(){
                    var pro_id = $(this).val();

                    var pro_two = pro_id.substr(0,2);
                    var citys = xmldom.find('City');

                    $('#city').empty().append('<option value="0">-请选择-</option>');
                    citys.each(function(index,el){
                        var city_two = $(el).attr('CityID').substr(0,2);
                        if(pro_two == city_two){
                            var city_id = $(el).attr('CityID');
                            var city_name = $(el).attr('City');
                            $('<option value="'+city_id+'">'+city_name+'</option>').appendTo('#city');
                        }
                    })
                })

                //监视市发生改变
                $('#city').change(function(){
                    var city_id = $(this).val();
                    var city_four = city_id.substr(0,4);

                    var areas = xmldom.find('Piecearea');
                    $('#area').empty().append('<option value="0">-请选择-</option>');
                    areas.each(function(index,el){
                        var area_four=$(el).attr('PieceareaID').substr(0,4);
                        if(city_four == area_four){
                            var area_id = $(el).attr('PieceareaID');
                            var area_name = $(el).attr('Piecearea')
                            $('<option value="'+area_id+'">'+area_name+'</option>').appendTo('#area')
                        }
                    })
                })
            })
        }
    )




})
