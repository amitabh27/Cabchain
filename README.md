# Cabchain
Decentralized implementation of Cab Service which involves peer-to-peer networking and blockchain. 

# Technology Stack

<ul>
  <li>Node JS</li>
  <li>React Native</li>
  <li>Mongo DB</li>
  <li>Android</li>
  <li>Blockchain Network</li>
</ul>

# Platforms Used

<ul>
  <li>Heroku Cloud Service<br>
      <p><ul>
        <li
        <li>Admin Portal : https://cabchain.herokuapp.com</li>
        <li>REST Server : https://cabchain.herokuapp.com</li>
        <li>Authentication Server (Aadhaar Vahaan Replica) : https://serverauth.herokuapp.com</li>
      </ul></p>
   </li>
  <li>MLAB<br>
  <p><ul>
      <li>Mongo DB : Cabchain</li>
        <li>Mongo DB : AuthServer</li>
      </ul></p>
  </li>
   <li>Google Maps and Direction APIs</li>
  <li>Nexmo : Messaging APIs</li>
  <li>NodeMailer : Email APIs</li>
   <li>Hyperledger Composer REST Server</li>
   <li>Ngrok : For tunneling to Composer Server (https://31032026.ngrok.io)</li>
</ul>


# Architecture

![architecture](https://github.com/amitabh27/Cabchain/blob/master/images/archi.jpg)

# Working of Apps : User and Driver app

![Customer App](https://github.com/amitabh27/Cabchain/blob/master/images/usergif.gif) ![Driver App](https://github.com/amitabh27/Cabchain/blob/master/images/drivergif.gif)


# APIs available 

<ul>
  <li>serverauth.herokuapp.com<br>
    <ul>
      <li>/aadhaar/:number/:name/:gender/:dob/:address</li>
      <li>/vahaan/:number/:chassis/:enginenumber</li>
    </ul>
  </li>
  <li>cabchain.herokuapp.com  <a href="https://github.com/amitabh27/Cabchain/blob/master/cabchain-NodeJS-REST-Server/routes/users.js">Link to Code</a><br>
    <ul>
      <li>/register</li>
      <li>/login</li>
      <li>/fareupdate</li>
      <li>/contact</li>
      <li>/details</li>
      <li>/register</li>
      <li>/login</li>
      <li>/logout</li>
      <li>/userredirection-pickup/:ridetrackingno</li>
      <li>/userredirection-finish/:ridetrackingno</li>
      <li>/updatedriverratings/:driverno/:overallrating/:behaviour/:drivingskills/:timelypickupdrop/:conditionofvehicle</li>
      <li>/updateuserratings/:userno/:overallrating/:behaviour/:ridetrackingno</li>
      <li>/matchotp/:ridetrackingno/:otp</li>
      <li>/suggestionstousers/:ridetrackingno/:sortby/:ridetype</li>
      <li>/ridereject/:ridetrackingno/:driverno</li>
       <li>/rideaccept/:ridetrackingno/:driverno</li>
       <li>/driverquote/:driver/:ridetrackingno/:quote</li>
       <li>/newrequests-driversuggestion/:phone</li>
       <li>/riderequestplaced/:userid/:ridetrackingno/:addressSP/:addressEP/:gpsSP/:gpsEP/:fare/:distance/:otp</li>
       <li>/getdriverlocations</li>
       <li>/promotionalsms/:name/:phone/:receiverphone</li>
       <li>/previousrides/:mobile</li>
       <li>/driver-location/:mobile</li>
       <li>/driver-previousrides/:mobile</li>
       <li>/getUsername/:phone</li>
       <li>/ratecard/:city</li>
       <li>/userOTPLogin/:phone/:otp</li>
       <li>/useradd/:phone/:email/:name</li>
       <li>/userlogin/:phone</li>
       <li>/userratings/:phone</li>
       <li>/driverratings/:phone</li>
       <li>/driverlogin/:phone</li>
       <li>/fare-computation-government-rates/:src/:dest</li>
       <li>/olafare/:src/:dest/:type</li>
       <li>/otpgeneration</li>
       <li>/support/:email/:name/:query</li>
       <li>/rideotp/:requestID</li>
       <li>/sendinvoice/:requestID</li>
      <li>/smsinvoice/:requestID</li>
    </ul>
  </li>
  <li>ngrok.io<br>
    <ul>
      <li>/api/driver/driverid</li>
      <li>/api/Ride</li>
      <li>/api/user/</li>
    </ul>
  </li>
  
</ul>






















