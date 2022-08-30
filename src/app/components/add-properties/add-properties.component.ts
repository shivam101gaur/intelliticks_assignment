import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Property } from 'src/app/models/property.model';
import { HttpService } from 'src/app/services/http.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-properties',
  templateUrl: './add-properties.component.html',
  styleUrls: ['./add-properties.component.css']
})
export class AddPropertiesComponent implements OnInit {

  httpLoader = false

  constructor(public dialogRef: MatDialogRef<AddPropertiesComponent>, private http: HttpService) { }
  sizeUnits: Property['sizeUnit'][] = ['sqrFt', 'sqrMtr']
  form = new FormGroup(
    {
      name: new FormControl(''),
      description: new FormControl(''),
      size: new FormControl(''),
      sizeUnit: new FormControl(this.sizeUnits[0])
    }
  )
  ngOnInit(): void {
  }
  saveProperty() {
    if (this.form.valid) {
      this.httpLoader =true
      const newProperty: Property = this.form.value;
      this.http.postProperty(newProperty).subscribe(res => {
        // property added successfully to DB
        this.httpLoader=false
        this.dialogRef.close(true)
      }, err => {
        this.httpLoader=false
        alert('Could not save property.\nTry again !!')
      })
    }
    else {
      alert('Invalid form')
    }
  }
  cancel() {
    if (this.form.dirty) {
      if (confirm('All your changes will be lost!\ndo you want to continue ?')) {
        this.dialogRef.close()
      }
      else {
        return
      }
    }
    this.dialogRef.close()
  }

}
