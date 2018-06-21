class Woosh
{
    private object:HTMLAudioElement;

    constructor(type:String)
    {
        
        this.object = document.createElement("audio");


        if(type === "scene") {
            this.object.src = "./sounds/woosh/woosh_scenechange.mp3";
        }else if(type === "start") {
            this.object.src = "./sounds/woosh/woosh_start.mp3";
        }else{
            this.object.src = "./sounds/woosh/woosh_backup.mp3";
        }

        this.object.loop = false;
        this.object.autoplay = false;
        this.object.play();
        
        document.body.appendChild(this.object);
    }
}