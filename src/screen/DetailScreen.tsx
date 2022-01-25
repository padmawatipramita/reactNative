import { RouteProp, useRoute } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { PostItem } from '../../interfaces'
import { RootStackParamList} from '../navigation/RootStackParamList'
import { RootState } from '../store'
import Fav, { addFav, deleteFav} from '../store/Fav'
import { useNavigation } from '@react-navigation/core';


const DetailScreen = () => {
    useEffect(() =>{
        Posts();
    }, [])

    const route = useRoute<RouteProp<RootStackParamList, 'DetailScreen'>>();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'DetailScreen'>>();
    const [loading, setLoading] = useState(false);
    const {id} = route.params;
    const Fav = useSelector((state: RootState) => state.fav);
    const dispatch = useDispatch();
    
    const [product, setProduct] = useState<any>({
        item: null
      });
    
    const isFavourite = (item:PostItem) =>{
        const index = Fav.fav.findIndex(favs => favs.id === item.id);
        if (index != -1) return true
        else return false   
    }
    const Posts = async () =>{
        try{
            setLoading(true);
            const url = 'https://fakestoreapi.com/products/' + id;
            const res = await axios.get<PostItem>(url);
            setProduct(res.data);
        }catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    if(loading){
         return (
             <View>
                 <ActivityIndicator size="large" color="#880e4f"/>
             </View>
         )
    }
    return(
         <View style={styles.base}>
            <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.arrowNav} onPress={() => { navigation.navigate("HomeScreen")}}>
                    <Image source={{uri:'https://freepikpsd.com/file/2019/10/arrow-left-png-6-Transparent-Images.png'}} style={styles.arrowImg}/> 
                </TouchableOpacity>
                <Image source={{uri: product.image}} style={styles.img}/> 
            </View>  
            <ScrollView>
                <View style={styles.paddingView}>
                    <Text style={styles.price}>${product.price}</Text>
                    <Text style={styles.text}>{product.title}</Text>  
                </View>
                <View style={{paddingHorizontal: 20}}>    
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>   
                <View style={styles.buttonView}>
                    {
                        isFavourite(product) ? 
                            <TouchableOpacity style={styles.button} onPress={()=> dispatch(deleteFav(product))}>
                                <Text style={styles.texButton}>Remove from Favorite     &#x2661;</Text>
                            </TouchableOpacity> 
                        :  
                            <TouchableOpacity style={styles.button} onPress={()=> dispatch(addFav(product))}>
                                <Text style={styles.texButton}>Add to Favorite     &#x2661;</Text>
                            </TouchableOpacity>
                    }
                </View> 
        </View>                
    )
}

export default DetailScreen

const styles =  StyleSheet.create({
    itemContainer: {
        padding: 10,
    },
    base:{
        flex: 1,
        backgroundColor: 'white'
    },
    arrowNav:{
        marginLeft: -300
    },
    arrowImg:{
        width: 35, 
        height: 28
    },
    img:{
        width: 300, 
        height: 300,
        resizeMode: 'contain'
    },
    imageContainer:{
        alignItems: 'center', 
        justifyContent: 'center',
        height: 400,
    },
    paddingView:{
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    text:{
        fontWeight: '600',
        fontSize: 15,  
        color:'black',
        paddingTop: 8
    },
    price:{
        fontWeight: 'bold',
        fontSize: 25, 
        color:'black',
    },
    description:{
        textAlign: 'justify',
        fontSize: 15,
        lineHeight: 18,
        color:'black',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#6200EE",
        padding: 15,
        borderRadius: 30
    },
    texButton:{
        color:'white', 
        fontWeight: 'bold', 
        letterSpacing: 1.5
    },
    buttonView:{
        paddingBottom: 15,
        paddingTop: 2,
        paddingHorizontal: 25
    }
})
