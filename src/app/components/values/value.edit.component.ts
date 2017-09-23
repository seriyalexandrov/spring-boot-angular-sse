import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValueService} from "../../services/value.service";
import { Router, ActivatedRoute} from "@angular/router";
import { OnInit, Component } from "@angular/core";

@Component({
  selector: 'edit-value',
  templateUrl: 'value.edit.component.html',
  // styleUrls: ['./value.component.css'],
  providers: [ValueService]
})
export class ValueEditComponent implements OnInit {
  valueModel: FormGroup;
  constructor(private valueService: ValueService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
    this.valueModel = this.fb.group({
      "id": [],
      "value": ['', Validators.required],
      "version": ['']
    })
  }

  updateValue() {
    let value = this.valueModel.value;
    if (this.valueModel.valid) {
      this.valueService.updateValue(value).subscribe(updatedValue =>
        this.router.navigate(['list'])
      )
    }
  }

  ngOnInit() {
    let valueId = this.route.snapshot.params["id"];
    this.valueService
      .getValue(valueId).subscribe(value =>
        this.valueModel = this.fb.group({
          "id": [value.id],
          "value": [value.name, [Validators.required, Validators.minLength(2)]],
          "version": [value.version]
        })
      )
  }
}
