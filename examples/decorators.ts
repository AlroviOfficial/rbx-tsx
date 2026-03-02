/**
 * Decorators — class decorators as wrapper calls, method decorators as descriptor modifications
 */

// Class decorator: receives constructor, can return replacement
function sealed(target: any) {
  return target;
}

// Method decorator: receives (target, propertyKey, descriptor), can return modified descriptor
function log(target: any, key: string, desc: any) {
  return desc;
}

@sealed
class Greeter {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  @log
  greet(): string {
    return `Hello, ${this.name}`;
  }
}

const g = new Greeter("World");
print(g.greet());
