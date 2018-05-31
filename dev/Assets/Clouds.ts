class Clouds
{
    constructor(scene:any)
    {
        for(let i = 0; i < 5; i++) {
            setTimeout(() => {
                let cloud1 = new Cloud(scene);
                cloud1.delay((i * 150) + 'ms').randomize();
            }, i * 20);
        }
    }
}