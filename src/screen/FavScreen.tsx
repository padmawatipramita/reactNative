import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { deleteFav } from '../store/Fav';

const FavScreen = () => {
    const Fav = useSelector((state: RootState) => state.fav);
    const dispatch = useDispatch();
    return(
        <View style={{backgroundColor:'#f8bbd0', flex: 1}}>
            <StatusBar barStyle="light-content" backgroundColor={"#880e4f"}/>
            <View style={styles.header}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#3e2723'}}>FavoriteScreen</Text>
            </View>
        <View>
             <FlatList
                style={styles.itemContainer}
              
                data = {Fav.fav}
                renderItem={({item}) => (
                <View style={styles.product}>
                        <Image source={{uri: item.image}} style={styles.img}/>
                        <Text style={styles.productTitle} numberOfLines={4} ellipsizeMode={'tail'}>{item.title}</Text>
                        <TouchableOpacity onPress={()=> dispatch(deleteFav(item))}>
                            <Image source={{uri: 'https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png'}} style={styles.trashIcon}></Image>
                        </TouchableOpacity>
                </View>                
                    )   
                }        
            />
            
           
        </View>
        </View>
    )
    
}

export default FavScreen


const styles =  StyleSheet.create({ 
    header:{
          display:'flex',
          flexDirection:'row',
          paddingVertical: 20,
          backgroundColor: '#f8bbd0',
          paddingHorizontal: 25,
          justifyContent: 'space-between',
          alignItems: 'center'
      },
      itemContainer: {
        padding: 10,
        display: 'flex'
      },
      product:{
          backgroundColor: '#f5f5f5', 
          borderRadius: 12, 
          paddingTop: 10,
          paddingBottom: 10,
          resizeMode: 'cover',
          width: '75%',
          margin: 10,
          marginTop: 0,
          elevation: 5,
          borderWidth: 1,
          borderColor: '#C9CCD5',
          display:'flex',
          flexDirection:'row',
          
      },
      img:{
          width: 145, 
          height: 90, 
          resizeMode: 'contain'
      },
      productTitle:{
          width:'35%',
          textAlign: 'left',
          resizeMode: 'contain',
          color: '#171010'
      },
      trashIcon:{
          marginLeft: 45,
          marginTop: 20,   
          width: 40, 
          height: 50
      }
  })
  
  