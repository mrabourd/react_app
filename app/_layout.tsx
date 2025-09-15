import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Provider } from "react-redux";
import { store } from "../store/store";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { toggleTheme } from "@/store/themeSlice";
import { useAppSelector } from '@/hooks/redux';
import 'react-native-reanimated';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}


function AppContent() {
  const theme = useAppSelector(state => state.theme.mode);
  const styles = StyleSheet.create({
    header: {
      backgroundColor: '#D0D0D0',
      height: 300,
    },
  });

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
          <Stack.Screen
            name="family/[name]"
            options={{
              title: 'Back',
              headerStyle: styles.header
            }}
        />
        </Stack>

        <Footer />
      </View>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

function Footer() {
  const dispatch = useDispatch();
  const theme = useAppSelector(state => state.theme.mode);

  return (
    <View style={styles.footer}>
      <Pressable
        style={styles.toggleButton}
        onPress={() => dispatch(toggleTheme())}  
      >
        <Text style={styles.toggleText}>{theme === "dark" ? "🌙" : "☀️"}</Text>
      </Pressable>
      <Text style={styles.text}>© 2025 Aimigo-test</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    height: 80,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#333",
  },
  toggleButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  toggleText: {
    fontSize: 18,
  },
});
