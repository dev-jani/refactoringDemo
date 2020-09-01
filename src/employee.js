class Employee {
  constructor (name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }

  get type () {
    return this._type;
  }

  validateType (type) {
    if (![
      'engineer',
      'manager',
      'salesman',
    ].includes(type)) {
      throw new Error(`Employee cannot be of type ${type}`);
    }
  }

  toString () {
    return `${this._name} (${this.type})`;
  }
}

class Engineer extends Employee {
  get type () {
    return 'engineer';
  }
}

class Salesman extends Employee {
  get type () {
    return 'salesman';
  }
}

class Manager extends Employee {
  get type () {
    return 'manager';
  }
}

function createEmployee (name, type) {
  switch (type) {
    case 'engineer':
      return new Engineer(name, type);
    case 'salesman':
      return new Salesman(name, type);
    case 'manager':
      return new Manager(name, type);
    default:
      return new Employee(name, type);
  }
}
