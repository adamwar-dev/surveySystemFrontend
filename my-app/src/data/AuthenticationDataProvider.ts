import axios from 'axios';
export class AuthenticationDataProvider {

	public static createAccount(email: string, password: string) {
		let data = 0;
		return axios.post(`http://localhost:5000/authorization/register`, {
			email: email,
			password: password,
		}).then(res => {
			console.log(res);
			console.log(res.data);
			data = res.status;
			return data;
		}).catch(er => {
			console.log(er);
			return data;
		});
	}

	public static singIn(email: string, password: string) {
		let data = '';
		return axios.post(`http://localhost:5000/authorization/login`, {
			email: email,
			password: password,
		}).then(res => {
			console.log(res);
			console.log(res.data);
			data = res.data.access_token;
			return data;
		}).catch(er => {
			console.log(er);
			return data;
		});
	}
}

