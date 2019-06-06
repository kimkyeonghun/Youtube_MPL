$(function() {
    // 로그인 처리
    $('#submit').click(function(e) {
        if ($("#fname").val() == '') {
            alert('이름을 입력하세요');
            $("#fname").focus();
            return false;
        }
        if ($("#email").val()== ''){
            alert('아이디를 입력하세요.')
            $('#email').focus();
            return false;
        }
        if ($("#ssnein").val()==''){
            alert("API키를 입력하세요");
            $("#ssnein").focus();
            return false;
        }
        if ($("#passwd").val() == '') {
            alert('비밀번호를 입력하세요');
            $("#passwd").focus();
            return false;
        }
        if ($("#passwdcheck").val() != $("#passwd").val()){
            alert("비밀번호 불일치");
            $("#passwdcheck").focus();
            return false;
        }

        $.ajax('/SignUpForm',{
            'method': 'Post',
            'data': {
                'fname': $('#fname').val(),
                'userId': $('#email').val(),
                'API':$('#ssnein').val(),
                'password' : $('#passwd').val(),
            },
            'success': function(e){
                location.href='/';
            }
        }) 
})
});