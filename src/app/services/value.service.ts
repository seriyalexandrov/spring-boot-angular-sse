import {Injectable} from '@angular/core'

import {Http, Response, Headers, RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import {Subject} from "rxjs";

export class Value {
    id: string;
    value: string;
}

@Injectable()
export class ValueService {
    constructor(private http: Http) {
    }

    getValues(): Observable<Value[]> {
        return this.http.get("/rest/values")
            .map(res => res.json())
    }

    subscribe(): Subject<any> {
        let eventSource = new EventSource("/rest/values/subscribe");
        let subscription = new Subject();
        eventSource.addEventListener("message", event=> {
            console.info("Got event: " + event);
            subscription.next(event);
        });
        return subscription;
    }


    createValue(value: Value): Observable<Value> {
        let bodyString = JSON.stringify(value);
        let headers = new Headers({'Content-Type': 'application/json'});
        let requestOptions: RequestOptions = new RequestOptions({headers: headers});
        console.log("Creating Value : " + bodyString);
        return this.http.post("/rest/values", bodyString, requestOptions)
            .map((res: Response) => res.json())
    }

    updateValue(value: Value): Observable<Value> {
        let bodyString = JSON.stringify(value);
        let headers = new Headers({'Content-Type': 'application/json'});
        let requestOptions: RequestOptions = new RequestOptions({headers: headers});
        console.log("Updating Value : " + bodyString);
        return this.http.put("/rest/values/" + value.id, bodyString, requestOptions)
            .map((res: Response) => res.json())
    }

    getValue(id: number) {
        return this.http.get(`/rest/value/${ id }`)
            .map(res => res.json())
    }
}
