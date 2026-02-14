import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "../../../Header/Header";
import LosersGameList from "../../../../styles/losersgameList/LosersGameList";
import FilterTabPanel from "../../../../features/TabPanel/FilterTabPanel";
import { useGameContext } from "../../../../context/AppContext";
import axiosClient from "../../../../axiosClient";
// import { useGameContext } from '../../../../context/GameContext';

const screenWidth = Dimensions.get("window").width;

const AvaliablePublishedGame = () => {
  const { gameData } = useGameContext();
  const { stake, totalOdds, gameLabel, range, selected, GameName } =
    gameData || {};

  const [games, setGames] = useState([]);

  useEffect(() => {
    const getAllgames = async () => {
      try {
       
        const res = await axiosClient.get("/get-all-games");

      
       
        setGames(res.data.games);
      } catch (error) {
        console.log(error);
      }
    };
    getAllgames();
  }, []);

  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("All");
  const [gamePlayed, setGamePlayed] = useState(false);
 

  const normalizedGameName = (game)=>{
    game?.toLowerCase();
  }
 

  

const filteredGames = games?.filter(game => {
  if (selectedTab !== 'All') {
   
    return game?.name.trim().toLowerCase() === selectedTab.trim().toLowerCase();
  }
  return true;
});



  const handlePlayNow = (game) => {
 
    setGamePlayed(true);
    
    

    if (
      normalizedGameName(game.name) === "dice roll" ||
      normalizedGameName(game.name) === "wheel spin" ||
      normalizedGameName(game.name) === "mystery box game" ||
      normalizedGameName(game.name) === "spin the bottle"
    ) {
     
      router.push({
        pathname: "/games/vote",
        params: {
          stake,
          odds: game.odds,
          subcategory: game.subcategory,
          gameLabel,
          GameName,
          house: game.creator.name,
          result: gameLabel,
          name:game.name,
          id: game.id
        },
      });
    } else if (
      normalizedGameName(game.name) === "one number spin" ||
      normalizedGameName(game.name) === "color roulette2"
    ) {
     
      router.push({
        pathname: "/games/details/gamedetails-without-vote",
        params: {
          stake,
          odds: game.totalOdds,
          gameLabel,
          GameName,
          range,
          result: gameLabel,
          name:game.name,
          id:game.id,
        },
      });
    } else {
    
      router.push({
        pathname: "/games/details",
        params: {
          stake:game.stake,
          odds: game.odds,
          gameLabel,
          name:game.name,
          id: game.id,
          result: game.result,
          house: game.creator?.name,
          subcategory:game.subcategory
        },
      });
    }
  };

  if (!games) {
    return (
      <View style={LosersGameList.centeredContainer}>
        <Header name="Available Events" backgroundColor="transparent" />
        <Text style={LosersGameList.noGameText}>
          No game is currently published.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ height: "100%", backgroundColor: "#EEF6FF" }}>
      <Header name="Available Events" />
      <View style={styles.container}>
        <View style={LosersGameList.rulesCard}>
          <Text style={LosersGameList.rulesTitle}>Game Rules</Text>
          <View style={LosersGameList.listItem}>
            <Text>
              Browse all Available Events to play and participate against The Knight
            </Text>
          </View>
         
        </View>

        <FilterTabPanel onTabChange={setSelectedTab} />
        <Text
          style={[
            LosersGameList.rulesTitle,
            { paddingHorizontal: 20, paddingTop: 10 },
          ]}
        >
          All Published Games
        </Text>

        {filteredGames && filteredGames ? (
          filteredGames.map((game, index)=>(
           
              <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsHorizontalScrollIndicator={false}
              key={game.id}
            >
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.headerIcon}>🔢</Text>
                  <Text style={styles.headerText}>{game?.name}</Text>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.row}>
                    <View>
                      <Text style={styles.label}>Stake</Text>
                      <Text style={styles.value}>₦{game.stake}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={styles.label}>Odds</Text>
                      <Text style={styles.value}>{game.odds}</Text>
                    </View>
                  </View>

                  <Text style={styles.description}>
                    {game?.name} - {game.subcategory}
                  </Text>

                  <View style={styles.row}>
                    <Text style={styles.info}>
                      <Text style={styles.infoLabel}>House:</Text> {game?.creator?.name}
                    </Text>
                    <Text style={styles.info}>
                      <Text style={styles.infoLabel}>Status:</Text> Open
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={()=>handlePlayNow(game)}
                  >
                    <Text style={styles.playButtonText}>
                      {normalizedGameName(game?.name) === "dice roll" ||
                      normalizedGameName(game?.name) === "wheel spin"
                        ? "Vote Now"
                        : "Play Now"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          ))
        ) : (
          <Text style={styles.noGameText}>No published game found.</Text>
        )}
        {
          filteredGames.length < 1 && <Text style={styles.noGameText}>No published game found.</Text>
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  scrollContainer: {
    marginHorizontal: "20",
    backgroundColor: "#EEF6FF",
    paddingVertical: 16,
  },
  noGameText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardBody: {
    padding: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: "#777",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 13,
    color: "#333",
    marginBottom: 10,
  },
  info: {
    fontSize: 12,
    color: "#555",
  },
  infoLabel: {
    color: "#777",
  },
  playButton: {
    marginTop: 12,
    backgroundColor: "#3b82f6",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  playButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});

export default AvaliablePublishedGame;
