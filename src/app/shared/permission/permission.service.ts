import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class PermissionService {

	public isAdmin: EventEmitter<boolean> = new EventEmitter<boolean>()

	constructor() { }
	
	public checkIsAdmin(role){
		return role == 'admin'? this.isAdmin.emit(true) : this.isAdmin.emit(false);
	}

}
