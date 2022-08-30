import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Property } from 'src/app/models/property.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-properties',
  templateUrl: './add-properties.component.html',
  styleUrls: ['./add-properties.component.css']
})
export class AddPropertiesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddPropertiesComponent>,private shared:SharedService) { }
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
    if(this.form.valid){
      const newProperty:Property=this.form.value;
      this.shared.properties.push(newProperty);
      this.dialogRef.close(true)
    }
    else{
      alert('Invalid form')
    }
  }
  cancel() {
    if(this.form.dirty){
      if(confirm('All your changes will be lost!\ndo you want to continue ?')){
        this.dialogRef.close()
      }
      else{
        return
      }
    }
    this.dialogRef.close()
  }

}
