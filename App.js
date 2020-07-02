import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ContactScreen from './screens/ContactScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfileEdit from './components/ProfileEditModal';
import MessagesScreen from './screens/MessagesScreen';
import PhotosScreen from './screens/PhotosScreen';
import SinglePhotoScreen from './screens/SinglePhotoScreen'

const ProfileTabScreens = () => { // nested navigator
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen 
        name='Profile' component={ProfileScreen} 
        options={{ title: 'My Profile', 
        headerStyle: {
          backgroundColor: 'lightblue'
        }, headerTitleStyle: { fontWeight: 'bold'}
      }}/>
      <ProfileStack.Screen 
        name='ProfileEdit' component={ProfileEdit} 
        options={{ title: 'Edit Profile', 
        headerStyle: {
          backgroundColor: 'lightblue'
        }, headerTitleStyle: { fontWeight: 'bold'}
      }}/>
    </ProfileStack.Navigator>
  );
}

const PhotoTabScreen = () => {
  return (
    <PhotoStack.Navigator>
      <PhotoStack.Screen 
        name='Photos' component={PhotosScreen}
        options={{ title: 'My photos',
          headerStyle: {
            backgroundColor: 'pink'
          }, headerTitleStyle: { fontWeight: 'bold' }
        }}/>
      <PhotoStack.Screen 
        name='Photo' component={SinglePhotoScreen}
        />
    </PhotoStack.Navigator>
  )
}

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Photos"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileTabScreens}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactScreen}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
        }}
      />
      {/* a screen to show off your photos! */}
      <Tab.Screen
        name="Photos"
        component={PhotoTabScreen}
        options={{
          tabBarLabel: 'Photos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="image" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const PhotoStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
};

export default App;


