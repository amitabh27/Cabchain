package com.example.kulka.cabchain_partner;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.location.Location;
import android.location.LocationListener;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.places.Place;
import com.google.android.gms.location.places.ui.PlaceSelectionListener;
import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.LatLngBounds;
import com.google.android.gms.maps.model.MapStyleOptions;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;

import org.json.JSONArray;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class RideStart extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener,PlaceSelectionListener,OnMapReadyCallback,LocationListener,GoogleApiClient.ConnectionCallbacks,GoogleApiClient.OnConnectionFailedListener
{


    String phone,username,email,ridetrackingno,GPSstart,GPSend,userphone,customername,driverlatitude,driverlongitude,gpsstart,gpsend,fare,time,distance;
    LatLng source,dest;
    private GoogleMap nMap;
    MapView nmapview;
    GoogleMap mGoogleMap;
    SupportMapFragment mapFrag;
    LocationRequest mLocationRequest;
    GoogleApiClient mGoogleApiClient;
    Location mLastLocation;
    Marker mCurrLocationMarker;
    Polyline line;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ride_start);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolBar);
        setSupportActionBar(toolbar);

        Log.d("Here!!","before initialization" );


        phone = getIntent().getStringExtra("Phone");
        username = getIntent().getStringExtra("Username");
        email = getIntent().getStringExtra("Email");
        ridetrackingno=getIntent().getStringExtra("RideTrackingNo");
        GPSstart=getIntent().getStringExtra("GPSstart");
        GPSend=getIntent().getStringExtra("GPSend");
        userphone=getIntent().getStringExtra("UserPhone");
        driverlatitude=getIntent().getStringExtra("driverlatitude");
        driverlongitude=getIntent().getStringExtra("driverlongitude");
        distance=getIntent().getStringExtra("distance");
        time=getIntent().getStringExtra("time");
        fare=getIntent().getStringExtra("fare");

        Log.d("RIDE START ACTIVITY",fare+"/"+distance);
        double latitude=Double.parseDouble(GPSstart.substring(0,GPSstart.indexOf(" ")));
        double longitude=Double.parseDouble(GPSstart.substring(GPSstart.indexOf(" ")+1));

        Log.d("GPSSTART",GPSend);


        String myurl="https://maps.googleapis.com/maps/api/directions/json?origin="+driverlatitude+","+driverlongitude+"&destination="+latitude+","+longitude+"&sensor=false&mode=driving&alternatives=true&key=DIRECTIONAPIKEY"; // Put your own api key here

        HttpGetRequest getRequest = new HttpGetRequest();
        try{
            String result = getRequest.execute(myurl).get();
            JSONObject json = new JSONObject(result);
            JSONArray routearray= json.getJSONArray("routes");
            JSONObject routes=routearray.getJSONObject(0);
            JSONObject overviewPolylines=routes.getJSONObject("overview_polyline");
            String encodedString= overviewPolylines.getString("points");
            List<LatLng> list= decodePoly(encodedString);

            for(int z=0;z<list.size();z++){
                PolylineOptions options = new PolylineOptions();
                options.color(android.R.color.holo_red_light);
                options.width(10);
                options.add(list.get(z));
                mGoogleMap.addPolyline(options);
            }

        }
        catch(Exception e)
        {
            e.printStackTrace();
        }







        mapFrag= (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
        mapFrag.getMapAsync((OnMapReadyCallback) this);








        Log.d("Here!!","after initialization" );


        // Taking variables from previous activity





        String myUrl="https://cabchain.herokuapp.com/users/getUsername/"+userphone;
        Log.d("URL",myUrl);
        HttpGetRequest getRequest1 = new HttpGetRequest();
        try{
            String result = getRequest1.execute(myUrl).get();
            JSONObject jObject = new JSONObject(result);
            customername=jObject.getString("name");

        }
        catch(Exception e)
        {
            e.printStackTrace();
        }


        StringBuilder h= new StringBuilder();
        h.append("     Username: "+customername+"\t\t");
        h.append("Contact: "+userphone+"\n\n");
        h.append("                              Ride Tracking No: "+ridetrackingno);


        TextView t1=(TextView) findViewById(R.id.details);
        t1.setText(h.toString());


        Log.d("Username", username);
        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        View headerView = navigationView.getHeaderView(0);
        TextView text1 = (TextView) headerView.findViewById(R.id.text1);
        text1.setText(username);
        text1 = (TextView) headerView.findViewById(R.id.text2);
        text1.setText(phone);
        text1 = (TextView) headerView.findViewById(R.id.text3);
        text1.setText(email);
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        navigationView.setNavigationItemSelectedListener(this);
    }


    private List<LatLng> decodePoly(String encoded) {

        List<LatLng> poly = new ArrayList<LatLng>();
        int index = 0, len = encoded.length();
        int lat = 0, lng = 0;

        while (index < len) {
            int b, shift = 0, result = 0;
            do {
                b = encoded.charAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            int dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
            lat += dlat;

            shift = 0;
            result = 0;
            do {
                b = encoded.charAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            int dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
            lng += dlng;

            LatLng p = new LatLng((((double) lat / 1E5)),
                    (((double) lng / 1E5)));
            poly.add(p);
        }

        return poly;
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.ride_start, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }


    private void displaySelectedScreen(int id){
        Fragment fragment=null;
        switch (id){
            case R.id.nav_gallery:
                fragment=new PreviousRide();
                //  fragment.getView().setBackgroundColor(Color.WHITE);
                break;
            case R.id.nav_manage:
                fragment=new RateCard();
                //     fragment.getView().setBackgroundColor(Color.WHITE);
                break;
            case R.id.nav_send1:
                fragment=new Support();
                //     fragment.getView().setBackgroundColor(Color.WHITE);
                break;
            case R.id.nav_send2:
                fragment=new Refer();
                //   fragment.getView().setBackgroundColor(Color.WHITE);
                break;
            case R.id.nav_slideshow:
                fragment=new KnowYourRatings();
                //     fragment.getView().setBackgroundColor(Color.WHITE);
                break;
        }
        if(fragment!=null){
            FragmentTransaction ft=getSupportFragmentManager().beginTransaction();
            Bundle bundle=new Bundle();
            String phonenum=phone;
            bundle.putString("Phone",phonenum);
            bundle.putString("Username",username);
            bundle.putString("Email",email);
            fragment.setArguments(bundle);
            ft.replace(R.id.drawer_layout,fragment).addToBackStack("tag");
            ft.commit();
        }
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera) {
            // Handle the camera action
        } else if (id == R.id.nav_gallery) {

        } else if (id == R.id.nav_slideshow) {

        } else if (id == R.id.nav_manage) {

        } else if (id == R.id.nav_send1) {

        } else if (id == R.id.nav_send2) {

        }
        displaySelectedScreen(id);
        return true;
    }

    @Override
    public void onLocationChanged(Location location) {

    }

    @Override
    public void onStatusChanged(String s, int i, Bundle bundle) {

    }

    @Override
    public void onProviderEnabled(String s) {

    }

    @Override
    public void onProviderDisabled(String s) {

    }

    @Override
    public void onConnected(@Nullable Bundle bundle) {

    }

    @Override
    public void onConnectionSuspended(int i) {

    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {

    }

    @Override
    public void onPlaceSelected(Place place) {

    }

    @Override
    public void onError(Status status) {

    }

    @Override
    public void onMapReady(GoogleMap googleMap) {

        double latitude=Double.parseDouble(GPSstart.substring(0,GPSstart.indexOf(" ")));
        double longitude=Double.parseDouble(GPSstart.substring(GPSstart.indexOf(" ")+1));

        double driverlat=Double.parseDouble(driverlatitude);
        double driverlong=Double.parseDouble(driverlongitude);

        Log.d("Here!!","in initialization" );
        LatLng sydney = new LatLng(latitude,longitude);
        googleMap.addMarker(new MarkerOptions().position(sydney)
                .title("Pickup Location").icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_YELLOW)));
        googleMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));
        googleMap.animateCamera(CameraUpdateFactory.zoomTo(15), 2000, null);
        mGoogleMap=googleMap;
        mGoogleMap.setMapType(GoogleMap.MAP_TYPE_NORMAL);

          dest=new LatLng(driverlat,driverlong);




        mGoogleMap.addMarker(new MarkerOptions().position(dest)
                .title("You are here!").icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_CYAN)));



        LatLngBounds.Builder builder = new LatLngBounds.Builder();
        builder.include(sydney);
        builder.include(dest);
        LatLngBounds bounds = builder.build();

        CameraUpdate cu = CameraUpdateFactory.newLatLngBounds(bounds, 25);
        // mGoogleMap.animateCamera(cu);

        mGoogleMap.animateCamera(cu, new GoogleMap.CancelableCallback() {
            public void onCancel() {
            }

            public void onFinish() {
                CameraUpdate zout = CameraUpdateFactory.zoomBy(-0.4f);
                mGoogleMap.animateCamera(zout);
            }
        });

      /*  Polyline line = mGoogleMap.addPolyline(new PolylineOptions()
                .add(sydney, dest)
                .width(5)
                .color(Color.RED));*/



    }

    public void placeRequest(View view){


        Intent show = new Intent (this, provideOTP.class);
        show.putExtra("Phone",phone);
        show.putExtra("UserPhone",userphone);
        show.putExtra("Username",username);
        show.putExtra("Email",email);
        show.putExtra("RideTrackingNo",ridetrackingno);
        show.putExtra("GPSstart",GPSstart);
        show.putExtra("GPSend",GPSend);
        show.putExtra("fare",fare);
        show.putExtra("distance",distance);
        show.putExtra("time",time);
        show.putExtra("driverlatitude",driverlatitude);
        show.putExtra("driverlongitude",driverlongitude);
        startActivity(show);

    }


  /*  public void onMapReady(GoogleMap googleMap) {

        LatLng sydney = new LatLng(12.843515, 77.663306);
        googleMap.addMarker(new MarkerOptions().position(sydney)
                .title("You are here"));
        googleMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));
        googleMap.animateCamera(CameraUpdateFactory.zoomTo(15), 2000, null);
        mGoogleMap=googleMap;
        mGoogleMap.setMapType(GoogleMap.MAP_TYPE_NORMAL);

        mGoogleMap.getUiSettings().setMapToolbarEnabled(true);

        //Initialize Google Play Services
        if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (ContextCompat.checkSelfPermission(this,
                    Manifest.permission.ACCESS_FINE_LOCATION)
                    == PackageManager.PERMISSION_GRANTED) {
                //Location Permission already granted
               // buildGoogleApiClient();
                mGoogleMap.setMyLocationEnabled(true);
            } else {
                //Request Location Permission
              //  checkLocationPermission();
            }
        }
        else {
          //  buildGoogleApiClient();
            mGoogleMap.setMyLocationEnabled(true);
        }

    }*/

}
