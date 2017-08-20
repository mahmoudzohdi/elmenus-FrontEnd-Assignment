import { Injectable, EventEmitter } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Category } from "../add-category/category.model";
import { CategoryItem } from "../add-item/category-item.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AddMenuService {

	private caregoriesEndPoint = AppSettings.API_ENDPOINT + 'categories';

	private categoryData: Category = new Category();
	private itemData: CategoryItem;

	public categoryAdded: EventEmitter<any> = new EventEmitter<any>();
	public itemAdded: EventEmitter<any> = new EventEmitter<any>();

	constructor(private http: Http) { }

	public addCategory(data): Observable<any> {

		this.categoryData.name = data.name;
		this.categoryData.description = data.description || '';
		this.categoryData.id = (Math.floor(Math.random() * 90000) + 10000);
		
		return this.http.post(this.caregoriesEndPoint, this.categoryData);
	}

	public addItem(data, category, itemId?): Observable<any> {
		this.itemData = new CategoryItem();
		this.itemData.name = data.name;
		this.itemData.description = data.description || '';
		this.itemData.id = itemId || (Math.floor(Math.random() * 90000) + 10000);
		this.itemData.price = data.price;
		if(category.items){

			if(itemId){
				for (let i = 0; i < category.items.length; i++) {
					if (category.items[i].id === itemId) {
							category.items[i] = Object.assign({}, this.itemData);
					}
				}
			}else{
				category.items.push(this.itemData)
			}

		}else{
			category.items = [this.itemData]
		}
		this.notifyItemAdded(category.id, this.itemData);
		return this.http.patch(this.caregoriesEndPoint+'/'+category.id, category);


	}

	public update(data): Observable<any> {

		this.itemData.name = data.name;
		this.itemData.description = data.description || '';
		this.itemData.id = data.id;
		
		return this.http.patch(this.caregoriesEndPoint+'/'+data.id, this.itemData);


	}

	public notifyCategoryAdded(){
		this.categoryAdded.emit(this.categoryData);
	}
	public notifyItemAdded(categoryId, itemData){
		this.itemAdded.emit({Id: categoryId, item: itemData});
	}

}
