import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { User } from '../../../models/User';

@Injectable()
export class UserProfileService {
	private data: Observable<any>;
	public cover: any = ''
    public avatar: any = ''
    public profileDetails: any = ''
	private coverSubject = new Subject<any>();
	private avatarSubject = new Subject<any>();
    private detailsSubject = new Subject<any>();
    private isUpdatingSubject = new Subject<any>();
    private modalCoverSubject = new Subject<any>();
    private modalAvatarSubject = new Subject<any>();
    private modalPasswordSubject = new Subject<any>();
    private modalDetailsSubject = new Subject<any>();

    private modalTaskSubject = new Subject<any>();

	constructor(
		private http: Http,
	) { 

	}
	/* ---------------------- FOTO DE PORTADA --------------------------------------*/
	//configura la foto de portada
	setCover(cover: string) {
        this.cover = cover
        this.coverSubject.next(cover);
    }

  	//configura la foto de portada
    getCover(): Observable<any> {
        return this.coverSubject.asObservable();
    }

    //retorna el estado(valor) actual de la foto de portada
    getStateCover(): any{
        return  this.cover;
    }

    /* ---------------------- FOTO DE PERFIL --------------------------------------*/
    //configura la foto de perfil
	setAvatar(avatar: string) {
        this.avatar = avatar
        this.avatarSubject.next(avatar);
    }

  	//configura la foto de perfil
    getAvatar(): Observable<any> {
        return this.avatarSubject.asObservable();
    }

    //retorna el estado(valor) actual de la foto de perfil
    getStateAvatar(): any{
        return  this.avatar;
    }

    /* ---------------------- OTROS DETALLES DEL PERFIL --------------------------------------*/
    //configura los detalles de perfil
    setDetails(details: Array<any>) {
        this.profileDetails = details
        this.detailsSubject.next(details);
    }

    //devuelve los detalles de perfil
    getDetails(): Observable<any> {
        return this.detailsSubject.asObservable();
    }

    //retorna el estado(valor) actual de la foto de perfil
    getStateProfileDetails(): any{
        return  this.profileDetails;
    }

    /* ---------------------- INDICA QUE SE ESTA PROCESANDO UNA PETICION --------------------------------------*/
    setIsUpdating(isUpdating: boolean) {
        this.isUpdatingSubject.next(isUpdating);
    }

    getIsUpdating(): Observable<any> {
        return this.isUpdatingSubject.asObservable();
    }

    /* ---------------------- ABRE Y CIERRA EL MODAL EDITAR COVER --------------------------------------*/
    setModalCover(modalCover: boolean) {
        this.modalCoverSubject.next(modalCover);
    }

    getModalCover(): Observable<any> {
        return this.modalCoverSubject.asObservable();
    }

    /* ---------------------- ABRE Y CIERRA EL MODAL EDITAR AVATAR --------------------------------------*/
    setModalAvatar(modalAvatar: boolean) {
        this.modalAvatarSubject.next(modalAvatar);
    }

    getModalAvatar(): Observable<any> {
        return this.modalAvatarSubject.asObservable();
    }

    /* ---------------------- ABRE Y CIERRA EL MODAL EDITAR PASSWORD --------------------------------------*/
    setModalPassword(modalPassword: boolean) {
        this.modalPasswordSubject.next(modalPassword);
    }

    getModalPassword(): Observable<any> {
        return this.modalPasswordSubject.asObservable();
    }

    /* ---------------------- ABRE Y CIERRA EL MODAL EDITAR DETALLESDE CONTACTO --------------------------------------*/
    setModalDetails(modalDetails: boolean) {
        this.modalDetailsSubject.next(modalDetails);
    }

    getModalDetails(): Observable<any> {
        return this.modalDetailsSubject.asObservable();
    }




    /* ---------------------- ABRE Y CIERRA EL MODAL EDITAR PASSWORD --------------------------------------*/
    setModalTask(modalTask: boolean) {
        this.modalTaskSubject.next(modalTask);
    }

    getModalTask(): Observable<any> {
        return this.modalTaskSubject.asObservable();
    }


}