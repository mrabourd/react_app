// HomeScreen.tsx
import { FlatList, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import { Link } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import ParallaxScrollView from '@/components/parallax-scroll-view';


type Fruit = {
  name: string;
  id: number;
  family: string;
};

export default function HomeScreen() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.fruityvice.com/api/fruit/all')
      .then(res => res.json())
      .then(data => {
        setFruits(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const families = Array.from(new Set(fruits.map(fruit => fruit.family)));

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  const renderHeader = () => (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<MaterialIcons name="grass" size={300} color="#808080" />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{ fontFamily: Fonts.rounded }}
        >
          Here are the fruits families!
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );

  return (
    <FlatList
      data={families}
      keyExtractor={(item) => item}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <ThemedView>
        <Link key={item} href={{ pathname: "/family/[name]", params: { name: item } }} asChild>
          <TouchableOpacity style={styles.item}>
            <ThemedText style={styles.text}>{item}</ThemedText>
          </TouchableOpacity>
        </Link>

        </ThemedView>
      )}
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 20,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
  },
});

