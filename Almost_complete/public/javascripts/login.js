$(document).ready(function(){

    // 로그인 처리
    $('#login-submit').click(function(e) {
        if ($("#userid").val() == '') {
            alert('아이디를 입력하세요');
            $("#userid").focus();
            return false;
        }

        if ($("#password").val() == '') {
            alert('비밀번호를 입력하세요');
            $("#password").focus();
            return false;
        }
        var Info={
            'userId': $('#userid').val(),
			'password' : $('#password').val()
        }
        $.ajax('/LogInForm',{
            'method': 'GET',
            'data': {
                'Info' : Info
            },
            'success': function(list){
                list=JSON.parse(list).list;
                for (var i=0, len=list.length; i < len; i++){
                    if (list[i].userId==Info['userId']){
                        if (list[i].password==Info['password']){
                            location.href='/';
                        }
                    }
                }
            }
        }) 
})
    $('#makeInfo').click(function(e){
        location.href='/signup';
    })
});
