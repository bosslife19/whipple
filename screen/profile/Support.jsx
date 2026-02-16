import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Linking,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Header from "../Header/Header";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Support = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [faqState, setFaqstate] = useState({
    one: true,
    two: true,
    three: true,
    four: true,
    five: true,
    six: true,
    seven: true,
    eight: true,
    nine: true,
    ten: true,
  });

  // const toggleFAQ = (index) => {
  //   setActiveFAQ(activeFAQ === index ? null : index);
  // };

  const openEmailApp = () => {
    const email = "support@mywhipple.com";
    Linking.openURL(`mailto:${email}`);
  };

  const openWhatsapp = () => {
    const whatsapp = "https://wa.link/h9umoe";
    Linking.openURL(whatsapp);
  };
   const openTelegram = () => {
    const whatsapp = "https://t.me/+ES_VmnaIvsUxMDI0";
    Linking.openURL(whatsapp);
  };

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
              onPress={() =>
                setFaqstate((prev) => ({ ...prev, one: !faqState.one }))
              }
              style={styles.accordionHeader}
            >
              <Text style={styles.accordionText}>What is the Quiz about?</Text>
              <Text style={styles.accordionToggle}>
                {faqState.one ? "+" : "-"}
              </Text>
            </TouchableOpacity>
            <Collapsible collapsed={faqState.one}>
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
              onPress={() =>
                setFaqstate((prev) => ({ ...prev, two: !faqState.two }))
              }
              style={styles.accordionHeader}
            >
              <Text style={styles.accordionText}>
                How do I become the Knight?
              </Text>
              <Text style={styles.accordionToggle}>
                {faqState.two ? "+" : "-"}
              </Text>
            </TouchableOpacity>
            <Collapsible collapsed={faqState.two}>
              <Text style={styles.accordionContent}>
                You can become the Knight by creating events. Go to the EVENTS
                PAGE or BECOME THE Knight page to create any events of your
                choice. There is a 25% admission fee to create a event. Why 25%?
                To create balance ⚖. We want more participants than Knights, thus the
                threshold to become The Knight is high There is also a 1%
                deposit fee and 2.5% withdrawal fee(waivable depending on your
                points) to handle the Cost of our payment partners.
              </Text>
            </Collapsible>
          </View>

          <View style={styles.accordion}>
            <TouchableOpacity
              onPress={() =>
                setFaqstate((prev) => ({ ...prev, three: !faqState.three }))
              }
              style={styles.accordionHeader}
            >
              <Text style={styles.accordionText}>
                How do I compete against The Knight?
              </Text>
              <Text style={styles.accordionToggle}>
                {faqState.three ? "+" : "-"}
              </Text>
            </TouchableOpacity>
            <Collapsible collapsed={faqState.three}>
              <Text style={styles.accordionContent}>
                Go to the Available Events page, check for events published by
                The Knight that you would be interested in playing, then use
                your accumulated points and try to match the Knight's results
                for the Knight's reward
              </Text>
            </Collapsible>
          </View>

          <View style={styles.accordion}>
            <TouchableOpacity
              onPress={() =>
                setFaqstate((prev) => ({ ...prev, four: !faqState.four }))
              }
              style={styles.accordionHeader}
            >
              <Text style={styles.accordionText}>What is Losers' event?</Text>
              <Text style={styles.accordionToggle}>
                {faqState.four ? "+" : "-"}
              </Text>
            </TouchableOpacity>
            <Collapsible collapsed={faqState.four}>
              <Text style={styles.accordionContent}>
                Losers' event gives you the opportunity to reclaim your event
                after losing the first time. It is as expected, competitive
              </Text>
            </Collapsible>
          </View>
          <View style={styles.accordion}>
            <TouchableOpacity
              onPress={() =>
                setFaqstate((prev) => ({ ...prev, five: !faqState.five }))
              }
              style={styles.accordionHeader}
            >
              <Text style={styles.accordionText}>What is Tap Rush?</Text>
              <Text style={styles.accordionToggle}>
                {faqState.five ? "+" : "-"}
              </Text>
            </TouchableOpacity>
            <Collapsible collapsed={faqState.five}>
              <Text style={styles.accordionContent}>
                Tap Rush is a competition where users try to OUT-TAP each other
                under a 30 seconds window. The person with the highest taps
                triumphs, and goes with 75% of the reward, while the runner up is
                awarded the remaining 25%. The REWARD 🏆 depends on how many
                participants matched to play that particular event. There is a 20%
                platform fee deduction applicable before awarding rewards. A
                minimum of two participants and a maximum of 4 participants are matched
                LIVE within a 30 seconds countdown timer, to compete against
                each other
              </Text>
            </Collapsible>
          </View>

          <View style={styles.accordion}>
            <TouchableOpacity
              onPress={() =>
                setFaqstate((prev) => ({ ...prev, six: !faqState.six }))
              }
              style={styles.accordionHeader}
            >
              <Text style={styles.accordionText}>What is Math Clash? </Text>
              <Text style={styles.accordionToggle}>
                {faqState.five ? "+" : "-"}
              </Text>
            </TouchableOpacity>
            <Collapsible collapsed={faqState.six}>
              <Text style={styles.accordionContent}>
                Math Clash is a competition where users solve 20 simple
                arithmetic questions under a 3 Seconds per question time limit.
                The person with the highest score triumphs, and goes with 75% of the
                reward, while the runner up is awarded the remaining 25%. The
                REWARD 🏆 depends on how many participants matched to play that
                particular event. There is a 20% platform fee deduction
                applicable before awarding rewards. A minimum of two participants and
                a maximum of 4 participants are matched LIVE within a 30 seconds
                countdown timer, to compete against each other
              </Text>
            </Collapsible>
          </View>

          <View style={styles.accordion}>
            <TouchableOpacity
              onPress={() =>
                setFaqstate((prev) => ({ ...prev, seven: !faqState.seven }))
              }
              style={styles.accordionHeader}
            >
              <Text style={styles.accordionText}>
                What is Color Switch Reflex?
              </Text>
              <Text style={styles.accordionToggle}>
                {faqState.seven ? "+" : "-"}
              </Text>
            </TouchableOpacity>
            <Collapsible collapsed={faqState.seven}>
              <Text style={styles.accordionContent}>
                Color Switch Reflex is a competition where users match the
                color(in words) that pops up, against the color it appears in.
                For example, if RED(the word) appears in GREEN( the color), the
                user will click on GREEN( the color) to gain points. These pop
                ups will come up 20 times within a time frame of 2 seconds per
                pop up, and the participant has to match the WORD against the COLOR
                it appears in. The person with the highest score triumphs, and goes
                with 75% of the reward, while the runner up is awarded the
                remaining 25%. The REWARD 🏆 depends on how many participants matched
                to play that particular event. There is a 20% platform fee
                deduction applicable before awarding rewards. A minimum of two
                participants and a maximum of 4 participants are matched LIVE within a 30
                seconds countdown timer, to compete against each other
              </Text>
            </Collapsible>
          </View>

          <View style={styles.accordion}>
            <TouchableOpacity
              onPress={() =>
                setFaqstate((prev) => ({ ...prev, eight: !faqState.eight }))
              }
              style={styles.accordionHeader}
            >
              <Text style={styles.accordionText}>What is Defuse-X?</Text>
              <Text style={styles.accordionToggle}>
                {faqState.eight ? "+" : "-"}
              </Text>
            </TouchableOpacity>
            <Collapsible collapsed={faqState.eight}>
              <Text style={styles.accordionContent}>
                Defuse-X is a competition where users attempt to successfully
                defuse a Virtual Explosive under intense pressure and time
                constraints. It involves pattern recognition, keen attention to
                details and quick memory. It is in three(3) phases and users
                must scale one phase before he is allowed to proceed to the next
                phase, to avoid a virtual explosion 💥, which means "event OVER"
                Phase 1: Pattern recognition: Here, four colors will appear
                randomly in a sequence and then disappear. The user must
                memorize the sequence and has 5 seconds to reproduce that same
                exact sequence that he saw, in order to scale Phase 1 Phase 2:
                Attention to details: Here, four random colors will appear, a
                combination of Slow-blinking colors and Fast-blinking colors in
                a tricky fashion. The user has 3 seconds to click on the
                slow-blinking colors, in order to scale Phase 2 Phase 3: Memory:
                Here, the user will be asked to recall a random event he saw in
                Phase 1. For example, he can be asked to click on the third
                color that appeared in the sequence in Phase 1, etc. The user
                has 5 seconds to click on the appropriate answer, in order to
                scale Phase 3, to successfully defuse the virtual explosive and
                emerge the winner The person with the highest score triumphs, and
                goes with 100% of the reward, as it is a ZERO SUM event.
                The REWARD 🏆 depends on how many participants matched to play that
                particular event. There is a 20% platform fee deduction
                applicable before awarding rewards. A minimum of two participants and
                a maximum of 4 participants are matched LIVE within a 30 seconds
                countdown timer, to compete against each other
              </Text>
            </Collapsible>
          </View>
          {/* ))} */}
          <View style={styles.accordion}>
            <TouchableOpacity
              // onPress={() => toggleFAQ(index)}
              onPress={() =>
                setFaqstate((prev) => ({ ...prev, nine: !faqState.nine }))
              }
              style={styles.accordionHeader}
            >
              <Text style={styles.accordionText}>What are Whipple Points?</Text>
              <Text style={styles.accordionToggle}>
                {faqState.nine ? "+" : "-"}
              </Text>
            </TouchableOpacity>
            <Collapsible collapsed={faqState.nine}>
              <Text style={styles.accordionContent}>
                Whipple points are points awarded to users when they perform
                certain actions on the platform. With the accumulated points,
                they get privileges like: 1) With 20 Whipple points, 2.5%
                withdrawal fee gets waived and user makes free withdrawal 2)
                With 40 Whipple points, the user will participate in FREE events(Tap Rush,
                Math Clash, Color Switch Reflex and Defuse-X) in the "event
                Rush" category 3) With 40 Whipple points, the user also gets 25%
                discounted events(as The Knight or participant competing against The
                Knight) in the other events 4) With 80 Whipple points, the user
                will participate in FREE events(as The Knight or participant competing against
                The Knight) in the other events There will be a corresponding
                reduction in Whipple points in the above scenarios
              </Text>
            </Collapsible>
          </View>

          <View style={styles.accordion}>
            <TouchableOpacity
              onPress={() =>
                setFaqstate((prev) => ({ ...prev, ten: !faqState.ten }))
              }
              style={styles.accordionHeader}
            >
              <Text style={styles.accordionText}>
                How do I accumulate Whipple Points?
              </Text>
              <Text style={styles.accordionToggle}>
                {faqState.ten ? "+" : "-"}
              </Text>
            </TouchableOpacity>
            <Collapsible collapsed={faqState.ten}>
              <Text style={styles.accordionContent}>
                You can accumulate Whipple points by: 1) Referring your friends
                to register on Whipple using your REFERRAL CODE and create events
                on Whipple. You will get 4 Whipple points per successful
                referral. Refer as many people as possible and make sure they
                register on Whipple with your REFERRAL CODE, in order for you to
                accumulate as many Whipple points as possible 😁 2) Participate in the
                SkillQuiz Pro event. Answer 40 short quiz questions under 5
                seconds per question, and compete to win 2 Whipple points per
                correct answer for a maximum of 80 Whipple points. It is FREE to
                play, however, if you want, you can boost the time from 5
                seconds to 60 seconds for 100 naira per question, if you need
                more time to answer a question. The Quiz event can only be
                played once in 24 hours and users are advised to stay on course
                and complete the Quiz once they start, in order to MAXIMIZE
                their Whipple points accumulation. 3) upload on your Social
                Media handles a screen record of the events you won on Whipple
                (with TIME-STAMPS) and send us a link to your handle to verify,
                then grant us the permission to reshare and get 4 additional
                Whipple points for that day 4) Play the Pre-event Activity
                events
              </Text>
            </Collapsible>
          </View>
        </View>

        {/* Contact Support Form */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Support</Text>

          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>
              For urgent matters, contact us directly:
            </Text>

            {/* Email */}
            <TouchableOpacity style={styles.contactRow} onPress={openEmailApp}>
              <FontAwesome name="envelope" size={20} color="#6B4EFF" />
              <Text style={styles.contactTextClickable}>
                support@mywhipple.com
              </Text>
            </TouchableOpacity>

            {/* WhatsApp */}
            <TouchableOpacity style={styles.contactRow} onPress={openWhatsapp}>
              <FontAwesome name="whatsapp" size={24} color="#25D366" />
              <Text style={styles.contactTextClickable}>+234 9079141911</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.contactRow} onPress={openTelegram}>
              <FontAwesome name="telegram" size={24} color="purple" />
              <Text style={styles.contactTextClickable}>Join our Telegram Group</Text>
            </TouchableOpacity>
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
  contactInfo: {
    marginTop: 24,
    alignItems: "flex-start",
  },
  contactText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  contactTextClickable: {
    marginLeft: 10,
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
});

export default Support;
