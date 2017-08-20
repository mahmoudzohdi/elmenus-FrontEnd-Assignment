import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from "./menu.service";
import { AddMenuService } from "./shared/add-menu.service";
import { PermissionService } from "../shared/permission/permission.service";
import { SemanticModalComponent } from "ng-semantic/src/modal/modal";
// import { SemanticModalComponent } from "ng-semantic/ng-semantic";


@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	public menu;
	public isAdmin: boolean = false;
	private editCategory: object;
	private itemObj: object;
	private editMode: boolean = false;

	@ViewChild('editItemModal') public editItemModal:SemanticModalComponent;

	constructor(private menuService: MenuService, private categoryService: AddMenuService, private checkPermission: PermissionService) { }
	ngOnInit() {
		// get menu data (categories & items)
		this.getMenuData();

		// subscribe on category added notifier
		this.categoryService.categoryAdded.subscribe((category) => {
			this.menu.push(category);
		});

		// subscribe on item added notifier
		this.categoryService.itemAdded.subscribe((res) => {
			this.menu = this.menu.map((item) => item.id == res.id? item.items.push(res.item) : item );
			this.editDone();
		});

		// subscribe on login permission notifier
		this.checkPermission.isAdmin.subscribe((res) => {
			this.isAdmin = res;
		});

	}
	private getMenuData() {
		this.menuService.getMenu().subscribe((res) => {
			this.menu = res;
		});
	}
	private deleteCategoryItem(category, itemId) {
		category.items = category.items.filter( (item) => item.id != itemId );
		this.menuService.deleteCategoryItem(category).subscribe();
	}
	
	private editItem(category, item){
		this.itemObj = item;
		this.editCategory = category;
		this.editMode = true;
		this.editItemModal.show();
	}
	
	private editDone(){
		this.editMode = false;
		this.editItemModal.hide();
	}

	

	

}
