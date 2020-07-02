import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.header}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: { 
        marginTop: 20,
        paddingTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        paddingTop: 15,
        paddingBottom: 10,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Header;