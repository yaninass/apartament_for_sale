import {makeAutoObservable} from "mobx";

export default class FlatAgency {
    constructor(){
        this._district = []
        this._flats = []
        this._selectedDistrict={}
        this._page = 1
        this._totalCount = 0
        this._limit = 6
        makeAutoObservable(this)

    }

    setDistrict(district){
        this._district=district
    }
    setFlats(flats){
        this._flats=flats
    }
    setSelectedDistrict(district){
        this._selectedDistrict=district
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get district(){
        return this._district 
    }
    getflats(){
        return this._flats
    }
    get selectedDistrict(){
        return this._selectedDistrict
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}