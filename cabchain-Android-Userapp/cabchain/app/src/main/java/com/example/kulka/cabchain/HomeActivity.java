package com.example.kulka.cabchain;

//import android.app.Fragment;
//import android.app.FragmentManager;
import android.Manifest;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
//import android.app.FragmentTransaction;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AlertDialog;
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
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.places.AutocompleteFilter;
import com.google.android.gms.location.places.Place;
import com.google.android.gms.location.places.ui.PlaceAutocomplete;
import com.google.android.gms.location.places.ui.PlaceAutocompleteFragment;
import com.google.android.gms.location.places.ui.PlaceSelectionListener;
import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.MapsInitializer;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.CameraPosition;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.LatLngBounds;
import com.google.android.gms.maps.model.MapStyleOptions;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.sql.Driver;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Random;
//import android.support.v4.app.Fragment;

public class HomeActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener,PlaceSelectionListener,OnMapReadyCallback,LocationListener,GoogleApiClient.ConnectionCallbacks,GoogleApiClient.OnConnectionFailedListener
{
    int PLACE_AUTOCOMPLETE_REQUEST_CODE=1000,flag=0;
    PlaceAutocompleteFragment autocompleteFragment1,autocompleteFragment2;
    ArrayList<Place> LocationList;
    String phone,username,email,sourcelocationlat,sourcelocationlong,destlocationlat,destlocationlong;
    private GoogleMap nMap;
    MapView nmapview;
    GoogleMap mGoogleMap;
    SupportMapFragment mapFrag;
    LocationRequest mLocationRequest;
    GoogleApiClient mGoogleApiClient;
    Location mLastLocation;
    Marker mCurrLocationMarker;
    String distance,time;
    HashMap<String,String> DriverLocations;
    int last_checked=-1;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        LocationList= new ArrayList<Place>();

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolBar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("CabChain");

       mapFrag=(SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
        mapFrag.getMapAsync(this);


         phone = getIntent().getStringExtra("Phone");
         username = getIntent().getStringExtra("Username");
         email = getIntent().getStringExtra("Email");

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

        //   NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

/*

        RadioGroup g=(RadioGroup) findViewById(R.id.ridetype);
        g.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener()
        {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                if(last_checked==-1){
                    RadioButton rb=(RadioButton) findViewById(checkedId);
                    rb.setBackgroundColor(Color.GREEN);
                    last_checked=checkedId;
                }else{
                    RadioButton rb=(RadioButton) findViewById(last_checked);
                    rb.setBackgroundColor(Color.WHITE);
                    RadioButton rb1=(RadioButton) findViewById(checkedId);
                    rb1.setBackgroundColor(Color.GREEN);
                    last_checked=checkedId;
                }
            }
        });


*/



        autocompleteFragment1 = (PlaceAutocompleteFragment)
                getFragmentManager().findFragmentById(R.id.place_autocomplete_fragment1);

        autocompleteFragment2 = (PlaceAutocompleteFragment)
                getFragmentManager().findFragmentById(R.id.place_autocomplete_fragment2);

        AutocompleteFilter typeFilter = new AutocompleteFilter.Builder()
                .setTypeFilter(AutocompleteFilter.TYPE_FILTER_ADDRESS)
                .build();

        try {
            Intent intent =
                    new PlaceAutocomplete.IntentBuilder(PlaceAutocomplete.MODE_FULLSCREEN)
                            .setFilter(typeFilter)
                            .build(this);
        } catch (GooglePlayServicesRepairableException e) {
            e.printStackTrace();
        } catch (GooglePlayServicesNotAvailableException e) {
            e.printStackTrace();
        }

        autocompleteFragment1.setFilter(typeFilter);
        autocompleteFragment2.setFilter(typeFilter);

        autocompleteFragment1.setOnPlaceSelectedListener(new PlaceSelectionListener() {

            @Override
            public void onPlaceSelected(Place place) {
                // TODO: Get info about the selected place.
                //  Log.d( "Place: ",place.toString());
                LocationList.add(0, place);

                flag++;

                Log.d("Flag: ", String.valueOf(flag));

                if (flag == 2) {
                    mGoogleMap.clear();

                    for (Map.Entry<String, String> entry : DriverLocations.entrySet()) {

                        String loc=entry.getKey();
                        LatLng sydney= new LatLng(Double.parseDouble(loc.substring(0,loc.indexOf(","))),Double.parseDouble(loc.substring(loc.indexOf(",")+1)));


                        if (entry.getValue().equals("mini")) {
                            mGoogleMap.addMarker(new MarkerOptions().position(sydney)
                                    .title(entry.getValue()).icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_BLUE)));
                        } else if (entry.getValue().equals("micro")) {
                            mGoogleMap.addMarker(new MarkerOptions().position(sydney)
                                    .title(entry.getValue()).icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_CYAN)));
                        } else if (entry.getValue().equals("primesuv")) {
                            mGoogleMap.addMarker(new MarkerOptions().position(sydney)
                                    .title(entry.getValue()).icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_BLUE)));
                        } else if (entry.getValue().equals("auto")) {
                            mGoogleMap.addMarker(new MarkerOptions().position(sydney)
                                    .title(entry.getValue()).icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_YELLOW)));
                        }


                        Log.d("Place1: ", LocationList.get(0).getName().toString());
                        Log.d("Place2: ", LocationList.get(1).getName().toString());

                        autocompleteFragment1.setText(LocationList.get(0).getAddress().toString());
                        autocompleteFragment2.setText(LocationList.get(1).getAddress().toString());

                        LatLng source = new LatLng(LocationList.get(0).getLatLng().latitude, LocationList.get(0).getLatLng().longitude);
                        mGoogleMap.addMarker(new MarkerOptions().position(source).title("Pickup"));

                        LatLng destination = new LatLng(LocationList.get(1).getLatLng().latitude, LocationList.get(1).getLatLng().longitude);
                        mGoogleMap.addMarker(new MarkerOptions().position(destination).title("Drop"));

                        sourcelocationlat=String.valueOf(LocationList.get(0).getLatLng().latitude);
                        sourcelocationlong=String.valueOf(LocationList.get(0).getLatLng().longitude);

                        destlocationlat=String.valueOf(LocationList.get(1).getLatLng().latitude);
                        destlocationlong=String.valueOf(LocationList.get(1).getLatLng().longitude);

                        LatLngBounds.Builder builder = new LatLngBounds.Builder();
                        builder.include(LocationList.get(0).getLatLng());
                        builder.include(LocationList.get(1).getLatLng());
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




                        RideDetails(LocationList);

                    }

                }

            }
            @Override
            public void onError(Status status) {
                // TODO: Handle the error.
                Log.d( "An error occurred: " , status.toString());
            }
        });


        autocompleteFragment1.getView().findViewById(R.id.place_autocomplete_clear_button)
                .setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        flag--;
                        Log.d( "Flag on cancel: ",String.valueOf(flag));
                        LocationList.remove(0);
                        // example : way to access view from PlaceAutoCompleteFragment
                        // ((EditText) autocompleteFragment.getView()
                        // .findViewById(R.id.place_autocomplete_search_input)).setText("");
                        autocompleteFragment1.setText("");
                        view.setVisibility(View.GONE);
                    }
                });



        autocompleteFragment2.setOnPlaceSelectedListener(new PlaceSelectionListener() {
            @Override
            public void onPlaceSelected(Place place) {
                flag++;
                // TODO: Get info about the selected place.
                Log.d("Flag: ", String.valueOf(flag));

                LocationList.add(1, place);

                if (flag == 2) {
                    mGoogleMap.clear();


                    for (Map.Entry<String, String> entry : DriverLocations.entrySet()) {

                        String loc = entry.getKey();
                        LatLng sydney = new LatLng(Double.parseDouble(loc.substring(0, loc.indexOf(","))), Double.parseDouble(loc.substring(loc.indexOf(",") + 1)));


                        if (entry.getValue().equals("mini")) {
                            mGoogleMap.addMarker(new MarkerOptions().position(sydney)
                                    .title(entry.getValue()).icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_BLUE)));
                        } else if (entry.getValue().equals("micro")) {
                            mGoogleMap.addMarker(new MarkerOptions().position(sydney)
                                    .title(entry.getValue()).icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_CYAN)));
                        } else if (entry.getValue().equals("primesuv")) {
                            mGoogleMap.addMarker(new MarkerOptions().position(sydney)
                                    .title(entry.getValue()).icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_BLUE)));
                        } else if (entry.getValue().equals("auto")) {
                            mGoogleMap.addMarker(new MarkerOptions().position(sydney)
                                    .title(entry.getValue()).icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_YELLOW)));
                        }


                        //setDriverPointers();
                        Log.d("Place1: ", LocationList.get(0).getName().toString());
                        Log.d("Place2: ", LocationList.get(1).getName().toString());

                        autocompleteFragment1.setText(LocationList.get(0).getAddress().toString());
                        autocompleteFragment2.setText(LocationList.get(1).getAddress().toString());
                        LatLng source = new LatLng(LocationList.get(0).getLatLng().latitude, LocationList.get(0).getLatLng().longitude);
                        mGoogleMap.addMarker(new MarkerOptions().position(source).title("Pickup"));
                        LatLng destination = new LatLng(LocationList.get(1).getLatLng().latitude, LocationList.get(1).getLatLng().longitude);
                        mGoogleMap.addMarker(new MarkerOptions().position(destination).title("Drop"));

                        LatLngBounds.Builder builder = new LatLngBounds.Builder();
                        builder.include(LocationList.get(0).getLatLng());
                        builder.include(LocationList.get(1).getLatLng());
                        LatLngBounds bounds = builder.build();

                        CameraUpdate cu = CameraUpdateFactory.newLatLngBounds(bounds, 25);
                        //  mGoogleMap.animateCamera(cu);
                        mGoogleMap.animateCamera(cu, new GoogleMap.CancelableCallback() {
                            public void onCancel() {
                            }

                            public void onFinish() {
                                CameraUpdate zout = CameraUpdateFactory.zoomBy(-0.4f);
                                mGoogleMap.animateCamera(zout);
                            }
                        });


                        RideDetails(LocationList);
                    }
                }
            }

            @Override
            public void onError(Status status) {
                // TODO: Handle the error.
                Log.d( "An error occurred: " , status.toString());
            }
        });


        autocompleteFragment2.getView().findViewById(R.id.place_autocomplete_clear_button)
                .setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        flag--;
                        Log.d( "Flag on cancel: ",String.valueOf(flag));
                        LocationList.remove(1);
                        autocompleteFragment2.setText("");
                        view.setVisibility(View.GONE);
                    }
                });




    }



    public void Onselection(View view) {
        try {
            Intent intent =
                    new PlaceAutocomplete.IntentBuilder(PlaceAutocomplete.MODE_FULLSCREEN)
                            .build(this);
            startActivityForResult(intent, PLACE_AUTOCOMPLETE_REQUEST_CODE);
//PLACE_AUTOCOMPLETE_REQUEST_CODE is integer for request code
        } catch (GooglePlayServicesRepairableException | GooglePlayServicesNotAvailableException e) {
            // TODO: Handle the error.
        }

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        //autocompleteFragment.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PLACE_AUTOCOMPLETE_REQUEST_CODE) {
            if (resultCode == RESULT_OK) {
                Place place = PlaceAutocomplete.getPlace(this, data);
                Log.d("Status: ",place.toString());

               // TextView myAwesomeTextView = (TextView)findViewById(R.id.Area);
                //myAwesomeTextView.setText(place.getName().toString());

            } else if (resultCode == PlaceAutocomplete.RESULT_ERROR) {
                Status status = PlaceAutocomplete.getStatus(this, data);
                Log.d("Status", status.getStatusMessage());
            } else if (resultCode == RESULT_CANCELED) {

            }
        }
    }







    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
       /* Intent show = new Intent(this, RegUserActivity.class);
        show.putExtra("Phone",phone);
        show.putExtra("Username",username);
        show.putExtra("Email",email);
        startActivity(show);*/
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.home, menu);
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
                fragment=new KnowYourRides();
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

      /*  if (id == R.id.nav_camera) {
            Toast.makeText(this,"Book Ride!",Toast.LENGTH_SHORT).show();
        } else if (id == R.id.nav_gallery) {

        } else if (id == R.id.nav_slideshow) {

        } else if (id == R.id.nav_manage) {

        } else if (id == R.id.nav_share) {

        } else if (id == R.id.nav_send) {

        }*/
        displaySelectedScreen(id);
        return true;
    }
    @Override
    public void onMapReady(GoogleMap googleMap) {

        LatLng sydney = new LatLng(12.843515, 77.663306);
        googleMap.addMarker(new MarkerOptions().position(sydney)
                .title("You are here"));
        googleMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));
        googleMap.animateCamera(CameraUpdateFactory.zoomTo(15), 2000, null);
        mGoogleMap=googleMap;
        mGoogleMap.setMapType(GoogleMap.MAP_TYPE_NORMAL);

     /*   Geocoder geocoder;
        List<Address> addresses;
        geocoder = new Geocoder(this, Locale.getDefault());

        addresses = geocoder.getFromLocation(12.843515, 77.663306), 1); // Here 1 represent max location result to returned, by documents it recommended 1 to 5

        String address = addresses.get(0).getAddressLine(0); // If any additional address line present than only, check with max available address lines by getMaxAddressLineIndex()
        String city = addresses.get(0).getLocality();
        String state = addresses.get(0).getAdminArea();
        String country = addresses.get(0).getCountryName();
        String postalCode = addresses.get(0).getPostalCode();
        String knownName = addresses.get(0).getFeatureName()

        */



        mGoogleMap.getUiSettings().setMapToolbarEnabled(true);

        mGoogleMap.setMapStyle(
                MapStyleOptions.loadRawResourceStyle(
                        this, R.raw.style_json));

        //Initialize Google Play Services
        if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (ContextCompat.checkSelfPermission(this,
                    Manifest.permission.ACCESS_FINE_LOCATION)
                    == PackageManager.PERMISSION_GRANTED) {
                //Location Permission already granted
                buildGoogleApiClient();
                mGoogleMap.setMyLocationEnabled(true);
            } else {
                //Request Location Permission
                checkLocationPermission();
            }
        }
        else {
            buildGoogleApiClient();
            mGoogleMap.setMyLocationEnabled(true);
        }
        setDriverPointers();
    }


    public void setDriverPointers(){

        String myUrl="https://cabchain.herokuapp.com/users/getdriverlocations";
        HttpGetRequest getRequest = new HttpGetRequest();
        DriverLocations=new HashMap<String, String>();
        try{
            String result = getRequest.execute(myUrl).get();
            //   Log.d("ReceivedJSONResponse", result);
            JSONArray jObject = new JSONArray(result);
            Log.d("ReceivedJSONResponse", result);


            for(int i=0;i<jObject.length();i++){
                double lat=Double.parseDouble(jObject.getJSONObject(i).getString("latitude"));
                double lon=Double.parseDouble(jObject.getJSONObject(i).getString("longitude"));

                String type=jObject.getJSONObject(i).getString("type");
                LatLng sydney = new LatLng(lat,lon);

                DriverLocations.put(jObject.getJSONObject(i).getString("latitude").concat(",").concat(jObject.getJSONObject(i).getString("longitude")),type);

                Log.d("ReceivedJSONResponse", type);

                if(type.equals("mini")){
                    mGoogleMap.addMarker(new MarkerOptions().position(sydney)
                            .title(type).icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_BLUE)));
                }else if(type.equals("micro")){
                    mGoogleMap.addMarker(new MarkerOptions().position(sydney)
                            .title(type).icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_CYAN)));
                }else if(type.equals("primesuv")){
                    mGoogleMap.addMarker(new MarkerOptions().position(sydney)
                            .title(type).icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_BLUE)));
                }else if(type.equals("auto")){
                    mGoogleMap.addMarker(new MarkerOptions().position(sydney)
                            .title(type).icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_YELLOW)));
                }
            }


        }
        catch(Exception e)
        {
            e.printStackTrace();
        }






    }

    protected synchronized void buildGoogleApiClient() {
        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .addApi(LocationServices.API)
                .build();
        mGoogleApiClient.connect();
    }



    @Override
    public void onLocationChanged(Location location) {
        mLastLocation = location;
        if (mCurrLocationMarker != null) {
            mCurrLocationMarker.remove();
        }

        //Place current location marker
        LatLng latLng = new LatLng(location.getLatitude(), location.getLongitude());
        Log.d("*******$$#%$#%$#%$", String.valueOf(location.getLatitude()));
        Log.d("*******$$#%$#%$#%$", String.valueOf(location.getLongitude()));
        MarkerOptions markerOptions = new MarkerOptions();
        markerOptions.position(latLng);
        markerOptions.title("Current Position");
        markerOptions.icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED));
        mCurrLocationMarker = mGoogleMap.addMarker(markerOptions);

        //move map camera
        mGoogleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(latLng,11));
        mGoogleMap.animateCamera(CameraUpdateFactory.zoomTo(15), 2000, null);
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
    public void onPause() {
        super.onPause();

        //stop location updates when Activity is no longer active
        if (mGoogleApiClient != null) {
            LocationServices.getFusedLocationProviderClient(this);
        }
    }

    public static final int MY_PERMISSIONS_REQUEST_LOCATION = 99;
    private void checkLocationPermission() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {

            // Should we show an explanation?
            if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                    Manifest.permission.ACCESS_FINE_LOCATION)) {

                // Show an explanation to the user asynchronously -- don't block
                // this thread waiting for the user's response! After the user
                // sees the explanation, try again to request the permission.
                new AlertDialog.Builder(this)
                        .setTitle("Location Permission Needed")
                        .setMessage("This app needs the Location permission, please accept to use location functionality")
                        .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                //Prompt the user once explanation has been shown
                                ActivityCompat.requestPermissions(HomeActivity.this,
                                        new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                                        MY_PERMISSIONS_REQUEST_LOCATION );
                            }
                        })
                        .create()
                        .show();


            } else {
                // No explanation needed, we can request the permission.
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                        MY_PERMISSIONS_REQUEST_LOCATION );
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String permissions[], int[] grantResults) {
        switch (requestCode) {
            case MY_PERMISSIONS_REQUEST_LOCATION: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                    // permission was granted, yay! Do the
                    // location-related task you need to do.
                    if (ContextCompat.checkSelfPermission(this,
                            Manifest.permission.ACCESS_FINE_LOCATION)
                            == PackageManager.PERMISSION_GRANTED) {

                        if (mGoogleApiClient == null) {
                            buildGoogleApiClient();
                        }
                        mGoogleMap.setMyLocationEnabled(true);
                    }

                } else {

                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.
                    Toast.makeText(this, "permission denied", Toast.LENGTH_LONG).show();
                }
                return;
            }

            // other 'case' lines to check for other
            // permissions this app might request
        }
    }

    @Override
    public void onPlaceSelected(Place place) {
        Log.d("Place Name",place.getName().toString());

    }

    @Override
    public void onError(Status status) {
        Log.d("Status: ",status.toString());
    }


    public void RideDetails(ArrayList<Place> L){
        Log.d("Here: ","********In ride details");
        Log.d("Here: ",String.valueOf(L.get(0)));
        Log.d("Here: ",String.valueOf(L.get(1)));

        String myUrl="https://cabchain.herokuapp.com/users/fare-computation-government-rates/"+L.get(0).getAddress().toString()+"/"+L.get(1).getAddress().toString();
        HttpGetRequest getRequest = new HttpGetRequest();
        try{
            String result = getRequest.execute(myUrl).get();
            //   Log.d("ReceivedJSONResponse", result);
            JSONArray jObject = new JSONArray(result);
            Log.d("ReceivedJSONResponse", result);


            distance=jObject.getJSONObject(0).getString("TravelDistance");
            time=jObject.getJSONObject(0).getString("TravelTime");

            distance=distance.substring(0,distance.indexOf(" "));
            time=time.substring(0,time.indexOf(" "));


            TextView myAwesomeTextView1 = (TextView)findViewById(R.id.micro1);
            myAwesomeTextView1.setText(jObject.getJSONObject(1).getString("micro")+" min");
            TextView myAwesomeTextView2 = (TextView)findViewById(R.id.micro);
            myAwesomeTextView2.setText(jObject.getJSONObject(0).getString("micro"));

            TextView myAwesomeTextView4 = (TextView)findViewById(R.id.mini1);
            myAwesomeTextView4.setText(jObject.getJSONObject(1).getString("mini")+" min");
            TextView myAwesomeTextView5 = (TextView)findViewById(R.id.mini);
            myAwesomeTextView5.setText(jObject.getJSONObject(0).getString("mini"));

            TextView myAwesomeTextView6 = (TextView)findViewById(R.id.primesuv1);
            myAwesomeTextView6.setText(jObject.getJSONObject(1).getString("primesuv")+" min");
            TextView myAwesomeTextView7 = (TextView)findViewById(R.id.primesuv);
            myAwesomeTextView7.setText(jObject.getJSONObject(0).getString("primesuv"));


            TextView myAwesomeTextView8 = (TextView)findViewById(R.id.primeplay);
            myAwesomeTextView8.setText(jObject.getJSONObject(0).getString("primeplay"));

            TextView myAwesomeTextView9 = (TextView)findViewById(R.id.sedan);
            myAwesomeTextView9.setText(jObject.getJSONObject(0).getString("primesedan"));

            TextView myAwesomeTextView10 = (TextView)findViewById(R.id.auto1);
            myAwesomeTextView10.setText(jObject.getJSONObject(1).getString("auto")+" min");
            TextView myAwesomeTextView11 = (TextView)findViewById(R.id.auto);
            myAwesomeTextView11.setText(jObject.getJSONObject(0).getString("auto"));
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    public void placeRequest(View view){
        RadioGroup g=(RadioGroup) findViewById(R.id.ridetype);
        int selected=g.getCheckedRadioButtonId();
        Log.d("Selected",String.valueOf(selected));
        Log.d("Size",String.valueOf(LocationList.size()));

        if(LocationList.size()!=2){
            Toast.makeText(this,"Please Enter Source and Destination!",Toast.LENGTH_LONG).show();
        }else{
            String user_phone=phone;
            Random random = new Random();
            int x = random.nextInt(900) + 100;

            String ridetrackingno=String.valueOf(x);
            String addressstartingpoint=LocationList.get(0).getAddress().toString();
            String addressendingpoint=LocationList.get(1).getAddress().toString();
            String gpsstartingpoint=String .valueOf(LocationList.get(0).getLatLng().latitude).concat(" ").concat(String .valueOf(LocationList.get(0).getLatLng().longitude).concat(" "));
            String gpsendingpoint=String .valueOf(LocationList.get(1).getLatLng().latitude).concat(" ").concat(String .valueOf(LocationList.get(1).getLatLng().longitude).concat(" "));
            String fare=" ";
            String ridetype="";
            TextView text1 = (TextView) findViewById(R.id.micro);
            TextView text2 = (TextView) findViewById(R.id.mini);
            TextView text3 = (TextView) findViewById(R.id.primesuv);
            TextView text4 = (TextView) findViewById(R.id.primeplay);
            TextView text5 = (TextView) findViewById(R.id.sedan);
            TextView text6 = (TextView) findViewById(R.id.auto);
            fare= (String) text1.getText()+"*"+(String) text2.getText()+"**"+(String) text3.getText()+"***"+(String) text4.getText()+"****"+(String) text5.getText()+"*****"+(String) text6.getText()+"******";
            if(selected==1){
                ridetype="micro";
            }else if(selected==2){

                ridetype="mini";
            }else if(selected==3){

                ridetype="primesuv";
            }else if(selected==4){

                ridetype="primeplay";
            }else if(selected==5){
                ridetype="primesedan";
            }else if(selected==6){
                ridetype="auto";
            }else{
                  ridetype="all";
            }
            Log.d("Fare",fare);
            String rideotp = String.format("%04d", random.nextInt(10000));
            String myUrl="https://cabchain.herokuapp.com/users/riderequestplaced/"+user_phone+"/"+ridetrackingno+"/"+addressstartingpoint+"/"+addressendingpoint+"/"+gpsstartingpoint+"/"+gpsendingpoint+"/"+fare+"/"+distance+"/"+rideotp;

            HttpGetRequest getRequest = new HttpGetRequest();
            try{
                String result = getRequest.execute(myUrl).get();
                Intent show = new Intent(this, NewQuoteStart.class);
                show.putExtra("Phone",phone);
                show.putExtra("fare",fare);
                show.putExtra("Username",username);
                show.putExtra("Email",email);
                show.putExtra("RideTrackingNo",ridetrackingno);
                show.putExtra("Distance",distance);
                show.putExtra("Time",time);
                show.putExtra("Fare",fare);
                show.putExtra("ridetype",ridetype);
                show.putExtra("GPSstart",gpsstartingpoint);
                show.putExtra("GPSend",gpsendingpoint);
                startActivity(show);
            }
            catch(Exception e)
            {
                e.printStackTrace();
            }





        }

    }


}
