import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirstScreen from './src/screens/FirstScreen';

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
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
