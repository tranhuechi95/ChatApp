import React, {useState} from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import SingleContact from '../components/SingleContact';
import ContactsAddModal from '../components/ContactsAddModalcopy';
import ContactsEditModal from '../components/ContactsEditModal';

const ContactScreen = () => {
  const [searchInput, setSearchInput] = useState('');
  const [prevSearchInput, setPrevSearchInput] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const searchInputHandler = (input) => {
    setSearchInput(input);
    filterHandler();
  };
  const searchHandler = () => {
    if (searchInput == '') {
      Alert.alert('Missing input!', 'You forget to type your search', [{text: 'Enter search input', style: 'cancel'}]);
    }
  };
  const filterHandler = () => {
    let CurrentContacts = [];
    let FilteredContacts = [];
    CurrentContacts = contacts;
    const lowerCaseSearchInput = searchInput.toLowerCase();
    FilteredContacts = CurrentContacts.filter(contact => {
      const lowerCaseContact = (contact.firstname + ' ' +  contact.lastname + ' ' + contact.relationship).toLowerCase();
      return lowerCaseContact.includes(lowerCaseSearchInput); // this method includes return true/false
    });
    setFilteredArray(FilteredContacts);
  };
  const addHandler = () => {
    setIsAdding(true);
  };
  const doneAddHandler = (input) => {
    setIsAdding(false);
    setContacts(currentContacts => [...currentContacts, input]);
    // console.log("Input " + input.firstName);
  };
  const cancelAddHandler = () => {
    setIsAdding(false);
  };
  const doneEditHandler = (input) => {
    if (prevSearchInput != '') {
      setSearchInput(prevSearchInput);
      setPrevSearchInput('');
    }
    const newContacts = contacts.map(contact => contact.id === input.id ? input: contact);
    setContacts(newContacts);
    filterHandler();
  };
  const cancelEditHandler = (id) => {
    if (prevSearchInput != '') {
      // need to pass back the searchInput
      setSearchInput(prevSearchInput);
      setPrevSearchInput('');
    }
    const newContacts = contacts.map(contact => contact.id === id ? {...contact, isEditing: false}: contact);
    setContacts(newContacts);
  };
  const setEditHandler = (id) => {
    if (searchInput != '') {
      setPrevSearchInput(searchInput); // to receive the searchInput value
      setSearchInput('');
    }
    const newContacts = contacts.map(contact => contact.id === id ? {...contact, isEditing: true}: contact);
    setContacts(newContacts);
  };
  const deleteHandler = (id) => {
    if (searchInput != '') {
      setFilteredArray(filteredArray.filter(contact => contact.id != id));
    }
    setContacts(contacts.filter(contact => contact.id != id));
  };
  const contactPressHandler = (id) => {
    Alert.alert('Edit contact', 'I want to ', [{text: 'Edit', onPress: () => setEditHandler(id) },
    {text: 'Delete', onPress: () => deleteHandler(id), style: 'destructive', color: 'red'},
    {text: 'Cancel', style: 'destructive'}]);
  };

  let display = contacts.map(contact => 
    <TouchableOpacity key={contact.id} onLongPress={contactPressHandler.bind(this, contact.id)} onPress={chatHandler}>
      <SingleContact upperText={contact.firstname + ' ' + contact.lastname} lowerText={contact.relationship}/>
      <ContactsEditModal visible={contact.isEditing} doneEditButton={doneEditHandler} cancel={cancelEditHandler} thisContact={contact}/>
    </TouchableOpacity>);

  if (searchInput != '') {
    display = filteredArray.map(contact => 
      <TouchableOpacity key={contact.id} onLongPress={contactPressHandler.bind(this, contact.id)} onPress={chatHandler}>
        <SingleContact upperText={contact.firstname + ' ' + contact.lastname} lowerText={contact.relationship}/>
        <ContactsEditModal visible={contact.isEditing} doneEditButton={doneEditHandler} cancel={cancelEditHandler} thisContact={contact}/>
      </TouchableOpacity>);
  }

  const chatHandler = () => {
    // this method is to handle the chat between user and this contact!

  };

  return (
    <View style={styles.mainScreen}>
      <Header header='Your contacts'/>
      <ContactsAddModal visible={isAdding} doneAddButton={doneAddHandler} cancel={cancelAddHandler}/>
      <View style={styles.searchAndAddScreen}>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchContainer}><TextInput placeholder='Search' fontSize={20} onChangeText={searchInputHandler} value={searchInput}/>
          </View>
          <View style={styles.searchIconContainer}>
          <TouchableOpacity onPress={searchHandler}><Ionicons name='ios-search' size={25}/></TouchableOpacity>   
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