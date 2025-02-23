import { View } from "react-native"
import Add from "../components/Add"
import Menu from "../components/Menu";

const AddScreen = ({ route }) => {
    const type = route?.params?.type || 'Quick note';

    return (
        <View style={styles.container}>
            <Add type={type} />
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

export default AddScreen;