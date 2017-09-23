import {Component, OnInit} from '@angular/core';
import {ValueService, Value} from '../../services/value.service'

@Component({
    selector: 'values',
    templateUrl: 'value.component.html',
    // styleUrls: ['./value.component.css'],
    providers: [ValueService]
})
export class ValueComponent implements OnInit {
    values: Value[];

    constructor(private valueService: ValueService) {
    }

    ngOnInit() {

        this.valueService.getValues()
            .subscribe(list => {
                this.values = list
            });
        this.valueService.subscribe()
            .subscribe({
                next: (event) => {
                    console.log('observer: ' + event);
                    this.valueService.getValues()
                        .subscribe(list => {
                            this.values = list
                        });
                }
            });
    }
}
