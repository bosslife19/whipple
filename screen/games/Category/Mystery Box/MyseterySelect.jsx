import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Package } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Losingmodal from '../../../loseModal/LoseModal';
import Winningmodal from '../../../winningmodal/winningmodal';
import HeaderBet from '../../../Header/HeaderBet';

const MyseterySelect = () => {
  const { selected, GameName } = useLocalSearchParams();
  const router = useRouter();

  const boxes = ['1', '2', '3'];
  const [success, setSuccess] = useState(null);
  const [visible, setModalVisibled] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);

  const handleBoxPress = (boxLabel) => {
    setSelectedBox(boxLabel);
  };

  const handleRevealBox = () => {
    if (!selectedBox) {
      alert('Please select a box first!');
      return;
    }

    setSuccess(selectedBox === selected);
    setModalVisibled(true);
  };

  const closeModal = () => {
    setModalVisibled(false);
  };

  return (
    <>
    <HeaderBet amount={'200'} name={GameName} arrow />
    <ScrollView contentContainerStyle={styles.container}>
          {/* <TouchableOpacity style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back to Games</Text>
          </TouchableOpacity> */}

          <Text style={styles.headerTitle}>{GameName || 'Mystery Box Game'}</Text>
          <Text style={styles.headerSubtitle}>Choose the correct box to win!</Text>

          <View style={styles.card}>
              <Text style={styles.cardTitle}>Mystery Box Challenge</Text>
              <Text style={styles.cardSubtitle}>House Selection Hidden</Text>

              <View style={styles.boxContainer}>
                  {boxes.map((box) => (
                      <TouchableOpacity
                          key={box}
                          style={[
                              styles.box,
                              selectedBox === box && styles.selectedBox,
                          ]}
                          onPress={() => handleBoxPress(box)}
                      >
                          <Package size={64} color="#92400e" />
                          <Text style={styles.boxNumber}>{box}</Text>
                      </TouchableOpacity>
                  ))}
              </View>

              {success === null ? (
                  <TouchableOpacity
                      style={styles.revealButton}
                      onPress={handleRevealBox}
                  >
                      <Text style={styles.revealButtonText}>Reveal Box</Text>
                  </TouchableOpacity>
              ) : (
                  <TouchableOpacity
                      style={styles.backHomeButton}
                      onPress={() => router.push('/(tabs)/home')}
                  >
                      <Text style={styles.backHomeButtonText}>Back to Home</Text>
                  </TouchableOpacity>
              )}
          </View>

          <View style={styles.card}>
              <Text style={styles.cardTitle}>How To Win</Text>
              <Text style={styles.cardText}>
                  Select one of the three mystery boxes. If you pick the same box the House chose, you win!
              </Text>
          </View>

          {success === true && (
              <Winningmodal visible={visible} closeModal={closeModal} />
          )}
          {success === false && (
              <Losingmodal visible={visible} closeModal={closeModal} />
          )}
      </ScrollView></>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: '#555',
  },
  card: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    gap:10
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef3c7',
    borderWidth: 2,
    borderColor: '#92400e',
    borderRadius: 8,
    width: "32%",
    height: 100,
  },
  selectedBox: {
    borderColor: '#2563eb',
    borderWidth: 4,
  },
  boxNumber: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#92400e',
  },
  revealButton: {
    marginTop: 16,
    backgroundColor: '#0A1931',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  revealButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  backHomeButton: {
    marginTop: 16,
    backgroundColor: '#0A1931', 
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backHomeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cardText: {
    fontSize: 14,
    color: '#333',
  },
});

export default MyseterySelect;
