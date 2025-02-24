import { View } from "react-native"
import Game from "../components/Game"
import Menu from "../components/Menu";

const GameScreen = () => {
    return (
        <View style={styles.container}>
            <Game />
            <View style={styles.menu}>
                <Menu />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        bottom: 35,
        left: 0,
        right: 0
    }
}

export default GameScreen;