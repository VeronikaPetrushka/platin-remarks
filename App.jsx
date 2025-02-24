import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirstScreen from './src/screens/FirstScreen';
import HomeScreen from './src/screens/HomeScreen';
import TagScreen from './src/screens/TagScreen';
import AddScreen from './src/screens/AddScreen';
import NotesScreen from './src/screens/NotesScreen';
import GameScreen from './src/screens/GameScreen';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"FirstScreen" }>
              <Stack.Screen 
                    name="FirstScreen" 
                    component={FirstScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="HomeScreen" 
                    component={HomeScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="TagScreen" 
                    component={TagScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="AddScreen" 
                    component={AddScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="NotesScreen" 
                    component={NotesScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="GameScreen" 
                    component={GameScreen} 
                    options={{ headerShown: false }} 
              />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
