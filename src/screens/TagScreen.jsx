import { View } from "react-native"
import Tag from "../components/Tag"

const TagScreen = () => {
    return (
        <View style={styles.container}>
            <Tag />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default TagScreen;