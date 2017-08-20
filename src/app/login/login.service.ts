import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

	private apiUrl = AppSettings.API_ENDPOINT + 'users';
	
	constructor(private http: Http) { }
	
	public userAuth(data) : Observable<any> {
		let user = {
			username: data.username,
			password: data.password
		}
		return this.http.get(this.apiUrl + '?username=' + user.username + '&password=' + user.password).map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));

		}

}
