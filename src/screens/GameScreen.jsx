import { View } from "react-native"
import Game from "../components/Game"

const GameScreen = () => {
    return (
        <View style={styles.container}>
            <Game />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default GameScreen;