package com.example.kulka.cabchain_partner;

import android.app.Fragment;
import android.content.Intent;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

/**
 * Created by kulka on 3/14/2018.
 */

public class PreviousRide extends android.support.v4.app.Fragment {
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        String phonenum=this.getArguments().getString("Phone");

        String myUrl="https://cabchain.herokuapp.com/users/driver-previousrides/"+phonenum;

        final View previourRideView = inflater.inflate(R.layout.previousride,container,false);
        previourRideView.setBackgroundColor(Color.WHITE);

        HttpGetRequest getRequest = new HttpGetRequest();
        try{
            String result = getRequest.execute(myUrl).get();
            //   Log.d("ReceivedJSONResponse", result);
            ArrayList<String> allNames = new ArrayList<String>();
            ListView l1=(ListView) previourRideView.findViewById(R.id.listview1);
            StringBuilder h;
            JSONArray jObject = new JSONArray(result);
            Log.d("ReceivedJSONResponse", result);
            String driverid,ridetrackingno,starttime,endtime,addressstart,addressend,fare,distance;
            for (int i=0; i<jObject.length(); i++) {
                h=new StringBuilder();
                JSONObject actor = jObject.getJSONObject(i);
                driverid = actor.getString("userid");
                ridetrackingno = actor.getString("ridetrackingno");
                starttime = actor.getString("ridestarttime");
                endtime = actor.getString("rideendtime");
                addressstart = actor.getString("addressstartingpoint");
                addressend=actor.getString("addressendingpoint");
                fare = actor.getString("fare");
                distance=actor.getString("distance");
                h.append("Ride Tracking Number :"+ridetrackingno+"\n\n");
                h.append("User ID: "+driverid+"\n");
                h.append("Starting Point: "+addressstart+"\n");
                h.append("Ending Point: "+addressend+"\n");
                h.append("Start Time: "+starttime+" HRS\n");
                h.append("Ending Time: "+endtime+" HRS\n");
                h.append("Fare: "+fare+" Rs\n");
                h.append("Distance: "+distance+" km\n");

                allNames.add(h.toString());
            }
            final ArrayAdapter<String > adapter=new ArrayAdapter<String>(getContext(),R.layout.previousrides_resource,allNames);
            l1.setAdapter(adapter);
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }

        //  return inflater.inflate(R.layout.previousride,container,false);
        return previourRideView;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        getActivity().setTitle("Home Activity");
    }


}

class HttpGetRequest3 extends AsyncTask<String, Void, String> {

    public static final String REQUEST_METHOD = "GET";
    public static final int READ_TIMEOUT = 15000;
    public static final int CONNECTION_TIMEOUT = 15000;

    @Override
    protected String doInBackground(String... params){
        String stringUrl = params[0];
        String result="";
        String inputLine="";

        try {
            //Create a URL object holding our url
            URL myUrl = new URL(stringUrl);
            //Create a connection
            HttpURLConnection connection =(HttpURLConnection)
                    myUrl.openConnection();

            //Set methods and timeouts
            connection.setRequestMethod(REQUEST_METHOD);
            connection.setReadTimeout(READ_TIMEOUT);
            connection.setConnectTimeout(CONNECTION_TIMEOUT);

            //Connect to our url
            connection.connect();

            //Create a new InputStreamReader
            InputStreamReader streamReader = new
                    InputStreamReader(connection.getInputStream());
            //Create a new buffered reader and String Builder
            BufferedReader reader = new BufferedReader(streamReader);
            StringBuilder stringBuilder = new StringBuilder();
            //Check if the line we are reading is not null
            while((inputLine = reader.readLine()) != null){
                stringBuilder.append(inputLine);
            }
            //Close our InputStream and Buffered reader
            reader.close();
            streamReader.close();
            //Set our result equal to our stringBuilder
            result = stringBuilder.toString();
        }
        catch(Exception e)
        {
            e.printStackTrace();
            result = "";
        }

        return result;
    }
    @Override
    protected void onPostExecute(String result){
        super.onPostExecute(result);
    }
}

