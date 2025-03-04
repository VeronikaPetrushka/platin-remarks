import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, ImageBackground } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Tag = () => {
    const [tags, setTags] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [newTag, setNewTag] = useState("");
    const [selectedDelete, setSelectedDelete] = useState(null);

    useEffect(() => {
        const loadTags = async () => {
            try {
                const storedTags = await AsyncStorage.getItem("tags");
                if (storedTags) {
                    setTags(JSON.parse(storedTags));
                }
            } catch (error) {
                console.error("Failed to load tags:", error);
            }
        };
        loadTags();
    }, []);

    const handleDeleteSelect = (tag) => {
        if(selectedDelete) {
            setSelectedDelete(null)
        } else {
            setSelectedDelete(tag)
        }
    };

    const handleAddTag = async () => {
        if (newTag.trim()) {
            const newTagObj = { name: newTag.trim(), color: getRandomColor() };
            const updatedTags = [...tags, newTagObj];

            try {
                await AsyncStorage.setItem("tags", JSON.stringify(updatedTags));
                setTags(updatedTags);
            } catch (error) {
                console.error("Failed to save tag:", error);
            }

            setNewTag("");
            setInputVisible(false);
        }
    };

    const handleDeleteTag = async () => {
        if (!selectedDelete) return;
    
        const updatedTags = tags.filter(tag => tag !== selectedDelete);
    
        try {
            await AsyncStorage.setItem("tags", JSON.stringify(updatedTags));
            setTags(updatedTags);
            setSelectedDelete(null);
        } catch (error) {
            console.error("Failed to delete tag:", error);
        }
    };    

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={styles.upperContainer}>
                    <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                    <Text style={styles.upperText}>PLATIN REMARKS</Text>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Setup tags</Text>
                </View>

                <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20}}>

                    {tags.map((tag, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={[styles.tagBtn, 
                                { backgroundColor: tag.color },
                                selectedDelete === tag && {borderWidth: 3, borderColor: '#fdac03'}, 
                                ]}
                            onPress={() => handleDeleteSelect(tag)}
                            >
                            <Text style={styles.tagText}>{tag.name}</Text>
                        </TouchableOpacity>
                    ))}

                    {inputVisible && (
                        <>
                            <TextInput
                                style={styles.input}
                                value={newTag}
                                onChangeText={setNewTag}
                                autoFocus
                                placeholder="Enter tag"
                                placeholderTextColor="#000"
                            />
                            <TouchableOpacity  
                                style={[styles.saveBtn, !newTag && {opacity: 0.5}]}
                                onPress={handleAddTag}
                                disabled={!newTag}
                            >
                                <Icons type={'save'} />
                            </TouchableOpacity>
                        </>
                    )}

                    <TouchableOpacity 
                        style={[styles.settingsBtn, selectedDelete && {backgroundColor: '#ff3b30'}]} 
                        onPress={selectedDelete ? handleDeleteTag : () => setInputVisible(true)}
                        >
                        <Icons type={selectedDelete ? 'trash' : 'plus'} />
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
        paddingHorizontal: 31
    },

    upperContainer: {
        width: '100%',
        paddingTop: height * 0.07,
        paddingHorizontal: 42,
        paddingBottom: 23,
        backgroundColor: '#0d3046',
        borderWidth: 1,
        borderBottomColor: '#4b6392',
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    logo: {
        width: 45,
        height: 43,
        resizeMode: 'contain'
    },

    upperText: {
        fontSize: 22,
        fontWeight: '900',
        fontStyle: 'italic',
        lineHeight: 26.23,
        color: '#fff'
    },

    settingsBtn: {
        width: 54,
        height: 54,
        padding: 14,
        borderRadius: 14,
        borderColor: '#4b6392',
        borderWidth: 1,
        margin: 5
    },

    titleContainer: {
        width: '100%',
        padding: 18,
        backgroundColor: '#0d3046',
        borderColor: '#4b6392',
        borderWidth: 1,
        borderRadius: 22,
        marginBottom: 21,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.4,
        color: '#fff'
    },

    input: {
        paddingVertical: 17,
        paddingHorizontal: 36,
        borderRadius: 22,
        borderColor: '#4b6392',
        borderWidth: 1,
        margin: 5,
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.4,
    },

    tagBtn: {
        paddingVertical: 17,
        paddingHorizontal: 36,
        borderRadius: 22,
        margin: 5
    },

    tagText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.4,
        color: '#000'
    },

    saveBtn: {
        width: 54,
        height: 54,
        padding: 14,
        borderRadius: 14,
        backgroundColor: '#4788ff',
        margin: 5
    },

})

export default Tag;