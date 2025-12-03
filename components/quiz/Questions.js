import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const Questions = ({ questions = [], userBalance = 0, onPointsUpdate, onQuizEnd, onBoost, setUserBalance, paramters = {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(paramters?.allow_time);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [boostUsed, setBoostUsed] = useState(false);
  const [fund, setFund] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    startTimer(paramters?.allow_time);
    return () => clearInterval(timerRef.current);
  }, [currentIndex]);

  const startTimer = (duration) => {
    clearInterval(timerRef.current);
    setTimeLeft(duration);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer) return; // Prevent double select
    setSelectedAnswer(answer);
    clearInterval(timerRef.current);

    const currentQuestion = questions[currentIndex];
    // if (answer === currentQuestion.correct) {
      // onPointsUpdate(prev => prev + paramters?.award_point );
      onPointsUpdate(currentQuestion.id, answer );
    // }

    setShowCorrect(true);
    setTimeout(() => {
      moveToNextQuestion();
    }, 2000);
  };

  const handleTimeExpired = () => {
    setShowCorrect(true);
    setTimeout(() => {
      moveToNextQuestion();
    }, 5000);
  };

  const moveToNextQuestion = () => {
    setSelectedAnswer(null);
    setShowCorrect(false);
    setBoostUsed(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of quiz
      onQuizEnd();
    }
  };

  const handleBoostTime = () => {
    if (boostUsed) return;
    if (userBalance >= paramters?.boost_time_amount) {
      setUserBalance((prev) => prev - paramters?.boost_time_amount);
      setBoostUsed(true);
      startTimer(timeLeft + paramters?.boost_time); 
      onBoost();
    }else{
      setFund(true);
      setTimeout(() => setFund(false), 3000);
      return;
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <View style={{ flex: 1 }}>
      {fund && (<Text style={{ fontSize: 18, color: '#f00', fontWeight: "600", textAlign: "center" }}>⚡Insufficient balance</Text>)}
      <ScrollView style={{ padding: 20 }}>
        <View
          style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10
        }}
        >
          <Text style={{ fontSize: 16, fontWeight: "800" }}>Question {currentIndex + 1} / {paramters?.no_question}</Text>
          <TouchableOpacity
            onPress={handleBoostTime}
            style={{
              backgroundColor: boostUsed ? "#ccc" : "#007BFF",
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 12 }}>
              Boost Time (-₦{paramters?.boost_time_amount})
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 16, marginBottom: 20 }}>{currentQuestion.question}</Text>
        <View style={{marginBottom: 50}}>
          {currentQuestion.options.map((option, idx) => {
            const isCorrect = option === currentQuestion.correct;
            const isSelected = selectedAnswer === option;

            let backgroundColor = '#eee';
            if (showCorrect && isCorrect) {
              backgroundColor = 'green';
            } else if (isSelected && !isCorrect) {
              backgroundColor = 'red';
            }

            return (
              <TouchableOpacity
                key={idx}
                onPress={() => handleAnswerSelect(option)}
                style={{
                  backgroundColor,
                  padding: 10,
                  marginVertical: 5,
                  borderRadius: 8
                }}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer (Timer + Boost) */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 15,
          borderTopWidth: 1,
          borderColor: "#ddd",
          backgroundColor: "#f9f9f9",
          marginBottom: 10
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          ⏳ Time Left: {timeLeft}s
        </Text>
        
      </View>
    </View>
  );
};

export default Questions;
