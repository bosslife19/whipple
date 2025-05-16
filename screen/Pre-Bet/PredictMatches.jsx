import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import CreateGames2 from '../../styles/creategames/creategames.styles';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

// Reusable MatchCard Component
const MatchCard = ({ teamA, teamB, dateTime, onSelect }) => {
  const [selected, setSelected] = useState({ team: null, type: null });

  const handleSelect = (team, type) => {
    if (selected.team !== team || selected.type !== type) {
      setSelected({ team, type });
      onSelect(); // Notify parent
    }
  };

  const getButtonStyle = (team, type) => {
    const isDraw = selected.type === 'Draw';
    const isSelected = selected.team === team && selected.type === type;

    // Special case: both Draws should look selected if any Draw is selected
    if (type === 'Draw' && isDraw) {
      return [styles.outcomeButton, styles.drawButton];
    }

    if (isSelected) {
      return [
        styles.outcomeButton,
        type === 'Win' ? styles.winButton : styles.drawButton,
      ];
    }

    return styles.outcomeButton;
  };

  const getTextStyle = (team, type) => {
    const isDraw = selected.type === 'Draw';
    const isSelected = selected.team === team && selected.type === type;

    // Make both draw texts white if draw selected
    if (type === 'Draw' && isDraw) return styles.selectedText;

    return isSelected ? styles.selectedText : styles.defaultText;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{dateTime}</Text>
      <View style={styles.matchRow}>
        <View style={styles.teamColumn}>
          <Text style={styles.teamName}>{teamA}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={getButtonStyle(teamA, 'Win')}
              onPress={() => handleSelect(teamA, 'Win')}
            >
              <Text style={getTextStyle(teamA, 'Win')}>Win</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={getButtonStyle(teamA, 'Draw')}
              onPress={() => handleSelect(teamA, 'Draw')}
            >
              <Text style={getTextStyle(teamA, 'Draw')}>Draw</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={styles.teamColumn}>
          <Text style={styles.teamName}>{teamB}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={getButtonStyle(teamB, 'Win')}
              onPress={() => handleSelect(teamB, 'Win')}
            >
              <Text style={getTextStyle(teamB, 'Win')}>Win</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={getButtonStyle(teamB, 'Draw')}
              onPress={() => handleSelect(teamB, 'Draw')}
            >
              <Text style={getTextStyle(teamB, 'Draw')}>Draw</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};



// Main PredictMatches Component
const PredictMatches = () => {
  const [selections, setSelections] = useState(0);

  const handleSelection = () => {
    setSelections((prev) => Math.min(prev + 1, 3)); // prevent over-increment
  };

  const getConfirmText = () => {
    return selections <= 1
      ? 'Confirm Prediction (Free)'
      : 'Confirm Prediction ($0.5 fee)';
  };

  return (
    <View style={{height:'100%',paddingTop:30}}>


    <ScrollView style={styles.container}>
      <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()} >
              <MaterialIcons name="arrow-back" size={21} color="#0F172A" />
              <Text style={styles.backText}>Back to Categories</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Predict Match Outcomes</Text>
        <Text style={styles.subtitle}>Premier League - upcoming matches</Text>
      </View>

      <MatchCard teamA="Chelsea" teamB="Man U" dateTime="May 18, 2025 at 8:00 AM" onSelect={handleSelection} />
      <MatchCard teamA="Liverpool" teamB="Arsenal" dateTime="May 18, 2025 at 10:30 AM" onSelect={handleSelection} />
      <MatchCard teamA="Man City" teamB="Tottenham" dateTime="May 23, 2025 at 12:45 PM" onSelect={handleSelection} />

      <View style={styles.confirmSection}>
        <TouchableOpacity
         onPress={() => {
                  router.push('(tabs)/PreBetActivities')
          }}
          
          style={[
            styles.confirmButton,
            { opacity: selections === 0 ? 0.5 : 1 },
          ]}
          disabled={selections === 0}
        >
          <Text style={styles.confirmButtonText}>{getConfirmText()}</Text>
        </TouchableOpacity>
        <Text style={styles.note}>
          Win 25% Discounted Bets for each correct prediction (valid for 72 hours)
        </Text>
      </View>
    </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: '#fff',
    },
 winButton: {
  backgroundColor: '#35B464',
  borderColor: '#35B464',
},
drawButton: {
  backgroundColor: '#7659A7',
  borderColor: 'purple',
},
selectedText: {
  color: '#fff',
  fontWeight: '500',
},
defaultText: {
  color: '#000',
  fontWeight: '500',
},
  backText: {
    fontSize: 14,
    fontWeight: '500',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderColor: '#ccc',
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  backIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    elevation: 2,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamColumn: {
    width: '40%',
    alignItems: 'center',
  },
  teamName: {
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  outcomeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
  vsText: {
    fontWeight: 'bold',
  },
  confirmSection: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  confirmButton: {
    backgroundColor: '#9985F1',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default PredictMatches;
