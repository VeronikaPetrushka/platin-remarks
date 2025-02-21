import { View } from "react-native"
import First from "../components/First"

const FirstScreen = () => {
    return (
        <View style={styles.container}>
            <First />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default FirstScreen;