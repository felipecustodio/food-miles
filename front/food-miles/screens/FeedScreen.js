import React from 'react';
import { Input, Item, Right, Thumbnail, Body, ListItem, StyleProvider, Container, Header, Content, Card, CardItem, Icon, Left} from 'native-base';
import {View, ScrollView,  StyleSheet,  Text} from 'react-native';
import { Formik} from 'formik';
import { SearchBar, ThemeProvider } from 'react-native-elements';
import SearchResults from '../components/SearchResults'
import CarouselScreen from './CarouselScreen'
import axios from 'axios'
import ShopScreen from './ShopScreen'

export default class FeedScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    
		this.state = {
      search: '',
      search_results: '',
      results_screen: false,
      stores: {"0": [{"category": "Salgados", "description": "Caf\u00e9 da manh\u00e3 saud\u00e1vel", "name": "P\u00e3o Frances", "picture_url": "data:image/jpeg;base64,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", "price": 5, "seller_email": "stenico.camila@gmail.com", "seller_name": "Camila", "seller_picture": "https://scontent.faqa1-1.fna.fbcdn.net/v/t1.0-9/46514363_2360696830624962_2957390299636170752_n.jpg?_nc_cat=104&_nc_eui2=AeGN6pqGLnxhxIyBzQV9mnKLz1n-ZEju3gAzWPihHU6I4zvstcDMbkdPKqlmssjaVo0kjxEsosdOwBJtIGYBgBQ01YN858wHAbzTYVTrz6RrYw&_nc_oc=AQkb47495E4otQoVUBNPoeThrBMVO9b0eAaqXpLvsRHI4EqTNX_z5T4H1FnlmDXBKqI&_nc_ht=scontent.faqa1-1.fna&oh=b885ee8e5e7b98db7a301ed2905610c1&oe=5DBA24FA"}, {"category": "Doces", "description": "Quem n\u00e3o ama?", "name": "Brigadeiro", "picture_url": "https://img.elo7.com.br/product/zoom/19B2F15/brigadeiro-para-festa-pote-1-kg-faz-200-brigadeiro.jpg", "price": 10, "seller_email": "graciane@barbosa.com", "seller_name": "Graciane Barbosa", "seller_picture": "https://cdn-ofuxico.akamaized.net/img/upload/noticias/2019/02/19/gracynne_barbosa_342893_36.jpg"}, {"category": "Feito em Casa", "description": "Quem n\u00e3o ama?", "name": "Brigadeiro", "picture_url": "https://img.elo7.com.br/product/zoom/19B2F15/brigadeiro-para-festa-pote-1-kg-faz-200-brigadeiro.jpg", "price": 10, "seller_email": "graciane@barbosa.com", "seller_name": "Graciane Barbosa", "seller_picture": "https://cdn-ofuxico.akamaized.net/img/upload/noticias/2019/02/19/gracynne_barbosa_342893_36.jpg"}, {"category": "Vegetais", "description": "Quem n\u00e3o ama", "name": "Br\u00f3colis Nativo", "picture_url": "https://www.infoescola.com/wp-content/uploads/2010/08/brocolis.jpg", "price": 7, "seller_email": "graciane@barbosa.com", "seller_name": "Graciane Barbosa", "seller_picture": "https://cdn-ofuxico.akamaized.net/img/upload/noticias/2019/02/19/gracynne_barbosa_342893_36.jpg"}, {"category": "Frutas", "description": "Ma\u00e7\u00e3 deliciosa!", "name": "Ma\u00e7\u00e3", "picture_url": "https://img.itdg.com.br/tdg/images/blog/uploads/2017/05/shutterstock_290834552.jpg", "price": "100", "seller_email": "kasama@justus.com", "seller_name": "Justus", "seller_picture": "https://pbs.twimg.com/profile_images/1035371242881265664/jwbIlX-2.jpg"}]},
      loading: true
		}
  }

  getData(){
      axios.get('https://food-miles-dev-filao.herokuapp.com/stores')
        .then(response => response.data)
        .then((response) =>  {
          this.setState({...this.state, loading: false, stores: response});
        })
        .catch((error) => {
          console.error(error);
        })
  }

  updateSearch = search => {
    this.setState({ search });
    if(this.state.search.length <= 3){
      this.setState({results_screen: false})
    }else{    
      fetch('https://food-miles-dev-filao.herokuapp.com/search?search=' + this.state.search)
      .then((data) => {
        return data.json();
      }).then((response) => {
        this.setState({search_results: response, results_screen: true})
      });
    }
  };

  componentDidMount(){
    this.getData();
  }
  render() {
    //this.getData();

    const { navigation } = this.props;


    if(this.state.results_screen){
      return (
        <View style={ styles.container }>
          <Content contentContainerStyle ={{paddingTop: 10,paddingHorizontal: 10}}>
            <View style={styles.v5}>
              <Text> </Text>
            </View>
            <ListItem transparent avatar>
              <Left>
                  <Thumbnail source={{ uri: 'https://i.imgur.com/WJOAW4E.png' }} />
              </Left>
              <Body>
                  <Text> </Text>
                  <Text note> </Text>
              </Body>
              <Right>
                  <Thumbnail source={{ uri: 'https://i.imgur.com/vlNOtMM.png' }} />
              </Right>
            </ListItem>
            <SearchBar
              round
              searchIcon={{ size: 24 }}
              placeholder="Buscar produtos e lojinhas"
              containerStyle={styles.searchContainer}
              inputStyle={[styles.text,{fontSize: 12}]}
              inputContainerStyle={styles.searchInputContainer}
              onChangeText={this.updateSearch}
              value={this.state.search}
            />
            <Content>
                <SearchResults results={this.state.search_results} />
            </Content>
          </Content>
        </View>
      );
    }else{
      return (
        <ScrollView>
        <View style={ styles.container }>

          <Content contentContainerStyle ={{paddingTop: 10, paddingHorizontal: 10}}>
            <View style={styles.v5}>
              <Text> </Text>
            </View>
            <ListItem transparent avatar>
              <Left>
                  <Thumbnail source={{ uri: 'https://i.imgur.com/WJOAW4E.png' }} />
              </Left>
              <Body>
                  <Text> </Text>
                  <Text note> </Text>
              </Body>
              <Right>
                  <Thumbnail source={{ uri: 'https://i.imgur.com/vlNOtMM.png' }} />
              </Right>
            </ListItem>
  
            <SearchBar
              round
              searchIcon={{ size: 24 }}
              placeholder="Buscar produtos e lojinhas"
              containerStyle={styles.searchContainer}
              inputStyle={[styles.text,{fontSize: 12}]}
              inputContainerStyle={styles.searchInputContainer}
              onChangeText={this.updateSearch}
              value={this.state.search}
            />

          </Content>
          <CarouselScreen navigation={navigation} />
          {Object.keys(this.state.stores).map(product => (
              <ShopScreen navigation={navigation} key={this.state.stores[product][0].seller_name} seller_name={this.state.stores[product][0].seller_name} seller_picture={this.state.stores[product][0].seller_url} seller_email={this.state.stores[product][0].seller_email} >
              </ShopScreen>
          ))}
        </View>
        </ScrollView>
      );
    }
  }
}

var styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F4F7ED'
  },
  submitButton:{
    backgroundColor: '#7fa99b',
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:15,
    marginRight:15,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#7fa99b'
  },
  textButton: {
    fontFamily: 'Arvo',
    textAlign: 'center',
    color: '#FBF2D5'
  },
  link:{
    fontFamily: 'Arvo',
    textAlign: 'center',
    color:'#7fa99b'
  }, 
  logo: {
    width:'60%',
    height: '60%'
  },
  userIcon: {
    position: "absolute",
    top: 60,
    right: 20,
    flex: 1,
    width: 40, 
    height: 40, 
    resizeMode: 'contain'  
  },
  searchContainer: {
    position: "relative",
    right: 10,
    width: 360,
    backgroundColor:'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  searchInputContainer: {
    backgroundColor: '#bdd2c6'
  },
v1: {
    height: 80,
    width: 80,
    backgroundColor: '#F4F7ED',
},
v2: {
    flex: 1,
    color: '#7FA99B',
    justifyContent: 'center',
    alignItems: 'center',
},
v4: {
    height: 44,
    width: 385,
    backgroundColor: '#7FA99B',
    borderRadius: 30,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
},
v5: {
    color: '#7FA99B',
},
v6: {
    height: 120,
    width: 120,
    borderColor: '#FFD54D',
    borderRadius: 90,
    margin: 30,
    borderWidth: 4,
},
v7: {
    height: 80,
    width: 80,
},
MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  GooglePlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },

  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },

  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },

  TextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginRight: 20,
  },

  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
});
