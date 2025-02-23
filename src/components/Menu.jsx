import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Menu = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('GymScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('HomeScreen')}>
                <Icons type={'home'} active={activeButton === 'HomeScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('NotesScreen')}>
                <Icons type={'note'} active={activeButton === 'NotesScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.plusBtn, activeButton === 'AddScreen' && {backgroundColor: '#4788ff'}]} 
                onPress={() => handleNavigate('AddScreen')}>
                <Icons type={'plus'} active={activeButton === 'AddScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('TagScreen')}>
                <Icons type={'settings'} active={activeButton === 'TagScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.starBtn} 
                onPress={() => handleNavigate('GameScreen')}>
                <Icons type={'star'} active={activeButton === 'GameScreen'}/>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 331,
        height: 66,
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#0d3046',
        borderWidth: 1,
        borderRadius: 22,
        borderColor: '#4b6392'
    },
    
    button: {
        width: 66,
        height: 66,
        padding: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },

    plusBtn: {
        width: 66,
        height: 66,
        padding: 16,
        borderRadius: 22,
        backgroundColor: '#4b6392',
    },

    starBtn: {
        width: 66,
        height: 66,
        padding: 18,
        borderRadius: 22,
        backgroundColor: '#fdac03',
    },

});

export default Menu;
