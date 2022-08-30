import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/models/property.model';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import properties from 'src/app/data/properties';
import { MatDialog } from '@angular/material/dialog';
import { AddPropertiesComponent } from '../add-properties/add-properties.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-list-properties',
  templateUrl: './list-properties.component.html',
  styleUrls: ['./list-properties.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListPropertiesComponent implements OnInit {

  constructor(public dialog: MatDialog, private shared: SharedService) { }

  properties: Property[] = this.shared.properties;
  dataSource = new MatTableDataSource<Property>(this.properties)

  tableColumns = ['index', 'name', 'description', 'size', 'action'];


  ngOnInit(): void {
  }
  /**
   * Open Dialog to add a property
   */
  openAddPropertyDialog() {
    this.dialog.open(AddPropertiesComponent, { disableClose: true })
      .afterClosed().subscribe(saved => {
        if (saved) { this.properties = this.shared.properties; this.dataSource.data = this.properties; }
      });
  }

  /**
   * function to remove a property from list
   * @param property property to be deleted in the list
   * @param index index of property in list
   */
  delete(property: Property, index: number) {
    if (confirm(`${property?.name} will be deleted !`)) {
      this.shared.properties.splice(index, 1);
      this.properties=this.shared.properties;
      this.dataSource.data = this.properties;
    }
  }

}
