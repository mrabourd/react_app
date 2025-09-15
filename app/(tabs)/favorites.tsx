import { View, FlatList, StyleSheet } from 'react-native';
import { useAppSelector } from "@/hooks/redux";
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function FavoritesScreen() {
  const favorites = useAppSelector(state => state.favorites.fruits);

  const renderHeader = () => (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <MaterialCommunityIcons 
          name="fruit-grapes"
          size={330}
          color="#808080"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          I love them.
        </ThemedText>
      </ThemedView>
      <ThemedText style={styles.subtitle}>
        Here are my favorite fruits.
      </ThemedText>
    </ParallaxScrollView>
  );

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <ThemedView style={styles.item}>
          <ThemedText style={styles.text}>{item.name}</ThemedText>
        </ThemedView>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  subtitle: {
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: 16,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
  },
});
