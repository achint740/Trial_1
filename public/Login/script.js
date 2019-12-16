
$('#signup').on('click',function(){
    console.log('SignUp button Clicked');

    let user = {
        name : $('#name').val(),
        mobile : $('#phone').val(),
        password : $('#pswrd').val(),
        email : $('#mail').val()
    }

    $.post('/adduser',user,(data)=>{
        if(data === 'Success'){
            console.log('Added User!!');
        }
    });
});