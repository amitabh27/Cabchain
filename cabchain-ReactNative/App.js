import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TextInput, View, Alert, Button, Text} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MapView from 'react-native-maps';



 

/*import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: Failed prop type',
]);*/
 

 
 
export default class LoginActivity extends React.Component {

  static navigationOptions =
   {
      title: 'LoginActivity',
   };
 
constructor(props) {
 
    super(props)
 
    this.state = {
 
      UserPhone: ''
 
    }
 
  }
 
  render() {
	  
	const { navigate } = this.props.navigation;
	  const { UserPhone }  = this.state ;
	
	   
    return (
 
<View style={styles.MainContainer}>
 
       <Text style= {styles.TextComponentStyle}>User Login</Text>
  
        <TextInput

          placeholder="Enter User Phone"
 
          onChangeText={UserPhone => this.setState({UserPhone})}

          underlineColorAndroid='transparent'
 
          style={styles.TextInputStyleClass}
        />
        <Button title="Login" onPress={() => 
		
				fetch('https://cabchain.herokuapp.com/users/userlogin/'+UserPhone).then((response) => response.json())
					  .then((responseJson) => {

					   if(responseJson == 'match')
						{

						  navigate('Third', { Phone: UserPhone });

						}
						else{

							 navigate('Second', { Phone: UserPhone });
						}

					  }).catch((error) => {
						console.error(error);
					  })
				
				
				}
		color="#2196F3" />
      

 
</View>
            
    );
  }
}

// Taking Name,email from user and storing it in DB as new user.

class ProfileActivity extends React.Component
{

  // Setting up profile activity title.
   static navigationOptions =
   {
      title: 'ProfileActivity',
    
   };
   
   constructor(props) {
 
    super(props)
 
    this.state = {
 
      UserName: '',
	  UserEmail:'',
	  UserPhone:this.props.navigation.state.params.Phone
	  //,UserPhone:this.Phone
 
    }
 
  }
    

   render()
   {

     const {goBack} = this.props.navigation;
	 const { navigate } = this.props.navigation;
	 const { UserName }  = this.state ;
	 const { UserEmail }  = this.state ;
	 const { UserPhone }  = this.state ;

      return(
         <View style = { styles.MainContainer }>
 
            <Text style = {styles.TextComponentStyle}> User Details </Text>

					<TextInput
					  placeholder="Enter User Name"
			 
					  onChangeText={UserName => this.setState({UserName})}
					  underlineColorAndroid='transparent'
			 
					  style={styles.TextInputStyleClass}
					/>
					<TextInput

					  placeholder="Enter User Email"
			 
					  onChangeText={UserEmail => this.setState({UserEmail})}
					  underlineColorAndroid='transparent'
			 
					  style={styles.TextInputStyleClass}
					/>
					<Button title="Submit" onPress={() =>
					
					
						fetch('https://cabchain.herokuapp.com/users/useradd/'+UserPhone+'/'+UserEmail+'/'+UserName).then((response) => response.json())
							  .then((responseJson) => {

								// If server response message same as Data Matched
							   if(responseJson === 'done')
								{

									//Then open Main page for booking ride
								   navigate('Fourth', { Phone: UserPhone });

								}
								else{

									 console.log("error failed");
								}

							  }).catch((error) => {
								console.error(error);
						  })
					
					
					
					
					
					} 
					color="#2196F3" />
 
         </View>
      );
   }
   
   

}




class OTPExistingUserActivity extends React.Component
{

  // Setting up profile activity title.
   static navigationOptions =
   {
      title: 'ProfileActivity',
    
   };
   
   constructor(props) {
 
    super(props)
 
    this.state = {

	  //UserPhone:this.Phone,
	  UserPhone:this.props.navigation.state.params.Phone,
	  UserOTP:''
 
    }
 
  }
    

   render()
   {

     const {goBack} = this.props.navigation;
	 const { navigate } = this.props.navigation;
	 const { UserOTP }  = this.state ;
	 const { UserPhone }  = this.state ;

      return(
         <View style = { styles.MainContainer }>
 
            <Text style = {styles.TextComponentStyle}> Verification code </Text>

					<TextInput
					  placeholder="Enter 6-digit OTP "
			 
					  onChangeText={UserOTP => this.setState({UserOTP})}
					  underlineColorAndroid='transparent'
			 
					  style={styles.TextInputStyleClass}
					/>

					<Button title="Verify" onPress={() =>
					
								fetch('https://cabchain.herokuapp.com/users/userOTPLogin/'+UserPhone+'/'+UserOTP).then((response) => response.json())
									  .then((responseJson) => {

										// If server response message same as Data Matched
									   if(responseJson === 'match')
										{

											//Then open Main page for booking ride
										   navigate('Fourth', { Phone: UserPhone });

										}
										else{

											 Alert.alert(
														  'Login Failed',
														  'Please enter valid OTP',
														  [
															{text: 'OK'},
														  ],
														  { cancelable: false }
														)
										}

									  }).catch((error) => {
										console.error(error);
									  })
					
					
					
					} 
					color="#2196F3" />
 
         </View>
      );
   }
   

}





class HomeActivity extends React.Component
{

	  // Setting up profile activity title.
	   static navigationOptions =
	   {
		  title: 'HomeActivity',
		
	   };

    

   render()
   {

     const {goBack} = this.props.navigation;

      return(
         <View style = { styles.MainContainer }>
 
					//<Button title="Volla Logged In! " color="#2196F3" />
					<MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
 
         </View>
      );
   }
   
   
 
 
}









const cabchain = StackNavigator(
{
   First: { screen: LoginActivity },
   
   Second: { screen: ProfileActivity },
   
   Third: { screen: OTPExistingUserActivity },
   
   Fourth: { screen: HomeActivity }

});


























 
const styles = StyleSheet.create({
 
MainContainer :{
 
justifyContent: 'center',
flex:1,
margin: 10,
},
 
TextInputStyleClass: {
 
textAlign: 'center',
marginBottom: 7,
height: 40,
borderWidth: 1,
// Set border Hex Color Code Here.
 borderColor: '#2196F3',
 
 // Set border Radius.
 borderRadius: 5 ,

},

 TextComponentStyle: {
   fontSize: 20,
  color: "#000",
  textAlign: 'center', 
  marginBottom: 15
 },
 container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});
 
AppRegistry.registerComponent('cabchain', () => cabchain);