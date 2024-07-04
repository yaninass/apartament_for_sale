import {makeAutoObservable} from "mobx";

export default class FeedbackAgency {
    constructor(){
        this._feedbacks = []
        makeAutoObservable(this)
    }
    setFeedback(feedbacks){
     this._feedbacks=feedbacks
    }
    getFeedback(){
        return this._feedbacks
    }
}