import { View } from "react-native"
import Tag from "../components/Tag"
import Menu from "../components/Menu";

const TagScreen = () => {
    return (
        <View style={styles.container}>
            <Tag />
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

export default TagScreen;