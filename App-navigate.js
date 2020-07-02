import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Alert, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ route, navigation }) {
  useEffect(() => {
    if (route.params?.post) {
      console.log("There is input")
    }
  }, [route.params?.post]);
  let content;
  if (route.params?.post) {
    content = <Text style={styles.text}>Post: {route.params?.post}</Text>
  }
  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
      <Button title="Create post" onPress={() => navigation.navigate('CreatePost')}/>
      {content}
    </View>
  );
};

function LogoTitle() {
  return (
    <Image
      style={{ width: 100, height: 40, margin: 10, padding: 10}}
      source={require('./Static/Images/logo.jpg')}
    />
  );
}

function CreatePostScreen({ route, navigation}) {
  const [postText, setPostText] = useState();
  const elsewhereHandler = () => {
    Keyboard.dismiss();
  }
  const submitHandler = () => {
    if (!postText) {
      Alert.alert('Missing content', 'You have to input some content to post', [{ text: 'Re-enter', style: 'cancel'}]);
      return;
    }
    navigation.navigate('Home', { post: postText})
  }
  return (
    <TouchableWithoutFeedback onPress={elsewhereHandler}>
      <View style={styles.screen}>
        <Text style={styles.text}>Create Post</Text>
        <TextInput multiline
        placeholder="What's on your mind?"
        style={styles.textInput}
        value={postText}
        onChangeText={setPostText}/>
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={submitHandler}/>
          <Button title="Reset" onPress={() => setPostText('') }/>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{ headerStyle: { backgroundColor: '#f4511e'}, headerTintColor: '#fff' }}>
        <Stack.Screen name="Home" component={HomeScreen} 
          options={{ 
            headerLeft: props => <LogoTitle {...props} />, 
            headerRight: () => (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            /> ) 
          }} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Create Your Post'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  text: {
    margin: 10,
    fontSize: 15,
  },
  textInput: {
    height: 200,
    width: 200,
    padding: 10,
    backgroundColor: 'white', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;