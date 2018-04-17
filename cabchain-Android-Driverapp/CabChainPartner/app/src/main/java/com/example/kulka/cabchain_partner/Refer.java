package com.example.kulka.cabchain_partner;

import android.app.Fragment;
import android.content.DialogInterface;
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
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.kulka.cabchain_partner.R;

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

public class Refer extends android.support.v4.app.Fragment implements DialogInterface.OnClickListener {

    String msg,phonenum,username,email;
    View ReferView;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        phonenum=this.getArguments().getString("Phone");
        username=this.getArguments().getString("Username");
        email=this.getArguments().getString("Email");
        ReferView = inflater.inflate(R.layout.refer,container,false);
        ReferView.setBackgroundColor(Color.WHITE);
        Button btn=(Button) ReferView.findViewById(R.id.button3);
        btn.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        EditText mEdit;
                        mEdit = (EditText) ReferView.findViewById(R.id.msg2);
                        Log.v("EditText", mEdit.getText().toString());
                        msg = mEdit.getText().toString();


                        phonenum = mEdit.getText().toString();

                        String myUrl = "https://cabchain.herokuapp.com/users/promotionalsms/" + username + "/" + phonenum + "/" + msg;
                        String result;

                        HttpGetRequest6 getRequest = new HttpGetRequest6();
                        try {
                            result = getRequest.execute(myUrl).get();
                            Log.d("ReceivedJSONResponse", result);
                            mEdit.setText("");
                            Toast.makeText(getContext(),"Referral has been sent!",Toast.LENGTH_LONG).show();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }

        );



        //  return inflater.inflate(R.layout.previousride,container,false);
        return ReferView;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        getActivity().setTitle("Home Activity");
    }


    @Override
    public void onClick(DialogInterface dialogInterface, int i) {

    }
}

class HttpGetRequest6 extends AsyncTask<String, Void, String> {

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

