export class Point
{
    constructor(x, y)
    {
        this.x = x; 
        this.y = y;
    }
    
    //get distance between this & other Points
    distanceFrom(point)
    {
        const square_dist = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
        return Math.pow(square_dist, 0.5);
    }

    //check if current point is in points array
    inPointsArray(points_array)
    {
        let result = false;

        for(let point of points_array)
        {
            if(point.x == this.x && point.y == this.y) 
            {
                result = true;
                break;
            }
        }

        return result;
    }
}