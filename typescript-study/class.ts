class Parent {
    private _name = 'hwm';
    // 保护属性，可以在子类访问
    protected age = 19;

    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
}
