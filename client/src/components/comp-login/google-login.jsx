import {GoogleLogin} from 'react-google-login'

const client_id = '1002643795871-ic0d85gucomsc0mt4l0o056v9ootbfck.apps.googleusercontent.com'

function Login() {

    const onSuccess = (res) =>{
        console.log(res)
        console.log(res.accessToken)
        localStorage.setItem("gaccesstoken", res.accessToken);
        // window.location.reload();
    }

    const onFailure = (res) =>{
        console.log("login failed")
        console.log(res);
        window.location.reload()
    }
    
    return(
        <div id="signinButton">
            {/* google login using user credintials with private key */}
            <GoogleLogin
                clientId={client_id}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}
export default Login;