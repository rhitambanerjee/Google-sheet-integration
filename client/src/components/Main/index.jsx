import styles from "./styles.module.css";
import LoginButton from '../comp-login/google-login'
import LogoutButton from '../comp-login/google-logout'
import {gapi} from 'gapi-script'
import { useEffect } from "react";


const client_id = '1002643795871-ic0d85gucomsc0mt4l0o056v9ootbfck.apps.googleusercontent.com'

const Main = () => {

	useEffect(()=>{
		function start(params) {
			gapi.client.init({
				clientId:client_id,
				scope:""
			})
		};

		gapi.load('client:auth2',start);
	})
	




	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const gtoken = localStorage.getItem("gaccesstoken");

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Hello</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			{gtoken?(
				<LogoutButton/>
			):(
				<LoginButton/>
			)}
		</div>
	);
};

export default Main;
