import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axiosClient from '../../../axiosClient';

const FeaturesSection = () => {
  const [leaderBoard, setLeaderBoard] = useState(null)
  useEffect(()=>{
    const getLeaderBoard = async ()=>{
      const res = await axiosClient.get('/leaderboard');
     
      setLeaderBoard(res.data.winners)
    }
    getLeaderBoard()
  }, [])
  return (
    <ScrollView contentContainerStyle={styles.container}>
     
      {/* <View style={styles.card}>
        <Text style={styles.heading}>Leaderboard</Text>
        <Text style={[styles.subText, { marginBottom: 16 }]}>This week's top winners</Text>

        {[
          { name: '1. Emma S.', amount: '$15,400' },
          { name: '2. Daniel K.', amount: '$12,750' },
          { name: '3. Sarah M.', amount: '$9,200' },
        ].map((item, index) => (
          <View key={index} style={styles.leaderboardItem}>
            <Text style={styles.playerName}>{item.name}</Text>
            <Text style={styles.amount}>{item.amount}</Text>
          </View>
        ))}
      </View> */}

      {/* How to Play */}
      <View style={styles.card}>
        <Text style={styles.heading}>How to Play</Text>
        <Text style={[styles.subText, { marginBottom: 16 }]}>
          New to our platform? Here's how to get started:
        </Text>
        {[
  "Download the Whipple App from Playstore or from our website (www.mywhipple.com) and sign up (opening multiple accounts will be barred and forfeited)",

  "Play the Whipple Quiz to gather points. Whipple Quiz is Fast-paced and tests your general knowledge under immense pressure. It consists of 40 questions that span across sports, politics, military, agriculture, foreign affairs, science, entertainment, etc and each correctly answered question carries 2 points with a maximum of 80 points.\n\nYou have 5 seconds to compete against other users to answer each question (5 seconds per question). However, you can buy time and extend the timing from 5 seconds to 60 seconds per question for 200 naira per question.\n\nYou have to finish the 80 questions in a sitting to be awarded points and you can only play the quiz once every 24 hours. If you leave the quiz page midway and come back in, you can no longer play the quiz till next day and no point will be awarded. So stay put and finish your quiz in one sitting to get your points awarded.\n\nYou can use the points you gathered to create or play games in the platform.\n\nIf you get up to 20 points, the withdrawal fee will be waived (the platform will absorb the withdrawal cost for you). If you get up to 40 points, you get a 25% discounted waiver in any games you create or play (the platform absorbs 25% of your game cost by virtue of your 40 points). If you get up to 80 points, you get to create or play a FREE GAME (the platform absorbs ALL YOUR GAME COSTS by virtue of your 80 points).\n\nBe Strategic, accumulate as many points as possible and tactically boost your time from 5 seconds to 60 seconds for maximum points accumulation.",

  "With your accumulated points, select a game to create as The House (Top Games page) or to compete against The House (Available Games page)",

  "Try to match any of the results of the games the House published, in order to Win the House Prize 🏆. There will be corresponding points deductions when you create or play games. If you exhaust your points, you can wait till the next day to play another quiz and accumulate points (highly recommended) or you can continue to play via your wallet",

  "Have Fun 😊😊😊",
].map((step, index) => (
  <Text key={index} style={styles.step}>
    {`${index + 1}. ${step}`}
  </Text>
))}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: '10%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    color: '#6b7280',
    fontSize: 14,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  playerName: {
    fontWeight: '500',
    fontSize: 14,
  },
  amount: {
    fontWeight: 'bold',
    color: '#16a34a', // Tailwind's green-600
  },
  step: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
});

export default FeaturesSection;
