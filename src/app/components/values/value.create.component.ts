import {Component} from '@angular/core';
import {ValueService} from '../../services/value.service'
import {Router} from '@angular/router'
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'create-value',
    templateUrl: 'value.create.component.html',
    // styleUrls: ['./value.component.css'],
    providers: [ValueService]
})
export class ValueCreateComponent {

    valueModel: FormGroup;

    constructor(private valueService: ValueService, private router: Router, fb: FormBuilder) {
        this.valueModel = fb.group({
            "value": ['', [Validators.required, Validators.minLength(2)]]
        })
    }

    createValue() {
        let value = this.valueModel.value;
        if (this.valueModel.valid) {
            this.valueService.createValue(value).subscribe(createdValue => {
                console.debug("created value: " + createdValue);
                this.router.navigate(['list']);
            })
        }
    }

}
