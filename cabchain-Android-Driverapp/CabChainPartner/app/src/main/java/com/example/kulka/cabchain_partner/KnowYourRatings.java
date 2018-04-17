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

public class KnowYourRatings extends android.support.v4.app.Fragment {
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        String phonenum=this.getArguments().getString("Phone");

        String myUrl="https://cabchain.herokuapp.com/users/driverratings/"+phonenum;

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
                driverid = actor.getString("ridescompleted");
                ridetrackingno = actor.getString("ridescancelled");
                starttime = actor.getString("avgrating");
                endtime = actor.getString("drivingskills");
                addressstart = actor.getString("behaviour");
                addressend=actor.getString("timelypickupdrop");
                fare = actor.getString("conditionofvehicle");
                h.append("Rides Completed: "+driverid+"\n");
                h.append("Rides Cancelled :"+ridetrackingno+"\n\n");
                h.append("Average Rating: "+starttime+"\n");
                h.append("Driving Skills: "+endtime+"\n");
                h.append("Behaviour: "+addressstart+"\n");
                h.append("Timely Pickup Drop: "+addressend+"\n");
                h.append("Condition of Vehicle: "+fare+"\n");

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



