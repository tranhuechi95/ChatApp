import React, { useState, useEffect} from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import SingleContact from '../components/SingleContact';
import ContactsAddModal from '../components/ContactsAddModalPhoto';
import ContactsEditModal from '../components/ContactsEditModal';
import firestore from '@react-native-firebase/firestore';

const ContactScreen = ({ navigation }) => {
  const db = firestore().collection('testContacts2');
  const [searchInput, setSearchInput] = useState('');
  const [prevSearchInput, setPrevSearchInput] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => { // pull the data from db
    db
      .orderBy('create', 'asc')
      .onSnapshot((snapshot) => {
        const dbContacts = snapshot.docs.map((doc) => ({
          id: doc.id, // id generated by firebase
          isEditing: false,
          ...doc.data()
        }));
        setContacts(dbContacts);
      });
  }, []);

  const searchHandler = () => {
    if (searchInput == '') {
      Alert.alert('Missing input!', 'You forget to type your search', [{text: 'Enter search input', style: 'cancel'}]);
    }
  };
  const searchInputHandler = (input) => {
    // need to filter dynamically
    setSearchInput(input);
    filterHandler(contacts, input);
  };
  const filterHandler = (newContacts, input) => {
    const lowerCaseSearchInput = input.toLowerCase();
    // FilteredContacts = CurrentContacts.filter(contact => {
    let filteredContacts = newContacts.filter(contact => {
      const lowerCaseContact = (contact.firstname + ' ' +  contact.lastname + ' ' + contact.relationship).toLowerCase();
      return lowerCaseContact.includes(lowerCaseSearchInput);
    });
    setFilteredArray(filteredContacts);  
  };

  const addHandler = () => {
    setIsAdding(true);
  };
  // {id: generated by db, isEditing: false, firstName: firstname, lastName: lastname, relationship: relationship, tel: tel, email: email};
  const doneAddHandler = (input) => {
    setIsAdding(false);
    db.add({
        contactPhoto: input.contactPhoto,
        firstname: input.firstname,
        lastname: input.lastname,
        relationship: input.relationship,
        tel: input.tel,
        email: input.email,
        create: new Date()
      })
  };
  const cancelAddHandler = () => {
    setIsAdding(false);
  };
  
  const setEditHandler = (id) => {
    if (searchInput != '') {
      setPrevSearchInput(searchInput); // to receive the searchInput value
      setSearchInput('');
    }
    const newContacts = contacts.map(contact => contact.id === id ? {...contact, isEditing: true}: contact);
    setContacts(newContacts);
  };
  const doneEditHandler = (input) => {
    // need to update the db
    db
      .doc(input.id)
      .update({
        contactPhoto: input.contactPhoto,
        firstname: input.firstname,
        lastname: input.lastname,
        relationship: input.relationship,
        tel: input.tel,
        email: input.email});
    const newContacts = contacts.map(
      contact => contact.id === input.id ? {...input, isEditing: false} : contact
      );
    if (prevSearchInput != '') {
      setSearchInput(prevSearchInput);
      setPrevSearchInput('');
    }
    // prevSearchInput still the search string, searchInput still ''
    setContacts(newContacts);
    filterHandler(newContacts, prevSearchInput);
  };
  const cancelEditHandler = () => {
    if (prevSearchInput != '') {
      // need to pass back the searchInput
      setSearchInput(prevSearchInput);
      setPrevSearchInput('');
    }
    const newContacts = contacts.map(contact => contact.isEditing ? {...contact, isEditing: false} : contact);
    setContacts(newContacts);
  };
  const deleteHandler = (id) => {
    if (searchInput != '') {
      setFilteredArray(filteredArray.filter(contact => contact.id != id));
    }
    db.doc(id).delete();
  };

  const contactPressHandler = (id) => {
    Alert.alert('Edit contact', 'I want to ', [{text: 'Edit', onPress: () => setEditHandler(id) },
    {text: 'Delete', onPress: () => deleteHandler(id), style: 'destructive', color: 'red'},
    {text: 'Cancel', style: 'destructive'}]);
  };

  const chatHandler = (personFirstname, personLastname, id) => { // access the chat content of the contact using id
    // this method is to handle the chat between user and this contact!
    navigation.jumpTo('Messages', { firstname: personFirstname, lastname: personLastname, id: id}); 
    // go to the messages screen and pass firstname, lastname, id as params
  };
  
  let display = contacts.map(contact =>
    <TouchableOpacity key={contact.id} onLongPress={contactPressHandler.bind(this, contact.id)} onPress={chatHandler.bind(this, contact.firstname, contact.lastname, contact.id)}>
      <SingleContact upperText={contact.firstname + ' ' + contact.lastname} lowerText={contact.relationship} photo={contact.contactPhoto}/>
      <ContactsEditModal visible={contact.isEditing} doneEditButton={doneEditHandler} cancel={cancelEditHandler} thisContact={contact}/>
    </TouchableOpacity>);

  if (searchInput != '') { // is searching for contacts
    display = filteredArray.map(contact => 
      <TouchableOpacity key={contact.id} onLongPress={contactPressHandler.bind(this, contact.id)} onPress={chatHandler.bind(this, contact.firstname, contact.lastname, contact.id)}>
        <SingleContact upperText={contact.firstname + ' ' + contact.lastname} lowerText={contact.relationship} photo={contact.contactPhoto}/>
      </TouchableOpacity>);
}

  return (
    <View style={styles.mainScreen}>
      <Header header='Your contacts'/>
      <ContactsAddModal visible={isAdding} doneAddButton={doneAddHandler} cancel={cancelAddHandler}/>
      <View style={styles.searchAndAddScreen}>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchContainer}><TextInput placeholder='Search' fontSize={20} onChangeText={searchInputHandler} value={searchInput}/> 
          </View>
          <View style={styles.searchIconContainer}>
            <TouchableOpacity>
              <Ionicons name='ios-search' size={25} onPress={searchHandler}/>
            </TouchableOpacity>   
          </View>  
        </View>
        <View style={styles.addIconContainer}>
          <TouchableOpacity onPress={addHandler}><Ionicons name='ios-add' size={35}/></TouchableOpacity>   
        </View>
      </View>
      <View style={styles.contactsContainer}>
        <ScrollView>
            {display}    
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1, 
    backgroundColor: 'pink',
  },
  searchAndAddScreen: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  searchBarContainer: {
    flexDirection: 'row',
    width: 300,
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingHorizontal: 15,

  },
  searchContainer: {
    width: 250,
    // borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  searchIconContainer: {
    // borderWidth: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    // backgroundColor: '#e5d5d5',
  },
  addIconContainer: {
    // backgroundColor: '#e5d5d5',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    // borderWidth: 1,
    justifyContent: 'center',
  },
  contactsContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 10,
  },
});

export default ContactScreen;