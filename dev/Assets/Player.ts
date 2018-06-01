class Player
{
    health = 100;
    ship:Ship;

    constructor()
    {
        this.ship = new Ship('pirate');
    }
}