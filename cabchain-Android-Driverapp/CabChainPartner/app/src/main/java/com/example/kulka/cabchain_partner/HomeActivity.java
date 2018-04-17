package com.example.kulka.cabchain_partner;

import android.app.Activity;
import android.content.ClipData;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.ViewGroup;
import android.widget.Adapter;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class HomeActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {


    String phone,username,email;
    Handler handler;
    Runnable refresh;
    HashMap<String,String> Quotes;
    long delay=8000;
    ListView l1;
    Adapter mAdapter;
    SwipeRefreshLayout mSwipe;
    int runtime=0;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("CabChain Partner");

        phone = getIntent().getStringExtra("Phone");
        username = getIntent().getStringExtra("Username");
        email = getIntent().getStringExtra("Email");



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

       // NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        Quotes= new HashMap<String, String>();
    //    handler = new Handler();
      //  m_Runnable.run();

        mSwipe=(SwipeRefreshLayout) findViewById(R.id.myrefresh);
        l1=findViewById(R.id.incomingrides);


        String myUrl="https://cabchain.herokuapp.com/users/newrequests-driversuggestion/"+phone;
        HttpGetRequest getRequest = new HttpGetRequest();
        try{
            String result = getRequest.execute(myUrl).get();
            //   Log.d("ReceivedJSONResponse", result);
            ArrayList<String> allNames = new ArrayList<String>();
            StringBuilder h;
            JSONArray jObject = new JSONArray(result);
            Log.d("ReceivedJSONResponse", result);
            for (int i=0; i<jObject.length(); i++) {
                h=new StringBuilder();
                JSONObject actor = jObject.getJSONObject(i);
                String start = actor.getString("start");
                String end = actor.getString("end");
                String Ridefare = actor.getString("fare");
                String usercontact=actor.getString("phone");
                h.append("Ride Tracking No :"+usercontact+"\n\n");
                h.append("Source :"+start+"\n\n");
                h.append("Destination: "+end+"\n\n");
                h.append("Estimated Fare: "+Ridefare+"\n");
                allNames.add(h.toString());
            }
           // l1.setClickable(false);
            Log.d("List:",allNames.toString());
            //final ArrayAdapter<String > adapter=new ArrayAdapter<String>(getApplicationContext(), R.layout.home_resource,
              //      R.id.ridedetails, allNames);
            l1.setAdapter(new MyAdapter(getApplicationContext(), R.layout.home_resource, allNames,phone));
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }


        mSwipe.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                Log.d("On Refresh:","I am inside");
                refreshContent();
            }
        });


    }

  /*  Handler hander = new Handler(){
        public void handleMessage(Message m){
            Intent intent = new Intent (HomeActivity.this, RideStart.class);
            startActivity(intent);
        }
    };*/


    public String getPhone(){
        return phone;
    }

    public void refreshContent(){
       new Handler().postDelayed(new Runnable() {
           @Override
           public void run() {
               String myUrl="https://cabchain.herokuapp.com/users/newrequests-driversuggestion/"+phone;
               HttpGetRequest getRequest = new HttpGetRequest();
               try{
                   String result = getRequest.execute(myUrl).get();
                   //   Log.d("ReceivedJSONResponse", result);
                   ArrayList<String> allNames = new ArrayList<String>();
                   StringBuilder h;
                   String driverlatitude="",driverlongitude="";
                   JSONArray jObject = new JSONArray(result);
                   Log.d("ReceivedJSONResponse", result);

                   for (int i=0; i<jObject.length(); i++) {
                       h=new StringBuilder();
                       JSONObject actor = jObject.getJSONObject(i);
                       String booked=actor.getString("booked");
                       if(booked.equals("1")){


                           String myUrl1="https://cabchain.herokuapp.com/users/getdriverlocations/";
                           Log.d("URL",myUrl1);
                           HttpGetRequest getRequest1 = new HttpGetRequest();
                           try{
                               String result1 = getRequest1.execute(myUrl1).get();
                               JSONArray j= new JSONArray(result1);
                               for(int k=0;k<j.length();k++){
                                   JSONObject j2=j.getJSONObject(k);
                                   if(j2.getString("driver").equals(phone)){
                                       driverlatitude=j2.getString("latitude");
                                       driverlongitude=j2.getString("longitude");
                                       break;
                                   }
                               }

                           }
                           catch(Exception e)
                           {
                               e.printStackTrace();
                           }

                           String ridetrackingno=actor.getString("ridetrackingno");
                           String gpsstart =actor.getString("GPSstartingpoint");
                           String gpsend =actor.getString("GPSendingpoint");
                           String userphone=actor.getString("userid");
                           String fare=actor.getString("fare");
                           String distance=actor.getString("distance");
                           String time=actor.getString("time");

                           Log.d("HOME ACTIVITY",fare+"/"+distance);

                           Intent show = new Intent (HomeActivity.this, RideStart.class);
                           show.putExtra("Phone",phone);
                           show.putExtra("UserPhone",userphone);
                           show.putExtra("Username",username);
                           show.putExtra("Email",email);
                           show.putExtra("RideTrackingNo",ridetrackingno);
                           show.putExtra("GPSstart",gpsstart);
                           show.putExtra("GPSend",gpsend);
                           show.putExtra("driverlatitude",driverlatitude);
                           show.putExtra("driverlongitude",driverlongitude);
                           show.putExtra("fare",fare);
                           show.putExtra("distance",distance);
                           show.putExtra("time",time);
                           startActivity(show);
                       }else{
                           String start = actor.getString("start");
                           String end = actor.getString("end");
                           String Ridefare = actor.getString("fare");
                           String usercontact=actor.getString("phone");
                           h.append("Ride Tracking No :"+usercontact+"\n\n");
                           h.append("Source :"+start+"\n\n");
                           h.append("Destination: "+end+"\n\n");
                           h.append("Estimated Fare: "+Ridefare+"\n");
                           allNames.add(h.toString());
                       }
                   }
                   l1.setAdapter(new MyAdapter(getApplicationContext(), R.layout.home_resource, allNames,phone));
               }
               catch(Exception e)
               {
                   e.printStackTrace();
               }
               mSwipe.setRefreshing(false);
           }
       },2000);
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

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera) {
            Toast.makeText(this,"Quote a ride",Toast.LENGTH_SHORT).show();
        } /*else if (id == R.id.nav_gallery) {

        } else if (id == R.id.nav_slideshow) {

        } else if (id == R.id.nav_manage) {

        } else if (id == R.id.nav_share) {

        } else if (id == R.id.nav_send) {

        }*/

        displaySelectedScreen(id);
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

    public AdapterView.OnItemClickListener onItemClickListener = new AdapterView.OnItemClickListener() {
        @Override

        public void onItemClick(AdapterView<?> arg0, View arg1, int position,
                                long arg3) {

            Log.d("Item clicked", String.valueOf(position));

        }

    };

    public void sendQuote(View view){
        Log.d("SendQuote","Ready!");
    }


}


class MyAdapter extends ArrayAdapter<String> {
    private int resourceId;
    String name="";
    String phone;
    private ArrayList<String> sites = null;
    private Context context;


    public MyAdapter(Context context, int resource, ArrayList<String> objects,String phone) {
        super(context, resource, objects);
        this.context = context;
        this.resourceId = resource;
        this.sites = objects;
        this.phone=phone;
    }

    @Override
    public String getItem(int position) {
        return sites.get(position);
    }

    @Override
    public int getCount() {
        return sites.size();
    }

    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {
        name = getItem(position);
        View view = convertView;
        if (view == null) {
            LayoutInflater inflater = LayoutInflater.from(getContext());
            view = inflater.inflate(R.layout.home_resource, parent, false);
        }

        final TextView mText = (TextView) view.findViewById(R.id.ridedetails);
        mText.setText(name);

        final EditText mEdit   = (EditText) view.findViewById(R.id.PriceQuotation);
        final Button mButton = (Button) view.findViewById(R.id.button);
        mButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d("Name",name);
                String ridetrackno=mText.getText().toString().substring(mText.getText().toString().indexOf(":")+1,mText.getText().toString().indexOf("Source")-2);
                String fare=mEdit.getText().toString();
                mEdit.setText("Quote Sent");
                mEdit.setEnabled(false);
                mButton.setVisibility(view.INVISIBLE);
                String myUrl="https://cabchain.herokuapp.com/users/driverquote/"+phone+"/"+ridetrackno+"/"+fare;
                Log.d("URL",myUrl);
                HttpGetRequest getRequest = new HttpGetRequest();
                try{
                    String result = getRequest.execute(myUrl).get();
                    Log.d("Details:",result);
                }
                catch(Exception e)
                {
                    e.printStackTrace();
                }

            }
        });

        return view;
    }
}
