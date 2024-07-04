import {makeAutoObservable} from "mobx";
import { makeObservable, observable, action, computed } from "mobx";

export default class UserAgency {
    constructor(){
        this._isAuth = false
        this._user = {}
        makeObservable(this,{
            _isAuth: observable,
            _user: observable,
            setIsAuth: action,
            setUser: action,
            isAuth: computed,
            user: computed,
        })

    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    setUser(user){
        this._user = user
    }

    get isAuth(){
        return this._isAuth
    }

    get user(){
        return this._user
    }
}