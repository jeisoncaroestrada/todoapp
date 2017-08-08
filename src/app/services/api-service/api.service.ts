import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
	public apiUrl = environment.apiEndpoint;

	public getUrl(model: String) {
		return this.apiUrl + model;
	}

	constructor() { }

}
