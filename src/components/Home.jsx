import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <View style={styles.upperContainer}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                <Text style={styles.upperText}>PLATIN REMARKS</Text>
            </View>

            <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20}}>
                <TouchableOpacity style={styles.settingsBtn}>
                    <Icons type={'settings'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateBtn}>
                    <Text>date</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.starBtn}>
                    <Icons type={'star'} />
                </TouchableOpacity>
            </View>

            <View style={styles.noteContainer}>
                <View style={styles.noteUpperContainer}>
                    <Text style={styles.noteTitle}>Last note</Text>
                </View>
                <View style={{width: 32, height: 32, marginBottom: 12}}>
                    <Icons type={'plus'} />
                </View>
                <Text style={styles.noteText}>There is no notes yet, you can add a new one</Text>
            </View>

            <TouchableOpacity style={[styles.noteBtn, {backgroundColor: '#4b6392'}]}>
                <Text style={styles.noteBtnText}>Quick note</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.noteBtn, {backgroundColor: '#fdac03'}]}>
                <Text style={styles.noteBtnText}>Advanced note</Text>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: height * 0.07,
        backgroundColor: '#0A2231'
    },

})

export default Home;