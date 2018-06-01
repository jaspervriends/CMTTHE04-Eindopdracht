class Ship
{
    _type:String;

    element:HTMLElement;

    constructor(type:string)
    {
        this._type = type;

        this.element = this.create();
    }

    create()
    {
        const boat = document.createElement("");
    }
}