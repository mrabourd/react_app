import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type ItemProps = { title: string };

export const Item = ({ title }: ItemProps) => (
  <ThemedView style={styles.item}>
    <ThemedText style={styles.title}>{title}</ThemedText>
  </ThemedView>
);

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 16,
  },
});
