import {Coordinate} from '../type/types';


export const  checkEatsFood =(head:Coordinate,food:Coordinate,area:number): boolean =>{
  const distanceBetweenFoodandSnakeX: number = Math.abs(head.x-food.x);
  const distanceBetweenFoodandSnakeY: number = Math.abs(head.y-food.y);

  return(
    distanceBetweenFoodandSnakeX < area && distanceBetweenFoodandSnakeY < area
  );
  
}