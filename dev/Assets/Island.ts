
class Island
{
    object:HTMLElement;
    scene:any;

    constructor(scene:any, className:String)
    {
        this.scene = scene;

        if(!className)
        {
            className = "";
        }

        // Create island object
        this.object = document.createElement("island");

        // Create classes
        this.object.className = "animated bounceInUp " + className;

        this.object.style.display = "none";

        this.scene.appendChild(this.object);
    }

    position(x:number, y:number)
    {
        
        this.object.style.left = ((window.innerWidth / 2) + x) - (this.object.offsetWidth / 2) + "px";
        this.object.style.top = y + "px";

        return this;
    }

    delay(seconds:string)
    {
        this.object.style.animationDelay = seconds;

        return this;
    }

    mirror()
    {
        this.object.className += " mirrored";
        
        return this;
    }

    show()
    {
        this.object.style.display = "block";
    }

    update()
    {

    }
}