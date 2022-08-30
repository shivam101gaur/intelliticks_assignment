import { Injectable } from '@angular/core';
import properties from '../data/properties';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _properties: Property[] = properties;
  public get properties(): Property[] {
    return this._properties;
  }
  public set properties(value: Property[]) {
    this._properties = value;
  }

  constructor() { }
}
