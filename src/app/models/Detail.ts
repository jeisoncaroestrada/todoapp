export class Detail {
	detail_type: string = '' ;
	name: string = '' ;
	text: string = '' ;
	value: string = '' ;
	uid: string = '';

	constructor(detailInfo:any) {
	    this.detail_type =  this.parceNull(detailInfo.detail_type.name);
		this.name =  this.parceNull(detailInfo.name);
		this.value =  this.parceNull(detailInfo.value);
		this.text =  this.parceNull(detailInfo.detail_type.text);
		this.uid =  this.parceNull(detailInfo.uid);
	}

	private parceNull(param) {
		if (param) {
			return param;
		}else{
			return '';
		}
	}
}