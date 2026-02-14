import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Header from "../Header/Header";

const Support = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [faqState, setFaqstate] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  // const toggleFAQ = (index) => {
  //   setActiveFAQ(activeFAQ === index ? null : index);
  // };

  const faqs = [
    "How do I become The Knight?",
    "What is the German Juice fee?",
    "How does voting work?",
    "What is the Losers' event?",
  ];

  return (
    <View style={{ backgroundColor: "#f9f9fb", height: "100%" }}>
      <Header name="Support" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* FAQ Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {/* {faqs.map((faq, index) => ( */}
          <View style={styles.accordion}>
            <TouchableOpacity
              // onPress={() => toggleFAQ(index)}
              style={styles.accordionHeader}
            >
              <Text style={styles.accordionText}>What is the Quiz about?</Text>
              <Text style={styles.accordionToggle}>
                {faqState.one ? "-" : "+"}
              </Text>
            </TouchableOpacity>
            <Collapsible collapsed={true}>
              <Text style={styles.accordionContent}>
                The platform offers a 40 questions quiz that will be answered
                under 5 seconds per question to earn 2 points per correct
                question answered with a maximum of 80 points valid every 24
                hours. Questions span general knowledge
              </Text>
            </Collapsible>
          </View>

          <View style={styles.accordion}>
            <TouchableOpacity
              // onPress={() => toggleFAQ(index)}
              style={styles.accordionHeader}
            >
              <Text style={styles.accordionText}>
                How do I become the Knight?
              </Text>
              <Text style={styles.accordionToggle}>
                {faqState.two ? "-" : "+"}
              </Text>
            </TouchableOpacity>
            <Collapsible collapsed={true}>
              <Text style={styles.accordionContent}>
                You can become the Knight by creating events. Go to the EVENTS
                PAGE or BECOME THE Knight page to create any events of your
                choice. There is a 25% admission fee to create an event. Why
                25%? To create balance ⚖. We want more participants than Knights,
                thus the threshold to become The Knight is high There is also a
                1% deposit fee and 2.5% withdrawal fee(waivable depending on
                your points) to handle the Cost of our payment partners.
              </Text>
            </Collapsible>
          </View>
          {/* ))} */}
        </View>

        {/* Contact Support Form */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Support</Text>

          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="Issue topic"
            value={subject}
            onChangeText={setSubject}
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textarea}
            multiline
            numberOfLines={4}
            placeholder="Describe your issue in detail"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>Submit Ticket</Text>
          </TouchableOpacity>

          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>
              For urgent matters, contact us directly:
            </Text>
            <Text style={styles.contactText}>📧 support@whipple.com</Text>
            <Text style={styles.contactText}>📞 +234 800 WHIPPLE</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#222",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#fafafa",
  },
  textarea: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    height: 100,
    marginBottom: 16,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#fafafa",
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#6B4EFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  submitText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  contactInfo: {
    marginTop: 24,
    alignItems: "center",
  },
  contactText: {
    fontSize: 14,
    color: "#666",
    marginVertical: 2,
  },
  accordion: {
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
    paddingVertical: 10,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accordionText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  accordionToggle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6B4EFF",
  },
  accordionContent: {
    paddingTop: 8,
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});

export default Support;
