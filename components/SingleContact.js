import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SingleContact = (props) => {
    const { upperText, lowerText, photo } = props;
    let contactPhoto;
    if (photo != '') {
        contactPhoto = <Image source={photo.url} style={styles.contactPhoto} />
    } else {
        contactPhoto = <Ionicons name='ios-contact' size={70} style={styles.singleContactIcon}/>
    }
    return (
        <View style={styles.singleContactContainer}>
            {contactPhoto}
            <View style={styles.singleContactTextContainer}>
              <Text style={styles.singleContactTextUpper}>{upperText}</Text>
              <Text styles={styles.singleContactTextLower}>{lowerText}</Text>
            </View> 
        </View>
    );
};

const styles = StyleSheet.create({
    singleContactContainer: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        borderColor: '#d8d8d8',
        borderBottomWidth: 1,
        marginHorizontal: 5,
    },
    contactPhoto: {
        height: 60,
        width: 60,
        margin: 5,
        borderRadius: 50,
        resizeMode: 'contain',
    },
    singleContactIcon: {
        padding: 5,
        color: '#8c8c8c',
    },
    singleContactTextContainer: {
        marginLeft: 10,
    },
    singleContactTextUpper: {
        fontSize: 20,
        fontFamily: 'HelveticaNeue-Bold',
    },
    singleContactTextLower: {
        fontSize: 15,
        fontFamily: 'HelveticaNeue-Bold',
    }
});

export default SingleContact;