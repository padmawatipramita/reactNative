import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import axios from 'axios';
import { PostItem } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { savePost} from '../store/Post';
import { RootState } from '../store';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList} from '../navigation/RootStackParamList';

const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>>();
    const Post = useSelector((state: RootState) => state.post);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() =>{
        Posts();
    }, [])
    
    const navigateDetailScreen = (id: number) => {
        navigation.navigate("DetailScreen", {
           id : id
        })
    }

    const navigateFavScreen = () => {
        navigation.navigate("FavScreen")
    }

    const Posts = async () =>{
        try{
            setLoading(true);
            const url = 'https://fakestoreapi.com/products';
            const res = await axios.get<PostItem[]>(url);
            dispatch(savePost(res.data));
        }catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.base}>
            <StatusBar barStyle="light-content" backgroundColor={"#3700b3"}/>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Home</Text>
                <TouchableOpacity onPress={navigateFavScreen}>
                    <Image source={require('./../image/heart.png')} style={{width: 80, height:60}}/>
                </TouchableOpacity>
            </View>
            <View style={{marginBottom: 75}}>
                {
                    loading?(
                        <View>
                            <ActivityIndicator size="large" color="#880e4f"/>
                        </View>
                    ):(        
                        <FlatList
                            style={styles.itemContainer}
                            numColumns={2}
                            data = {Post.posts}
                            renderItem={({item}) => (
                            <View style={{marginBottom:10}}>
                                <TouchableOpacity style={styles.product} onPress={() => navigateDetailScreen(item.id)}>
                                    <Image source={{uri: item.image}} style={styles.img}/>
                                    <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode={'tail'}>{item.title}</Text>
                                    <Text style={styles.productPrice} numberOfLines={1} ellipsizeMode={'tail'}>${item.price}</Text>
                                </TouchableOpacity>
                            </View>
                            )}
                        />
                    )}
            </View>
        </View>
    )
}

export default HomeScreen;

const styles =  StyleSheet.create({
    base:{
        backgroundColor:'#FFFFFF',
        flex: 1
    },
    header:{
        flexDirection:'row',
        paddingVertical: 2,
        backgroundColor: '#6200EE',
        paddingHorizontal: 25,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textHeader:{
        fontWeight: 'bold', 
        fontSize: 20, 
        color: 'white'
    },
    itemContainer:{
        padding: 10,
    },
    product:{
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#FFFFFF', 
        borderRadius: 8,  
        width: 150,
        padding: 10,
        elevation: 10,
        height: 165,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
        marginBottom: 0,
        borderWidth: 1,
        borderColor: '#C9CCD5',
    },
    img:{
        width: 145, 
        height: 90, 
        resizeMode: 'contain'
    },
    productTitle:{
        width:'100%',
        textAlign: 'left',
        color: '#171010'
    },
    productPrice:{
        width:'100%',
        color: '#171010',
        fontWeight: 'bold'
    }
})