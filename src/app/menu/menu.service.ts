import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MenuService {

	private caregoriesEndPoint = AppSettings.API_ENDPOINT + 'categories';

	constructor(private http: Http) { }
	
	public getMenu() : Observable<any> {
		return this.http.get(this.caregoriesEndPoint).map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	public deleteCategoryItem(category){
		return this.http.patch(this.caregoriesEndPoint+'/'+category.id, category);
	}
}