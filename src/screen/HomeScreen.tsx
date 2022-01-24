import React, { Component, useEffect, useState } from 'react';
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


    const Post = useSelector((state: RootState) => state.post);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

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
        <View style={{backgroundColor:'#f8bbd0'}}>
            <StatusBar barStyle="light-content" backgroundColor={"#880e4f"}/>
            <View style={styles.header}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#3e2723'}}>HomeScreen</Text>
                <TouchableOpacity onPress={navigateFavScreen}>
                <Image 
                  source={{uri: 'https://www.freeiconspng.com/uploads/love-icon-15.png'}}
                  style={{width:60, height:60}}
                />
                </TouchableOpacity>
            </View>
            <View>
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
                            <View>
                                <TouchableOpacity 
                                    style={styles.product} 
                                    onPress={() => navigateDetailScreen(item.id)}
                                >
                                    <Image source={{uri: item.image}} style={styles.img}/>
                                    <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode={'tail'}>{item.title}</Text>
                                    <Text style={styles.productPrice} numberOfLines={1} ellipsizeMode={'tail'}>${item.price}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        
                    />
                    )
                }
            </View>
        </View>
    )
}

export default HomeScreen;

const styles =  StyleSheet.create({
  header:{
        display:'flex',
        flexDirection:'row',
        paddingVertical: 8,
        backgroundColor: '#f8bbd0',
        paddingHorizontal: 25,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemContainer: {
        padding: 10,
        display: 'flex',
    },
    product:{
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#f5f5f5', 
        borderRadius: 12,  
        width: 150,
        padding:10,
        height:165,
        resizeMode: 'cover',
        margin: 10,
        marginTop: 0,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#C9CCD5'
    },
    img:{
        width: 145, 
        height: 90, 
        resizeMode: 'contain'
    },
    productTitle:{
        width:'100%',
        textAlign: 'left',
        resizeMode: 'contain',
        color: '#171010'
    },
    productPrice:{
        paddingTop:3,
        textAlign: 'left',
        color: '#171010',
        fontWeight: 'bold'
    }
})

