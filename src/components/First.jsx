import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const First = () => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);


    const handleButtonPress = () => {
        setIndex((prevIndex) => (prevIndex + 1) % 3);

        if(index === 2) {
            navigation.navigate('HomeScreen')
        }
    };

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                {
                    index === 0 ?
                    (
                        <Image source={require('../assets/images/logo.png')} style={[styles.image, {width: 222, height: height * 0.212, marginTop: height * 0.03}]} />
                    ) :
                    index === 1 ? (
                        <Image source={require('../assets/images/buttons.png')} style={[styles.image, {width: 264, height: height * 0.11, marginTop: height * 0.12}]} />
                    ) : (
                        <Image source={require('../assets/images/game.png')} style={[styles.image, {width: 268, height: height * 0.268, marginTop: height * 0.02}]} />
                    )
                }

                <View style={styles.textContainer}>
                    
                    <Text style={styles.title}>
                        {
                            index === 0 ? 'Welcome to Platin Remarks!'
                            : index === 1 ? 'Tagging Notes' 
                            : 'Unlock Secret Prizes!'
                        }
                    </Text>

                    <Text style={styles.text}>
                        {
                            index === 0 ? 'Keep your thoughts, ideas, and tasks organized with ease. Create quick notes or add detailed ones with attachments. Let’s get started!'
                            : index === 1 ? 'Organize your notes by adding tags like "Work," "Creative," or anything you prefer! You can also create your own custom tags to fit your needs.' 
                            : 'Take a break and play a fun mini-game to earn secret useful prizes. Just separate a star from a circle without damaging it—easy and rewarding!'
                        }
                    </Text>

                    <TouchableOpacity style={styles.btn} onPress={handleButtonPress}>
                        <Text style={styles.btnText}>{
                            index === 2 ? 'Start' : 'Next'
                        }</Text>
                    </TouchableOpacity>

                </View>

                </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: height * 0.07,
    },

    image: {
        resizeMode: 'contain',
        marginBottom: height * 0.09,
    },

    textContainer: {
        width: '100%',
        paddingTop: height * 0.066,
        paddingHorizontal: 31,
        paddingBottom: height * 0.12,
        backgroundColor: '#0d3046',
        borderTopColor: '#4b6392',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22
    },

    title: {
        fontWeight: '700',
        fontSize: 22,
        color: '#fff',
        textAlign: 'center',
        marginBottom: height * 0.03,
        lineHeight: 26.63
    },

    text: {
        fontWeight: '300',
        fontSize: 16,
        color: '#fff',
        marginBottom: height * 0.03,
        lineHeight: 19.36
    },

    btn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        backgroundColor: '#fdac03',
        padding: 20
    },

    btnText: {
        fontWeight: '700',
        fontSize: 16,
        color: '#fff',
        lineHeight: 19.36
    },

})

export default First;