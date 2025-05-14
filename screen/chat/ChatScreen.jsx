import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import Header from "../Header/Header";
// import Header from "../header/Header";

const chatList = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Hey! How are you?",
    lastSeen: "2 min ago",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    isOnline: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    lastMessage: "See you tomorrow!",
    lastSeen: "5 min ago",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    isOnline: false,
  },
  {
    id: "3",
    name: "Jane Smith",
    lastMessage: "See you tomorrow!",
    lastSeen: "5 min ago",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    isOnline: false,
  },
];

const ChatSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredChats = chatList.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
   <Header name="Messages" arrow="arrow-back" backgroundColor="#A8BFED" />

   <View View style={{backgroundColor:"#fff"}}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Find or start a conversation..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      </View>
      <View style={styles.container}>
      {filteredChats.length === 0 ? (
  <Text style={{ textAlign: "center", marginTop: 20, color: "#94A3B8" }}>
    No Chat found.
  </Text>
) : (
  <FlatList
    data={filteredChats}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() =>
          router.push({
            pathname: "/(routes)/chatRoom",
            params: { user: JSON.stringify(item) },
          })
        }
      >
        <Image source={{ uri: item.image }} style={styles.profileImage} />
        <View style={styles.chatDetails}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.message}>{item.lastMessage}</Text>
        </View>
        <View>
          <Text style={styles.lastSeen}>{item.lastSeen}</Text>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>2</Text>
          </View>
        </View>
      </TouchableOpacity>
    )}
  />
)}

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {  height:"100%", backgroundColor: "#fff", padding: 10 },
  chatItem: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
  },
  profileImage: { width: 50, height: 50, borderRadius: 25 },
  chatDetails: { flex: 1, marginLeft: 10 },
  name: { fontSize: 14, fontWeight: "bold",color: "#94A3B8"  },
  message: { color: "#94A3B8" },
  lastSeen: { color: "#94A3B8", fontSize: 12 },
  unreadBadge: {
    backgroundColor: "#007BFF",
    borderRadius: 15,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  unreadText: { color: "#fff", fontSize: 12 },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "13%",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#F8FAFC",
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical:5,
    borderRadius: 30,
    marginVertical: 10,
    borderWidth:1,
    borderColor:"#E2E8F0"
  },
  searchIcon: { marginRight: 5 },
  searchInput: { flex: 1, paddingVertical: 8 },
});

export default ChatSearch;
