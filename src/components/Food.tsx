import {Coordinate} from '../type/types';
import {StyleSheet,View,Text} from 'react-native';
import React from 'react';

function returnRandomFruit(){
  const Fruits = ["🍎", "🍊", "🍋", "🍇", "🍉", "🍓", "🍑", "🍍"];
  const RandomIndex = Math.floor(Math.random() * Fruits.length);
  return Fruits[RandomIndex];
}

interface FoodProps{
  x:number;
  y:number;
}

const  Food:React.FC<FoodProps> = ({x,y}) =>{
  return(
    <Text style={[styles.food,{top:y*10,left:x*10}]}>
      🍎
    </Text>
  );
}

const styles = StyleSheet.create({
  food: {
    width: 20,
    height: 20,
    borderRadius: 7,
    position: "absolute",
  },
});


export default Food;
