package com.example.kulka.cabchain;

import android.app.Activity;
import android.content.ClipData;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Handler;
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
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class NewQuoteStart extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener,AdapterView.OnItemSelectedListener {


    String GPSstart,GPSend,phone,fare,username,email,ridetrackingno,sortby,ridetypes,sourcelocationlat,sourcelocationlong,destlocationlat,destlocationlong;
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
        sortby="quotes";
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_quote_start);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolBar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("CabChain");

        phone = getIntent().getStringExtra("Phone");
        Log.d("Phonenum",phone);
        username = getIntent().getStringExtra("Username");
        email = getIntent().getStringExtra("Email");
        ridetrackingno=getIntent().getStringExtra("RideTrackingNo");
        ridetypes=getIntent().getStringExtra("ridetype");
        GPSstart=getIntent().getStringExtra("GPSstart");
        GPSend=getIntent().getStringExtra("GPSend");

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        View headerView = navigationView.getHeaderView(0);
        TextView text1 = (TextView) headerView.findViewById(R.id.text1);
        text1.setText(username);
        text1 = (TextView) headerView.findViewById(R.id.text2);
        text1.setText(phone);
        text1 = (TextView) headerView.findViewById(R.id.text3);
        text1.setText(email);

/// SpinnerCode starts

        Spinner spinner = (Spinner) findViewById(R.id.ride_spinner);
        ArrayAdapter<CharSequence> adapter= ArrayAdapter.createFromResource(this,R.array.ride_names,android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
        spinner.setOnItemSelectedListener(this);

 // SpinnerCode ends

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        // NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);


        mSwipe=(SwipeRefreshLayout) findViewById(R.id.myrefresh);
        mSwipe=(SwipeRefreshLayout) findViewById(R.id.myrefresh);
        l1=findViewById(R.id.incomingrides);

        String myUrl="https://cabchain.herokuapp.com/users/suggestionstousers/"+ridetrackingno+"/"+sortby+"/"+ridetypes;
        Log.d("URL called: ",myUrl);
        HttpGetRequest getRequest = new HttpGetRequest();
        try{
            String result = getRequest.execute(myUrl).get();
               Log.d("ReceivedJSONResponse", result);
            ArrayList<String> allNames = new ArrayList<String>();
            StringBuilder h;
            JSONArray jObject = new JSONArray(result);
            Log.d("ReceivedJSONResponse", result);
            for (int i=0; i<jObject.length(); i++) {
                h=new StringBuilder();
                JSONObject actor = jObject.getJSONObject(i);
                String drivername = actor.getString("name");
                String driverphone = actor.getString("driver");
                String modelname = actor.getString("modelname");
                String quotedprice=actor.getString("quote");
                String deviation=actor.getString("deviation");
                h.append("Driver Name :"+drivername+"\n\n");
                h.append("Contact :"+driverphone+"\n\n");
                h.append("Model : "+modelname+"\n\n");
                h.append("Quoted Price: "+quotedprice+"\n\n");
                h.append("Deviation: "+deviation+"\n");
                allNames.add(h.toString());
            }
            // l1.setClickable(false);
            Log.d("List:",allNames.toString());
            //final ArrayAdapter<String > adapter=new ArrayAdapter<String>(getApplicationContext(), R.layout.home_resource,
            //      R.id.ridedetails, allNames);
            l1.setAdapter(new MyAdapter(getApplicationContext(), R.layout.quote_start_resource, allNames,phone,ridetrackingno,username,email,GPSstart,GPSend));
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

    public String getPhone(){
        return phone;
    }

    public void refreshContent(){
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {

                String myUrl="https://cabchain.herokuapp.com/users/suggestionstousers/"+ridetrackingno+"/"+sortby+"/"+ridetypes;
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
                        String drivername = actor.getString("name");
                        String driverphone = actor.getString("driver");
                        String modelname = actor.getString("modelname");
                        String quotedprice=actor.getString("quote");
                        String deviation=actor.getString("deviation");
                        h.append("Driver Name :"+drivername+"\n\n");
                        h.append("Contact :"+driverphone+"\n\n");
                        h.append("Model : "+modelname+"\n\n");
                        h.append("Quoted Price: "+quotedprice+"\n\n");
                        h.append("Deviation: "+deviation+"\n");
                        allNames.add(h.toString());
                    }
                    // l1.setClickable(false);
                    Log.d("List:",allNames.toString());
                    //final ArrayAdapter<String > adapter=new ArrayAdapter<String>(getApplicationContext(), R.layout.home_resource,
                    //      R.id.ridedetails, allNames);
                    l1.setAdapter(new MyAdapter(getApplicationContext(), R.layout.quote_start_resource, allNames,phone,ridetrackingno,username,email,GPSstart,GPSend));
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
            bundle.putString("RideTrackingNo",ridetrackingno);
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


    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
        sortby=adapterView.getItemAtPosition(i).toString();
        refreshContent();
    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {

    }
}


class MyAdapter extends ArrayAdapter<String> {
    private int resourceId;
    String name="";
    String phone,ridetrackingno,username,email,sourcelocationlat,sourcelocationlong,destlocationlat,destlocationlong,GPSstart,GPSend;
    private ArrayList<String> sites = null;
    private Context context;

    public MyAdapter(Context context, int resource, ArrayList<String> objects,String phone,String ridetrackingno,String username,String email,String GPSstart,String GPSend){
        super(context, resource, objects);
        this.context = context;
        this.resourceId = resource;
        this.sites = objects;
        this.phone=phone;
        this.ridetrackingno=ridetrackingno;
        this.email=email;
        this.username=username;
        this.GPSstart=GPSstart;
        this.GPSend=GPSend;
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
            view = inflater.inflate(R.layout.quote_start_resource, parent, false);
        }

        final TextView mText = (TextView) view.findViewById(R.id.ridedetails);
        mText.setText(name);

       // final EditText mEdit   = (EditText) view.findViewById(R.id.PriceQuotation);
        final Button mButton = (Button) view.findViewById(R.id.accept);
        final Button rButton = (Button) view.findViewById(R.id.reject);
        mButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d("Name",name);
                String driverno=mText.getText().toString().substring(mText.getText().toString().indexOf("Contact")+9,mText.getText().toString().indexOf("Model")-1);
                Log.d("Driverno: ",driverno);
               // Driver substring to be parsed

                mButton.setVisibility(view.INVISIBLE);
                rButton.setVisibility(view.INVISIBLE);
                String myUrl="https://cabchain.herokuapp.com/users/rideaccept/"+ridetrackingno+"/"+driverno;
                Log.d("URL",myUrl);
                HttpGetRequest getRequest = new HttpGetRequest();
                try{
                    String result = getRequest.execute(myUrl).get();
                    Log.d("Amitabh's response: ",result);
                    JSONArray j=new JSONArray(result);
                    JSONObject jo= j.getJSONObject(0);
                    String driverfirstname=jo.getString("firstname");
                    String fare=jo.getString("fare");
                    String driverlastname=jo.getString("lastname");
                    String driverphone=jo.getString("contactno");
                    String modelname=jo.getString("modelname");
                    String modeltype=jo.getString("modeltype");
                    String modeldesc=jo.getString("modeldescription");
                    String licenseplate=jo.getString("licenseplate");
                    String driverlocation=jo.getString("driverlocation");
                    String otp=jo.getString("otp");
                    String d=jo.getString("distance");

                    Intent show = new Intent(getContext(),RideStart.class);
                    show.putExtra("Phone",phone);
                    show.putExtra("Username",username);
                    show.putExtra("Email",email);
                    show.putExtra("LicensePlate",licenseplate);
                    show.putExtra("RideTrackingNo",ridetrackingno);
                    show.putExtra("DriverFirstName",driverfirstname);
                    show.putExtra("DriverLastName",driverlastname);
                    show.putExtra("ContactNo",driverphone);
                    show.putExtra("ModelName",modelname);
                    show.putExtra("ModelDesc",modeldesc);
                    show.putExtra("ModelType",modeltype);
                    show.putExtra("driverLocation",driverlocation);
                    show.putExtra("GPSstart",GPSstart);
                    show.putExtra("GPSend",GPSend);
                    show.putExtra("otp",otp);
                    show.putExtra("fare",fare);
                    show.putExtra("distance",d);
                    show.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    context.startActivity(show);
                }
                catch(Exception e)
                {
                    e.printStackTrace();
                }

            }
        });


        rButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d("Name",name);
                String driverno=mText.getText().toString().substring(mText.getText().toString().indexOf("Contact")+9,mText.getText().toString().indexOf("Model")-1);
                Log.d("Driverno: ",driverno);

                // Driver substring to be parsed

                mButton.setVisibility(view.INVISIBLE);
                rButton.setVisibility(view.INVISIBLE);
                String myUrl="https://cabchain.herokuapp.com/users/ridereject/"+ridetrackingno+"/"+driverno;
                Log.d("URL",myUrl);
                HttpGetRequest getRequest = new HttpGetRequest();
                try{
                    String result = getRequest.execute(myUrl).get();
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
