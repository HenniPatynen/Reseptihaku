import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import { Button, FlatList, Image } from 'react-native';

export default function App() {

  const [reseptit, setReseptit] = useState([]);
  const [keyword, setKeyword]=useState("");

  const getReseptit = () => {  
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)  
    .then(response => response.json())  
    .then(data => setReseptit(data.meals))  
    .catch(error => {         
        Alert.alert('Error', error);   
      });
    }

  return (
    <View style={styles.container}>

       <TextInput
      style={{fontSize:18, width: 200, borderColor: 'black', borderWidth:2}}
      onChangeText={text=> setKeyword(text)}
      value={keyword}/>

      <Button title="Hae reseptit" onPress={getReseptit}/>

      <FlatList
      keyExtractor={(item,index) => index.toString()}
      renderItem={({item}) =>
      <View>
          <Text 
            style={{fontSize:20, fontWeight: "bold"}}>{item.strMeal}
          </Text>
          <Image
          style={styles.kuva}
          source={{uri: item.strMealThumb}}/>
            </View>}  
        data={reseptit} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  },
  kuva: {
    width: 150,
    height: 150,
    margin: 20
  }
});
