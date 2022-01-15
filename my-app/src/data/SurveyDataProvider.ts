import axios from 'axios';

export class SurveyDataProvider {
    public static createPublicSurvey(data: any) {
        let status = 0;
		return axios.post(`http://localhost:5000/surveys/publicSurvey`, {
                Title: data.title,
			    Questions: data.questions,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + data.creatorId,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
            }
        }).then(res => {
			console.log(res.data);
			status = res.status;
			return status;
		}).catch(er => {
			console.log(er);
			return status;
		});
	}

    public static createPrivateSurvey(data: any) {
        let status = 0;
		return axios.post(`http://localhost:5000/surveys/privateSurvey`, {
                Title: data.title,
			    Questions: data.questions,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + data.creatorId,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
            }
        }).then(res => {
			console.log(res.data);
			status = res.status;
			return status;
		}).catch(er => {
			console.log(er);
			return status;
		});
	}

    public static createDistributedSurvey(data: any) {
        let status = 0;
		return axios.post(`http://localhost:5000/surveys/distributedSurvey`, {
                Title: data.title,
			    Questions: data.questions,
                AmountOfSurveysToDistribute: data.tokens,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + data.creatorId,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
            }
        }).then(res => {
			console.log(res.data);
			status = res.status;
			return status;
		}).catch(er => {
			console.log(er);
			return status;
		});
	}

    public static getAllUserSurveys(token: string) {
        let data: any = "";
		return axios.get(`http://localhost:5000/surveys`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
            }
        }).then(res => {
			console.log(res.data);
            data = res.data;
			return data;
		}).catch(er => {
			console.log(er);
			return data;
		});
	}

    
}