import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleFavorite } from "@/store/favoritesSlice";
import { Fruit } from "@/store/favoritesSlice";

export default function FamilyScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);

  const favorites = useAppSelector(state => state.favorites.fruits);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch("https://www.fruityvice.com/api/fruit/all")
      .then(res => res.json())
      .then(data => setFruits(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  const filteredFruits = fruits.filter(f => f.family === name);

  const isFavorite = (fruit: Fruit) => favorites.some(f => f.id === fruit.id);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Famille : {name}</ThemedText>
      <FlatList
        data={filteredFruits}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.item}>
            <ThemedText style={styles.itemText}>{item.name}</ThemedText>
            <TouchableOpacity
              style={[styles.button, isFavorite(item) && styles.buttonActive]}
              onPress={() => dispatch(toggleFavorite(item))}
            >
              <ThemedText>
                {isFavorite(item) ? "★ Favori" : "☆ Ajouter"}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  itemText: { fontSize: 16 },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  buttonActive: {
    backgroundColor: "#FFD700",
  },
});
