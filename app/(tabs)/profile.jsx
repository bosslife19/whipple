import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons, Feather, MaterialIcons, FontAwesome5, Fontisto, AntDesign, FontAwesome6 } from '@expo/vector-icons';
import Header from '../../screen/Header/Header';
import { router } from 'expo-router';

const settingsItems = [
  { id: '1', label: 'Profile', icon: () => <FontAwesome5 name="user-alt" size={24} color="black" />,handOnclick:()=>router.push('/(routes)/profile/profileScreen') },
 { id: '5', label: 'Support', icon: () => <AntDesign name="questioncircle" size={24} color="black" />,handOnclick:()=>router.push('/(routes)/profile/support') },
  { id: '6', label: 'Security and Privacy', icon: () => <MaterialIcons name="security" size={22} color="#333" /> ,handOnclick:()=>router.push('/(routes)/profile/security')},
  { id: '7', label: 'Refer and Earn', icon: () => <FontAwesome6 name="coins" size={24} color="black" />,handOnclick:()=>router.push('/(routes)/profile/refer-and-earn') },
  { id: '8', label: 'Logout', icon: () => <AntDesign name="logout" size={24} color="#FF0000" />, noArrow: true ,handOnclick:()=> {}},
];

export default function Profile() {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={item.handOnclick}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {item.icon()}
      </View>
      <Text style={item.label === 'Logout' ? styles.logoutText : styles.itemText}>
        {item.label}
      </Text>
      {!item.noArrow && (
        <Feather name="chevron-right" size={20} color="#999" />
      )}
    </TouchableOpacity>
  );

  return (
    <>
    <Header name="Profile" arrow="arrow-back" backgroundColor="#A8BFED" />
    <View style={styles.container}>
       <FlatList
        data={settingsItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 16,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  logoutText: {
    flex: 1,
    fontSize: 16,
    color: '#FF0000',
    fontWeight: '500',
  },
});
