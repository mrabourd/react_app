import { Image } from 'expo-image';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, StatusBar} from 'react-native';
import { Item } from '@/app/item/item';
import React, { useEffect, useState } from 'react';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type Fruit = {
  name: string;
  id: number;
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

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00aa00" />
        <Text>Loading fruits...</Text>
      </View>
    );
  }

  if (!fruits.length) {

    return (
      <View style={styles.loader}>
        <ThemedText>No fruits found.</ThemedText>
      </View>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText>
        Here are the elements from the API
      </ThemedText>
      <View style={styles.container}>
      <FlatList
        data={fruits}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => <Item title={item.name} />}
      />
    </View>
      </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
