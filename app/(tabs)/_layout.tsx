import { Colors } from '@/constants/theme';
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
        tabBarStyle: { backgroundColor: currentColors.background, height: 100 },
        tabBarLabelStyle: {
          marginTop: 1, 
          fontSize: 16,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Family of fruits',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="fruit-citrus" size={28} color={color} style={{ marginTop: 25 }}/>,
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'My favorite fruits',
          tabBarIcon: ({ color }) => <MaterialIcons name="bookmark" size={28} color={color} style={{ marginTop: 25 }} />,
        }}
      />
    </TopTabs>
  );
}
