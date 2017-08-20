import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryItem } from './category-item.model';
import { AddMenuService } from '../shared/add-menu.service';

@Component({
  selector: 'add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

	public addItemForm: FormGroup;
	private submitBtnText: string = 'Add';

	@Input() public categoryData;
	@Input() public itemData: CategoryItem = new CategoryItem();

  constructor(private fb: FormBuilder, private addItem: AddMenuService) {
	}

  ngOnInit() {
		this.addItemForm = this.fb.group({
				name : [this.itemData.name || "", Validators.required],
				description : this.itemData.description || "",
				price : [this.itemData.price || "", Validators.required],
		});
		this.submitBtnText = this.itemData.name? 'Save': 'Add';
	}
	private onSubmit(){
		this.addItem.addItem(this.addItemForm.value, this.categoryData, this.itemData.id).subscribe((res)=>{
			this.addItemForm.reset();
		});
	}

}
