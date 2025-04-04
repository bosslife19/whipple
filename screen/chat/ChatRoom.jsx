import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
// import MoreOptionsModal from "./Modal/MoreOption";

const ChatScreen = () => {
  const { user } = useLocalSearchParams();
  const router = useRouter();
  const parsedUser = user ? JSON.parse(user) : null;

  const [messages, setMessages] = useState([
    { id: "1", text: "Hey!", sender: "user", time: "10:00 AM" },
    { id: "2", text: "Hello!", sender: "me", time: "10:05 AM" },
  ]); 
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const sendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: `${messages.length + 1}`,
        text: messageInput,
        sender: "me",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={18} color="black" />
        </TouchableOpacity>
        {parsedUser?.image && <Image source={{ uri: parsedUser.image }} style={styles.profileImage} />}

        <View style={styles.userDetails}>
          <Text style={styles.userName}>{parsedUser?.name || "Unknown"}</Text>
          <Text style={{fontFamily: "montserratMeduim",  color: parsedUser?.isOnline ? "#0D9488" : "gray", fontSize:12 ,fontWeight:500}}>
          {parsedUser?.isOnline ? "Online" : "Offline"}
          </Text>
        </View>
        
         <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.chatBubble,
              {
                alignSelf: item.sender === "me" ? "flex-end" : "flex-start",
                backgroundColor: item.sender === "me" ? "#8A2BE2" : "#F1F5F9",
              },
            ]}
          >
            <Text style={{ color: item.sender === "me" ? "#fff" : "#000" }}>{item.text}</Text>
            <Text style={styles.timestamp}>{item.time}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={messageInput}
          onChangeText={setMessageInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <MaterialIcons name="send" size={24} color="#8A2BE2" />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Modal */}
      {/* <MoreOptionsModal modalVisible={modalVisible} setModalVisible={setModalVisible} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E2E8F0" },
  header: { flexDirection: "row", alignItems: "center", padding: 15, paddingTop: 40, backgroundColor: "#fff"},
  profileImage: { width: 40, height: 40, borderRadius: 20, marginHorizontal: 10 },
  userDetails: { flex: 1 },
  userName: { fontSize: 16, fontWeight: "bold",fontFamily: "montserratMeduim", },
  chatBubble: {paddingHorizontal:10, paddingVertical:10,borderBottomLeftRadius: 10,borderTopRightRadius: 10, borderTopLeftRadius: 10, margin: 5, width: "60%",borderWidth:1,borderColor:"#F1F5F9" },
  timestamp: { fontSize: 10, color: "gray", marginTop: 2, alignSelf: "flex-end" ,fontFamily: "montserratMeduim",},
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  input: { flex: 1, padding: 10,  borderRadius: 10, backgroundColor: "#fff" },
  sendButton: { backgroundColor: "#fff", padding: 10, borderRadius: 10, marginLeft: 10 },
});

export default ChatScreen;
