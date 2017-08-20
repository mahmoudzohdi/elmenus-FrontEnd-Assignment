import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddMenuService } from '../shared/add-menu.service';
import { Category } from './category.model';

@Component({
  selector: 'add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

	public addCategoryForm: FormGroup;
	public category: Category;

  constructor(private fb: FormBuilder, private addCategory: AddMenuService) {
		this.addCategoryForm = fb.group({
            name : ["", Validators.required],
            description : ""
        });
	}

  ngOnInit() {
	}

	private onSubmit(){
		this.addCategory.addCategory(this.addCategoryForm.value).subscribe((res)=>{
			this.addCategory.notifyCategoryAdded();
			this.addCategoryForm.reset();
		});
	}

}
