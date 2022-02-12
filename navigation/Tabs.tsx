import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image, StyleSheet, View } from 'react-native';
import CryptoVal from '../screens/CryptoVal';
import Home from '../screens/Home';


const Tab = createBottomTabNavigator();


const Tabs = () => {


    return (
        <Tab.Navigator screenOptions={{

            tabBarShowLabel: true,
            tabBarStyle: {
                height: 60,
                marginLeft: 20,
                marginRight: 20,
                bottom: 25,
                borderRadius: 40,
                ...styles.shodow
            }
        }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: () => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../assets/icon/cryptocurrency-computer.png')}
                            style={{
                                width: 37,
                                height: 37
                            }}
                        />
                    </View>
                ),
            }} />
            <Tab.Screen name="Crytos value" component={CryptoVal} options={{
                tabBarIcon: () => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../assets/icon/calculator_icon.png')}
                            style={{
                                width: 37,
                                height: 37
                            }}
                        />
                    </View>
                ),
            }} />
        </Tab.Navigator>
    )
}

export default Tabs;


const styles = StyleSheet.create({
    shodow: {
        shadowColor: "#7F5DF0",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5

    }
})