import React from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Input, Item, Button, Right, Thumbnail, Body, ListItem, Header, Icon, Left} from 'native-base';
import axios from 'axios';

export default class CarouselScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: true,
            categories_list: {},
            category_images: {
                Vegetais: 'https://img.icons8.com/cotton/100/000000/lettuce.png',
                Frutas: 'https://img.icons8.com/cotton/100/000000/avocado.png',
                Salgado: 'https://img.icons8.com/cotton/100/000000/wrap.png',
                Doces: 'https://img.icons8.com/cotton/100/000000/cupcake-with-a-berry.png',
                "Feito em Casa": 'https://img.icons8.com/cotton/100/000000/jam.png',
            }
        }
    }

    getData() {
      axios.get('https://food-miles.herokuapp.com/categories')
        .then(response => response.data)
        .then((response) =>  {
          this.setState({...this.state, loading: false, categories_list: response});
        })
        .catch((error) => {
          console.error(error);
        })
    }

    componentDidMount(){
      this.getData();
    }

    render() {
        return (
            <View style={styles.container}>

                <ActivityIndicator size="large" animating={this.state.loading} />
                <ScrollView horizontal>
                    {
                        Object.keys(this.state.categories_list).map((category) => (
                            <View key={category}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('ProductsList', {
                                        products_list: this.state.categories_list[category],
                                        category: category,
                                    })}>
                                    <Thumbnail source={{ uri: this.state.category_images[category]}} style={styles.v6}/>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>

            </View>
        );
    }
}

//ESTILOS PARA CADA UM DOS COMPONENTES
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F7ED',
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
});