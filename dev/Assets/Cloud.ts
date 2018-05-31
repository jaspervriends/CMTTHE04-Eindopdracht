
class Cloud
{
    object:HTMLElement;
    scene:any;

    x:number = 0;

    constructor(scene:any)
    {
        this.scene = scene;

        // Create island object
        this.object = document.createElement("cloud");

        // Create classes
        this.object.className = "animated fadeInUp ";

        this.object.style.display = "none";

        this.x = Math.random() * (window.innerWidth - 250);
        this.object.style.left = this.x + "px";
        this.object.style.top = (Math.random() * 50) + 20 + "px";

        this.scene.appendChild(this.object);

        this.update();
    }


    delay(seconds:string)
    {
        this.object.style.animationDelay = seconds;

        return this;
    }

    show()
    {
        this.object.style.display = "block";
    }

    update()
    {
        this.x--;
        
        this.object.style.left = this.x + "px";


        requestAnimationFrame(() => {
            this.update();
        });
    }
}