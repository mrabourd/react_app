import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Tabs, withLayoutContext } from "expo-router";
import { useAppSelector } from '@/hooks/redux';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { Navigator, Screen } = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Navigator);

export default function TopTabsLayout() {
    const theme = useAppSelector(state => state.theme.mode); 

    const currentColors = Colors[theme as keyof typeof Colors];
    

  return (
    <TopTabs
      screenOptions={{
        tabBarActiveTintColor: currentColors.tint,
        tabBarStyle: { backgroundColor: currentColors.background }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Family of fruits',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="fruit-citrus" size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Bookmarks',
          tabBarIcon: ({ color }) => <MaterialIcons name="bookmark" size={28} color={color} />,
        }}
      />
    </TopTabs>
  );
}
