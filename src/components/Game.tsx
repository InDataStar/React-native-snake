import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Colors } from '../type/types';
import { Direction, Coordinate, GestureEventType } from '../type/types';
import { checkEatsFood } from '../utils/checkEatsFood';
import { checkGameOver } from '../utils/checkGameOver';
import { randomFoodPosition } from '../utils/randomFoodPosition';
import Food from './Food';
import Header from './Header';
import Score from './Score';
import Snake from './Snake';

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

const Game: React.FC = () => {
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const pauseGame = ()=>{
    setIsPaused(!isPaused);
  }

  const reloadGame = ()=>{
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDirection(Direction.RIGHT);
    setIsPaused(false);
  }

  const handleGesture = (event:GestureEventType)=>{
    const {translationX,translationY} = event.nativeEvent;
    if(Math.abs(translationX) > Math.abs(translationY))
    {
      if(translationX > 0)
      {
        setDirection(Direction.RIGHT);
      }
      else{setDirection(Direction.LEFT);}
    }
    else
    {
      if(translationY > 0)
      {
        setDirection(Direction.DOWN);
      }
      else
      {
        setDirection(Direction.UP);}
    }

  }


useEffect(() =>{
  if(!isGameOver)
  {
    const IntervalId = setInterval(() =>{
      !isPaused && moveSnake();
    },MOVE_INTERVAL);
    return()=> clearInterval(IntervalId);
  }
},[snake,isGameOver,isPaused]);

const moveSnake = ()=>{
  const snakeHead = snake[0];
  const newHead ={...snakeHead};

  if(checkGameOver(snakeHead,GAME_BOUNDS))
  {
    setIsGameOver((prev)=>!prev);
    return;
  }

  switch(direction){
    case Direction.UP:
      newHead.y -=1;
      break;
    case Direction.DOWN:
      newHead.y +=1;
      break;
    case Direction.LEFT:
      newHead.x -=1;
      break;
    case Direction.RIGHT:
      newHead.x +=1;
      break;
    default:
      break;
  }

  if(checkEatsFood(newHead,food,2))
  {
    setFood(randomFoodPosition(GAME_BOUNDS.xMax,GAME_BOUNDS.yMax));
    setSnake([newHead,...snake]);
    setScore(score + SCORE_INCREMENT);
  }
  else
  {
    setSnake([newHead,...snake.slice(0,-1)])
  }
}

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          reloadGame={reloadGame}
          pauseGame={pauseGame}
          isPaused={isPaused}
        >
          <Score score={score} />
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.background,
  },
});
export default Game;
