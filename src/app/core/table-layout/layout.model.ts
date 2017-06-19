// The primaryKey is the property on the object that we expect to contain the value for a particular table column.
// The header is the title we want to apply to that column.
// The format property refers to our style-cell directive.
// The access method can be used to look for the column value on several object properties if
//    alternativeKeys are provided in the Settings.
// An example of that would be if we had a 'My Cost' column value that could be stored as object.cost,
//    object.total_cost, or object.funding.

export class ColumnSetting {
  primaryKey: string;
  header?: string;
  format?: string;
  width?: string;
  hideOnMobile?: boolean;
  alternativeKeys?: string[];
}

export class ColumnMap {
  primaryKey: string;
  private _header: string;
  private _format: string;
  private _width: string;
  private _hideOnMobile: boolean;
  alternativeKeys?: string[];

  constructor (settings) {
    this.primaryKey = settings.primaryKey;
    this.header = settings.header;
    this.format = settings.format;
    this.width = settings.width;
    this.hideOnMobile = settings.hideOnMobile;
    this.alternativeKeys = settings.alternativeKeys;
  }

  set header(setting: string) {
    this._header = setting ?
      setting :
      this.primaryKey.slice(0, 1).toUpperCase() +
        this.primaryKey.replace(/_/g, ' ').slice(1);
  }

  get header() {
    return this._header;
  }

  set format(setting: string) {
    this._format = setting ? setting : 'default';
  }

  get format() {
    return this._format;
  }

  set width(setting: string) {
    this._width = setting ? setting : 'default';
  }

  get width() {
    return this._width;
  }

  set hideOnMobile(setting: boolean) {
    this._hideOnMobile = setting ? setting : false;
  }

  get hideOnMobile() {
    return this._hideOnMobile;
  }

  access = function (object: any) {
    if (object[this.primaryKey] || !this.alternativeKeys) {
      return this.primaryKey;
    }
    for (const key of this.alternativeKeys) {
      if (object[key]) {
        return key;
      }
    }
    return this.primaryKey;
  };
}
