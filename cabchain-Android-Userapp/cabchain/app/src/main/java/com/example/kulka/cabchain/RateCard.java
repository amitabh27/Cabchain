package com.example.kulka.cabchain;

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
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Spinner;

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

public class RateCard extends android.support.v4.app.Fragment implements AdapterView.OnItemSelectedListener {

    String city;
    View RateCardView;
    @Override
    public void onItemSelected(AdapterView<?> parent, View view,
                               int pos, long id) {
        city=parent.getItemAtPosition(pos).toString();
        String myUrl="https://cabchain.herokuapp.com/users/ratecard/"+city;
        Log.d("CALLING :", myUrl);
        HttpGetRequest4 getRequest = new HttpGetRequest4();
        try{
            String result = getRequest.execute(myUrl).get();
            Log.d("ReceivedJSONResponse", result);
            ArrayList<String> allNames = new ArrayList<String>();
            ListView l1=(ListView) RateCardView.findViewById(R.id.listview1);
            StringBuilder h;
            JSONArray jObject = new JSONArray(result);
            Log.d("ReceivedJSONResponse", result);
            String basefare,tilldistance,tillfareperkm,afterperkm,faretimepermin,cancellationnow,cancellationafter;
            for (int i=0; i<jObject.length(); i++) {
                JSONObject actor = jObject.getJSONObject(i);
                String arr[]={"micro","mini","primesedan","primesuv","primeplay","lux","auto"};

                for(int j=0;j<arr.length;j++){
                    h=new StringBuilder();
                    JSONObject actornew=actor.getJSONObject(arr[j]);
                    if(j!=3 && j!=6) {
                        basefare = actornew.getString("basefare");
                        Log.d("BaseFare :", basefare);
                        tilldistance = actornew.getString("tilldistance");
                        tillfareperkm = actornew.getString("tillfareperkm");
                        afterperkm = actornew.getString("afterperkm");
                        faretimepermin = actornew.getString("faretimepermin");
                        cancellationnow = actornew.getString("cancellationnow");
                        cancellationafter = actornew.getString("cancellationafter");
                        h.append(arr[j].toUpperCase()+ "\n\n");
                        h.append("Base Fare: " + basefare + " Rs  ");
                        h.append("valid upto: " + tilldistance  + " km\n");
                        h.append("Fare per km upto Base Fare: " + tillfareperkm + " Rs\n");
                        h.append("Fare per km after Base Fare: " + afterperkm + " Rs\n");
                        h.append("Fare per minute: " + faretimepermin + " Rs\n");
                        h.append("Cancellation Charge for Current Booking: " + cancellationnow + " Rs\n");
                        h.append("Cancellation Charge for Pre Booking: " + cancellationafter + " Rs\n");
                    }else {
                        if(j==3){
                            basefare = actornew.getString("basefare");
                            tilldistance = actornew.getString("tillbasedistance");
                            //  tillfareperkm = actornew.getString("tillperfarekm");
                            afterperkm = actornew.getString("afterperkm");
                            faretimepermin = actornew.getString("faretimepermin");
                            cancellationnow = actornew.getString("cancellationnow");
                            cancellationafter = actornew.getString("cancellationafter");
                            h.append(arr[j].toUpperCase()+ "\n\n");
                            h.append("Base Fare: " + basefare + " Rs  ");
                            h.append("valid upto: " + tilldistance + " km\n");
                            //   h.append("Fare per km upto Base Fare: " + tillfareperkm + " Rs\n");
                            h.append("Fare per km after Base Fare: " + afterperkm + " Rs\n");
                            h.append("Fare per minute: " + faretimepermin + " Rs\n");
                            h.append("Cancellation Charge for Current Booking: " + cancellationnow + " Rs\n");
                            h.append("Cancellation Charge for Pre Booking: " + cancellationafter + " Rs\n");
                        } else{
                            basefare = actornew.getString("basefare");
                            tilldistance = actornew.getString("basedistance");
                            //     tillfareperkm = actornew.getString("tillperfarekm");
                            afterperkm = actornew.getString("afterperkm");
                            //     faretimepermin = actornew.getString("faretimepermin");
                            //    cancellationnow = actornew.getString("cancellationnow");
                            //   cancellationafter = actornew.getString("cancellationafter");
                            h.append(arr[j].toUpperCase()+ "\n\n");
                            h.append("Base Fare: " + basefare + " Rs  ");
                            h.append("valid upto: " + tilldistance + " km\n");
                            //    h.append("Fare per km upto Base Fare: " + tillfareperkm + " Rs\n");
                            h.append("Fare per km after Base Fare: " + afterperkm + " Rs\n");
                            //  h.append("Fare per minute: " + faretimepermin + " Rs\n");
                            // h.append("Cancellation Charge for Current Booking: " + cancellationnow + " Rs\n");
                            //h.append("Cancellation Charge for Pre Booking: " + cancellationafter + " Rs\n");
                        }
                    }

                    allNames.add(h.toString());
                }

            }
            final ArrayAdapter<String > adapter1=new ArrayAdapter<String>(getContext(),R.layout.ratecard_resource,allNames);
            l1.setAdapter(adapter1);
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {
        // Another interface callback
    }
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        String phonenum=this.getArguments().getString("Phone");
        RateCardView = inflater.inflate(R.layout.ratecard,container,false);
        RateCardView.setBackgroundColor(Color.WHITE);
        Spinner spinner = (Spinner) RateCardView.findViewById(R.id.city_spinner);
        ArrayAdapter<CharSequence> adapter= ArrayAdapter.createFromResource(getContext(),R.array.city_names,android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
        spinner.setOnItemSelectedListener(this);


        //  return inflater.inflate(R.layout.previousride,container,false);
        return RateCardView;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        getActivity().setTitle("Home Activity");
    }


}

class HttpGetRequest4 extends AsyncTask<String, Void, String> {

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

