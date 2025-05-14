import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Header from '../Header/Header';
import Congrats from "../../assets/images/material-symbols_money-bag.png";
import gamestart from "../../assets/images/mingcute_game-2-fill.png";
import { Image } from 'react-native';
import gameImage4 from "../../assets/images/Rectangle 10.png"; // Renamed for clarity

const notifications = [
    {
      id: '1',
      name: 'Deposit Successful',
      description: 'You deposited ₦5,000 into your account.',
      time: '10:20 AM',
      date: new Date(),
      image: gamestart,
    },
    {
      id: '2',
      name: 'Transfer Alert',
      description: '₦2,000 was sent to John Doe.',
      time: '8:30 AM',
      date: new Date(),
      image: Congrats,
    },
    {
      id: '3',
      name: 'Welcome Bonus',
      description: 'You received a ₦500 welcome bonus!',
      time: '9:00 PM',
      date: new Date(Date.now() - 86400000),
      image: gamestart,
    },
    {
      id: '4',
      name: 'Security Notice',
      description: 'A new device was detected on your account.',
      time: '3:15 PM',
      date: new Date(Date.now() - 2 * 86400000),
      image: Congrats,
    },
    {
        id: '5',
        name: 'Security Notice',
        description: 'A new device was detected on your account.',
        time: '3:15 PM',
        date: new Date(Date.now() - 2 * 86400000),
        image: Congrats,
      }, {
        id: '6',
        name: 'Security Notice',
        description: 'A new device was detected on your account.',
        time: '3:15 PM',
        date: new Date(Date.now() - 2 * 86400000),
        image: Congrats,
      }, {
        id: '7',
        name: 'Security Notice',
        description: 'A new device was detected on your account.',
        time: '3:15 PM',
        date: new Date(Date.now() - 2 * 86400000),
        image: Congrats,
      },  
  ];

const formatDateLabel = (date) => {
  const today = new Date();
  const yesterday = new Date(Date.now() - 86400000);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

  return date.toLocaleDateString('en-NG', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
};

const groupByDate = () => {
  const grouped = {};

  notifications.forEach((item) => {
    const label = formatDateLabel(item.date);
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(item);
  });

  return Object.keys(grouped).map((label) => ({
    title: label,
    data: grouped[label],
  }));
};

export default function NotificationList() {
  const sections = groupByDate();

  return (
    <View style={styles.wrapper}>
      <Header name="Notifications" backgroundColor="#A8BFED" />
      <ScrollView contentContainerStyle={styles.container}>
        {sections.length === 0 ? (
          <Text style={styles.emptyText}>No notifications yet.</Text>
        ) : (
          sections.map((section) => (
            <View key={section.title}>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              {section.data.map((item) => (
                <View key={item.id} style={styles.notificationItem}>
                  <View style={{backgroundColor:"#333", borderRadius:5}}>
                  <Image source={item.image} style={styles.image} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    backgroundColor: '#f9f9f9',
    height:"100%"
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom:" 16%",
    // marginBottom:"350%",
    // height:"230%"
  }, 
  image:{
    width:40,
    height:40,
    borderRadius:40
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 10,
    textAlign: 'left',
    color: '#333',
    fontFamily: 'montserratMeduim',
    paddingLeft: 4,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    gap:10,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
 
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
    fontFamily: 'montserratMeduim',
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    fontFamily: 'montserratMeduim',
  },
  time: {
    fontSize: 12,
    color: '#aaa',
    position: 'absolute',
    right: 12,
    top: 14,
    fontFamily: 'montserratMeduim',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
    color: '#888',
    fontFamily: 'montserratMeduim',
  },
});
