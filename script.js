// GitHub signIn 
const signInBtn = () => {
    const userName = document.getElementById('username')
    const passWord = document.getElementById('password')

    const user = userName.value ;
    const pass = passWord.value ;

    if(user == 'admin' && pass == 'admin123'){
        alert("Login Successful")
        window.location.assign("/home.html")
    }
    else{
        alert("Login Failed")
        return ;
    }
}

//Homepage 