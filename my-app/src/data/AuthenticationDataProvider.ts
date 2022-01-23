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

	public static sendConfirmationCode(email: string) {
		let data = 0;
		return axios.post(`http://localhost:5000/authorization/sendConfirmationCode`, {
			email: email,
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

	public static verifyAccount(email: string, confirmationCode: string) {
		let data = 0;
		return axios.post(`http://localhost:5000/authorization/confirmEmail`, {
			email: email,
			confirmationCode: confirmationCode,
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

	public static resetPassword(email: string) {
		let data = 0;
		return axios.post(`http://localhost:5000/authorization/resetPassword`, {
			email: email,
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

	public static getUserData(userToken: string) {
		let data = '';
		return axios.get(`http://localhost:5000/authorization/profile`, {
			headers: {
				'Authorization': 'Bearer ' + userToken,
			}
		}).then(res => {
			console.log(res.data);
			data = res.data.email;
			return data;
		}).catch(er => {
			console.log(er);
			return data;
		});
	}
}

