import { RouteProp, useRoute } from '@react-navigation/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { PostItem } from '../../interfaces'
import { RootStackParamList} from '../navigation/RootStackParamList'
import { RootState } from '../store'
import Fav, { addFav, deleteFav} from '../store/Fav'


const DetailScreen = () => {
    useEffect(() =>{
        Posts();
    }, [])
    const route = useRoute<RouteProp<RootStackParamList, 'DetailScreen'>>();
    const [loading, setLoading] = useState(false);
    const {id} = route.params;
    const dispatch = useDispatch();
    const [product, setProduct] = useState<any>({
        item: null
      });

    const addFavorite = () => {
        
    }

     const removeFavorite = () => {
        
      
    }
    const Fav = useSelector((state: RootState) => state.fav);

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
                                    <Text style={{color:'white', fontWeight: 'bold', letterSpacing: 1.5}}>Remove from Favorite     &#x2661;</Text>
                                </TouchableOpacity> 
                            :  
                            <TouchableOpacity style={styles.button} onPress={()=> dispatch(addFav(product))}>
                                <Text style={{color:'white', fontWeight: 'bold', letterSpacing: 1.5}}>Add to Favorite     &#x2661;</Text>
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
        display: 'flex',
    },
    base:{
        display: "flex",
        flex: 1,
        backgroundColor: '#f8bbd0'
    },
    img:{
        width: 300, 
        height: 300,
        resizeMode: 'contain'
    },
    imageContainer:{
        alignItems: 'center', 
        justifyContent: 'center',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        backgroundColor: 'white',
        height: 400,
        elevation: 20
    },
    paddingView:{
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    text:{
        fontWeight: '600',
        fontSize: 15,  
        color:'#171010',
        paddingTop: 8
    },
    price:{
        fontWeight: 'bold',
        fontSize: 25, 
        color: "#171010"
    },
    description:{
        textAlign: 'justify',
        fontSize: 15,
        lineHeight: 18
    },

    button: {
        alignItems: "center",
        backgroundColor: "#880e4f",
        padding: 15,
        borderRadius: 30
    },
    buttonView:{
        paddingBottom: 15,
        paddingTop: 2,
        paddingHorizontal: 25
    }
})
  