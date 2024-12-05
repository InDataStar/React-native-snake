
import { StyleSheet, View } from "react-native";
import {Coordinate,Colors} from '../type/types';
import { Fragment } from "react";

interface SnakeProps{
  snake:Coordinate[];
}

const Snake:React.FC<SnakeProps> = ({snake}) =>{

  return(
    <Fragment>
    {
      snake.map((seg:Coordinate,inx:number) =>{
        const SegStyle = {
          left: seg.x*10,
          top: seg.y*10,
        };
        return (<View key={inx} style={[SegStyle,styles.snake]}></View>)
      })
    }
    </Fragment>
  );
}

const styles = StyleSheet.create({
  snake: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    position: "absolute",
  },
});


export default Snake