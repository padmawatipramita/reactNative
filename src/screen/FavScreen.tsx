import { useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, StatusBar, Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { RootState } from '../store';
import { deleteFav } from '../store/Fav';

const FavScreen = () => {
    const Fav = useSelector((state: RootState) => state.fav);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'FavScreen'>>();
    const dispatch = useDispatch();
    return(
        <View style={styles.base}>
            <StatusBar barStyle="light-content" backgroundColor={"#3700b3"}/>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {navigation.navigate("HomeScreen")}}>
                    <Image source={require('./../image/arrowBack.png')} style={{width: 30, height: 20}}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>My Favorite</Text>
            </View>
            <View style={{marginBottom: 75}}>
                <FlatList
                    style={styles.itemContainer}
                    data = {Fav.fav}
                    renderItem={({item}) => (
                    <View style={styles.product}>
                        <Image source={{uri: item.image}} style={styles.img}/>
                        <Text style={styles.productTitle} numberOfLines={4} ellipsizeMode={'tail'}>{item.title}</Text>
                        <TouchableOpacity onPress={()=> {
                             Alert.alert('Confirm', 'Remove from Favorite?', 
                            [
                                {text: 'Cancel'},
                                {text: 'Confirm', onPress: () => dispatch(deleteFav(item))}
                            ]
                        )}}>
                            <Image source={{uri: 'https://www.freepnglogos.com/uploads/heart-png/emoji-heart-33.png'}} style={styles.unfavoriteIcon}></Image>
                        </TouchableOpacity>
                    </View>                
                    )}        
                />
            </View>
        </View>
    )
    
}

export default FavScreen

const styles =  StyleSheet.create({ 
    base:{
        backgroundColor: '#FFFFFF', 
        flex: 1,
    },
    header:{
        flexDirection:'row',
        paddingVertical: 15,
        backgroundColor: '#6200EE',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    headerText:{
        fontWeight: 'bold', 
        fontSize: 20, 
        color: '#FFFFFF'
    },
    arrowIcon:{
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    itemContainer: {
        padding: 10
    },
    product:{
        backgroundColor: '#FFFFFF', 
        borderRadius: 12, 
        paddingTop: 10,
        paddingBottom: 10,
        resizeMode: 'cover',
        width: '95%',
        margin: 10,
        marginTop: 0,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#C9CCD5',
        flexDirection:'row',  
    },
    img:{
        width: 145, 
        height: 100, 
        resizeMode: 'contain',
        justifyContent: 'center'
    },
    productTitle:{
        width:'40%',
        textAlign: 'left',
        resizeMode: 'contain',
        color: '#171010'
    },
    unfavoriteIcon:{
        width: 35, 
        height: 30,
        marginTop: 80,
    }
})  