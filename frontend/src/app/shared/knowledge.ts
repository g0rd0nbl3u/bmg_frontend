export class Knowledge {
  _id: string;
  id: string;
  name: string;
  children: [object];
  constructor(mongoid: string, id: string, name: string, children: [object]) {
    this._id = mongoid;
    this.id = id;
    this.name = name;
    this.children = children;
  }
}
