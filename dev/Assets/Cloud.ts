
class Cloud
{
    object:HTMLElement;
    scene:any;

    x:number = 0;
    speed:number = 1;

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

    randomize()
    {
        this.speed = Math.random();

        this.object.style.top = (Math.random() * 100) + "px";
        this.object.style.width = Math.random() * 150 + 100 + "px";

        this.show();
    }

    show()
    {
        this.object.style.display = "block";
    }

    update()
    {
        this.x -= this.speed;

        if(this.x < -300)
        {
            this.x = window.innerWidth + 300;
        }
        
        this.object.style.left = this.x + "px";


        requestAnimationFrame(() => {
            this.update();
        });
    }
}