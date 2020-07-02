import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Header from '../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileEditModal from '../components/ProfileEditModal';

function ProfileScreen() {
    const [editVisible, setEditVisible] = useState(false);
    const [profileContent, setProfileContent] = useState({name: "Edit name", age: "edit age", tel: "add phone number", email: "add your email", description: "Something interesting about U!"});
    // {name: "Edit name", age: "edit age", tel: "add phone number", email: "add your email", description: "Something interesting about U!"}

    const editButtonHandler = () => {
      setEditVisible(true);
    };
    const editSubmitHandler = (input) => {
      setProfileContent(input);
      setEditVisible(false);
    };

    const cancelEditHandler = () => {
      setEditVisible(false);
    };
    const name = profileContent.name;
    const age = profileContent.age;
    const tel = profileContent.tel;
    const email = profileContent.email;
    const description = profileContent.description;
    
    return (
      <View style={styles.mainScreen}>
        <Header header={name != 'Edit name' ? (name + '\'s Profile') : 'Your Profile'}/>
        <View style={styles.photoContainer}>
          <Image style={styles.imageContainer} source={require('../Static/Images/Profile1.png')} />
        </View>
        <View style={styles.descriptionContainer}>
          <View style={styles.nameAgeEditContainer}>
            <View style={styles.nameAgeContainer}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.age}>{age}</Text>
            </View>
            <TouchableHighlight style={styles.editIconContainer}>
              <MaterialCommunityIcons name="account-edit" size={30} color='#595959' onPress={editButtonHandler}/>
            </TouchableHighlight>
          </View>
          <View style={styles.infoContainer}> 
          {/* for phone and email*/}
            <View style={styles.contactsContainer}>
              <MaterialCommunityIcons name="cellphone-iphone" size={25} style={styles.iconContainter}/>
              <Text style={styles.infoText}>{tel}</Text>
            </View>
            <View style={styles.contactsContainer}>
              <MaterialCommunityIcons name="email" size={25} style={styles.iconContainter}/>
              <Text style={styles.infoText}>{email}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{description}</Text>
          </View>
        </View>
        <ProfileEditModal visible={editVisible} editSubmit={editSubmitHandler} cancel={cancelEditHandler} content={profileContent}/>       
      </View>
    );
}

const styles = StyleSheet.create({
  mainScreen: {
      flex: 1, 
      backgroundColor: 'lightblue',
  },
  photoContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 440,
    height: 300,
  },
  nameAgeEditContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  nameAgeContainer: {
    width: 330,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'baseline',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 10,
  },
  age: {
    fontSize: 20,
    color: 'gray',
  },
  editIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactsContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  iconContainter: {
    color: 'blue',
    marginRight: 5,
  },
  infoContainer: {
    padding: 15,
  },
  infoText: {
    fontSize: 20,
    color: 'gray',
    paddingLeft: 10,
  },
  descriptionContainer: {
    flex: 3, 
    backgroundColor: 'white',
    padding: 5,  
  },
  container: {
    flex: 0.5, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;

// the edit screen will be a Modal that appears and edit the content!