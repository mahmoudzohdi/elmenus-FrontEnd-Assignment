import { Injectable, EventEmitter } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { CategoryItem } from "./category-item.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AddItemService {

	private url = AppSettings.API_ENDPOINT + 'categories';

	private itemData: CategoryItem = new CategoryItem();

	public itemAdded: EventEmitter<any> = new EventEmitter<any>();

	constructor(private http: Http) { }

	public add(data, category): Observable<any> {

		this.itemData.name = data.name;
		this.itemData.description = data.description || '';
		this.itemData.id = (Math.floor(Math.random() * 90000) + 10000);
		this.itemData.price = data.price;
		category.items.push(this.itemData);
		
		return this.http.patch(this.url+'/'+category.id, category);


	}

	public update(data): Observable<any> {

		this.itemData.name = data.name;
		this.itemData.description = data.description || '';
		this.itemData.id = data.id;
		
		return this.http.patch(this.url+'/'+data.id, this.itemData);


	}	

	public notifyItemAdded(){
		this.itemAdded.emit(this.itemData);
	}

}