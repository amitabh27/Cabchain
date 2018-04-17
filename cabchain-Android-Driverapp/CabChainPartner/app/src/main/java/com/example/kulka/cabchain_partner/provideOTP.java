package com.example.kulka.cabchain_partner;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
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
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONObject;

public class provideOTP extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {
    String phone,username,email,ridetrackingno,GPSstart,GPSend,userphone,driverlatitude,driverlongitude,distance,fare,time;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_provide_otp);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);


        phone = getIntent().getStringExtra("Phone");
        username = getIntent().getStringExtra("Username");
        email = getIntent().getStringExtra("Email");
        ridetrackingno=getIntent().getStringExtra("RideTrackingNo");
        GPSstart=getIntent().getStringExtra("GPSstart");
        GPSend=getIntent().getStringExtra("GPSend");
        Log.d("GPSend in provideOTP ",GPSend);
        userphone=getIntent().getStringExtra("UserPhone");
        driverlatitude=getIntent().getStringExtra("driverlatitude");
        driverlongitude=getIntent().getStringExtra("driverlongitude");
        fare=getIntent().getStringExtra("fare");
        distance=getIntent().getStringExtra("distance");

        Log.d("ProvideOTP ACTIVITY",fare+"/"+distance);

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

    public void startRide(View view){
        EditText mEdit;
        mEdit   = (EditText)findViewById(R.id.otp);
        Log.v("EditText", mEdit.getText().toString());

        String otp;
        otp=mEdit.getText().toString();

        String myUrl = "https://cabchain.herokuapp.com/users/matchotp/"+ridetrackingno+"/"+otp;
        String result;

        HttpGetRequest getRequest = new HttpGetRequest();
        try{
            result = getRequest.execute(myUrl).get();
            result=result.substring(1,result.length()-1);
            Log.d("ReceivedJSONResponse", result);
            JSONObject jObject = new JSONObject(result);

            if(jObject.getString("status").equals("match")){
                Log.d("status:", jObject.getString("status"));
                Intent show = new Intent (this, RideBegin.class);
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
            }else{
                Toast.makeText(this,"Invalid OTP!",Toast.LENGTH_SHORT).show();
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.provide_ot, menu);
        return true;
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
}
