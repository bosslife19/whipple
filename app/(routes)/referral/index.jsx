import React, { useState, useMemo, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Share,
  Linking,
  Platform,
} from "react-native";

 
export default function ReferralListScreen({ referrals: initialReferrals, onRefresh }) {
  // Example data fallback
  const example = [
    { id: "1", name: "Ada Lovelace", email: "ada@example.com" },
    { id: "2", name: "Alan Turing", email: "alan@example.com" },
    { id: "3", name: "Grace Hopper", email: "grace@example.com" },
    { id: "4", name: "Katherine Johnson", email: "katherine@example.com" },
    { id: "5", name: "Margaret Hamilton", email: "margaret@example.com" },
  ];

  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const referrals = initialReferrals && initialReferrals.length ? initialReferrals : example;

  // Filtered list
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return referrals;
    return referrals.filter(
      (r) =>
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.email && r.email.toLowerCase().includes(q))
    );
  }, [referrals, query]);

  const handleRefresh = useCallback(async () => {
    if (!onRefresh) return;
    try {
      setRefreshing(true);
      await onRefresh();
    } catch (e) {
      // ignore: could show a Toast/Alert
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  const handleEmail = (email) => {
    const url = `mailto:${email}`;
    Linking.canOpenURL(url)
      .then((ok) => (ok ? Linking.openURL(url) : null))
      .catch(() => null);
  };

  const handleShare = async (name, email) => {
    try {
      const message = `Referral: ${name} — ${email}`;
      await Share.share({
        message,
        title: `Referral: ${name}`,
      });
    } catch (e) {
      // ignore
    }
  };

  const renderAvatar = (name) => {
    const initials = (name || "U")
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.left}>
        {renderAvatar(item.name)}
        <View style={styles.meta}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name || "No name"}
          </Text>
          <Text style={styles.email} numberOfLines={1}>
            {item.email || "No email"}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => handleEmail(item.email)}
          accessibilityLabel={`Email ${item.name}`}
        >
          <Text style={styles.actionText}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.shareBtn]}
          onPress={() => handleShare(item.name, item.email)}
          accessibilityLabel={`Share ${item.name}`}
        >
          <Text style={[styles.actionText, styles.shareText]}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Referrals</Text>
          <Text style={styles.subtitle}>{`Total referred — ${referrals.length}`}</Text>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search by name or email"
          placeholderTextColor="#9aa4b2"
          style={styles.search}
          returnKeyType="search"
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={filtered.length ? styles.listContainer : styles.emptyContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No referrals found</Text>
            <Text style={styles.emptyText}>
              Try inviting friends — they will appear here once they sign up.
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f3f6fb",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 20 : 28,
    paddingBottom: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eef1f6",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f1724",
  },
  subtitle: {
    marginTop: 4,
    color: "#6b7280",
    fontSize: 13,
  },

  searchWrap: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  search: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#e6e9ef",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },

  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 54 / 2,
    backgroundColor: "#eef6ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2b6cb0",
  },

  meta: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f1724",
  },
  email: {
    marginTop: 4,
    fontSize: 13,
    color: "#6b7280",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6eefb",
    backgroundColor: "transparent",
    marginLeft: 8,
  },
  shareBtn: {
    backgroundColor: "#eef6ff",
    borderColor: "#d6eaff",
  },
  actionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563eb",
  },
  shareText: {
    color: "#0f1724",
  },

  sep: {
    height: 12,
  },

  // Empty state
  emptyContainer: {
    flexGrow: 1,
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f1724",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
});
