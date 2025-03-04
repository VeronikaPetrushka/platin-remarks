import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Animated, ImageBackground } from "react-native";

const { height, width } = Dimensions.get("window");

const Game = () => {
    const [gameState, setGameState] = useState("start");
    const [partsVisible, setPartsVisible] = useState(false);
    const [leftMoved, setLeftMoved] = useState(false);
    const [rightMoved, setRightMoved] = useState(false);
    const [topMoved, setTopMoved] = useState(false);

    const leftAnim = useRef(new Animated.Value(0)).current;
    const rightAnim = useRef(new Animated.Value(0)).current;
    const topAnim = useRef(new Animated.Value(0)).current;

    const handlePress = (evt) => {
        const { locationX, locationY } = evt.nativeEvent;

        console.log('locationX: ', locationX)
        console.log('locationY: ', locationY)

        if (gameState === "start") {
            if (locationY > height * 0.27 - 70) {
                setGameState("lose");
            } else if (locationY > height * 0.27 - 150 && locationX < 70) {
                setPartsVisible(true);
                Animated.timing(leftAnim, { toValue: -50, duration: 300, useNativeDriver: true }).start(() => {
                    setLeftMoved(true);
                    checkWin();
                });
            }
        } else if (gameState === "playing") {
            if (locationY > height * 0.27 - 120 && locationX < width - 130) {
                Animated.timing(rightAnim, { toValue: 50, duration: 300, useNativeDriver: true }).start(() => {
                    setRightMoved(true);
                    checkWin();
                });
            } else if (locationY < 70 && locationX > 40 && locationX < 200) {
                Animated.timing(topAnim, { toValue: -50, duration: 300, useNativeDriver: true }).start(() => {
                    setTopMoved(true);
                    checkWin();
                });
            }
        }
    };

    const checkWin = () => {
        if (leftMoved && rightMoved && topMoved) {
            setGameState("win");
        } else {
            setGameState("playing");
        }
    };

    const restartGame = () => {
        setGameState("start");
        setPartsVisible(false);
        setLeftMoved(false);
        setRightMoved(false);
        setTopMoved(false);
        leftAnim.setValue(0);
        rightAnim.setValue(0);
        topAnim.setValue(0);
    };

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <Image style={styles.logo} source={require("../assets/images/logo.png")} />
                    <Text style={styles.upperText}>PLATIN REMARKS</Text>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{gameState === "win" ? "You Won!" : gameState === "lose" ? "You Lost!" : "Relax Game"}</Text>
                    {gameState === "start" && <Text style={styles.text}>Separate the star from the extra parts without breaking it and get a secret prize</Text>}
                </View>

                {gameState === "lose" ? (
                    <>
                        <Image source={require("../assets/images/game-lose.png")} style={styles.full} />
                        <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
                            <Text style={styles.restartText}>Restart</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity activeOpacity={1} onPress={handlePress}>
                        {partsVisible ? (
                            <View style={styles.partsContainer}>
                                <Animated.Image source={require("../assets/images/left.png")} style={[styles.left, { transform: [{ translateX: leftAnim }] }]} />
                                <Animated.Image source={require("../assets/images/right.png")} style={[styles.right, { transform: [{ translateX: rightAnim }] }]} />
                                <Animated.Image source={require("../assets/images/top.png")} style={[styles.top, { transform: [{ translateY: topAnim }] }]} />
                                <Image source={require("../assets/images/star.png")} style={styles.full} />
                            </View>
                        ) : (
                            <Image source={require("../assets/images/game1.png")} style={styles.full} />
                        )}
                    </TouchableOpacity>
                )}

                {gameState === "win" && (
                    <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
                        <Text style={styles.restartText}>Restart</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 31,
    },

    upperContainer: {
        width: "100%",
        paddingTop: height * 0.07,
        paddingHorizontal: 42,
        paddingBottom: 23,
        backgroundColor: "#0d3046",
        borderWidth: 1,
        borderBottomColor: "#4b6392",
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    logo: {
        width: 45,
        height: 43,
        resizeMode: "contain",
    },

    upperText: {
        fontSize: 22,
        fontWeight: "900",
        fontStyle: "italic",
        lineHeight: 26.23,
        color: "#fff",
    },

    titleContainer: {
        width: "100%",
        padding: 18,
        backgroundColor: "#0d3046",
        borderColor: "#4b6392",
        borderWidth: 1,
        borderRadius: 22,
        marginBottom: height * 0.05,
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 19.4,
        color: "#fff",
        marginBottom: 10,
    },

    text: {
        fontSize: 16,
        fontWeight: "300",
        lineHeight: 19.4,
        color: "#999",
        textAlign: "center",
    },

    full: {
        width: 268,
        height: height * 0.27,
        resizeMode: "contain",
    },

    partsContainer: {
        position: "relative",
        width: 268,
        height: height * 0.27,
        alignItems: "center",
        justifyContent: "center",
    },

    left: {
        width: 134,
        height: height * 0.241,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: -12,
        left: 58
    },

    right: {
        width: 134,
        height: height * 0.134,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: -11,
        right: 10
    },

    top: {
        width: 213.5,
        height: height * 0.135,
        resizeMode: 'contain',
        position: 'absolute',
        top: 15,
        right: 5
    },

    part: {
        position: "absolute",
        width: 268,
        height: height * 0.27,
        resizeMode: "contain",
    },

    restartButton: {
        marginTop: height * 0.06,
        width: '100%',
        backgroundColor: "#fdac03",
        padding: 18,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },

    restartText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
    },

});

export default Game;
