import {Text,StyleSheet} from'react-native';
import {Colors} from '../type/types';
import React from 'react';

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
  },
});

interface ScoreProps {
  score: number;
}

const Score:React.FC<ScoreProps> = ({score}) =>{
  return(
    <Text style={styles.text}>
      🍎 {score}
    </Text>
  );
}


export default Score;