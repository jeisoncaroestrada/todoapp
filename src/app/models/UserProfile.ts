export class UserProfile {
	name1: string = '' ;
	name2: string = '' ;
	lastname1: string = '' ;
	lastname2: string = '' ;
	email: string = '' ;
	contact_details: Array<any> = []
	telephone: string = '' ;
	phone: string = '' ;
	user_name: string = '' ;
	


	constructor(userInfo:any) {
	    this.name1 =  this.parceNull(userInfo.name1);
		this.name2 =  this.parceNull(userInfo.name2);
		this.lastname1 =  this.parceNull(userInfo.lastname1);
		this.lastname2 =  this.parceNull(userInfo.lastname2);
		this.email =  this.parceNull(userInfo.email);
		this.telephone =  this.parceNull(userInfo.telephone);
		this.phone =  this.parceNull(userInfo.phone);
		this.user_name =  this.parceNull(userInfo.user_name);
	}

	private parceNull(param) {
		if (param) {
			return param;
		}else{
			return '';
		}
	}
}