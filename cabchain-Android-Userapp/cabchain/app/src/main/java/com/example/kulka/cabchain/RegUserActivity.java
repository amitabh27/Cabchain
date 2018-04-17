package com.example.kulka.cabchain;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class RegUserActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reg_user);
    }

    public void sendMessage(View view){
        EditText mEdit;
        mEdit   = (EditText)findViewById(R.id.otp);
        Log.v("EditText", mEdit.getText().toString());

        String otp;
        String phonenumber = getIntent().getStringExtra("Phone");
        String username = getIntent().getStringExtra("Username");
        String email = getIntent().getStringExtra("Email");
        Log.d("Phone",phonenumber);
        otp=mEdit.getText().toString();
        Log.d("otp",otp);

        String myUrl = "https://cabchain.herokuapp.com/users/userOTPLogin/"+phonenumber+"/"+otp;
        Log.d("URL",myUrl);
        String result;

        HttpGetRequest1 getRequest = new HttpGetRequest1();
        try{
            result = getRequest.execute(myUrl).get();
            Log.d("ReceivedJSONResponse", result);
            if(result.equals("\"match\"")){

                Intent show = new Intent(this, HomeActivity.class);
                show.putExtra("Phone",phonenumber);
                show.putExtra("Username",username);
                show.putExtra("Email",email);
                startActivity(show);
            }else{
                Intent show = new Intent(this, RegUserActivity.class);
                show.putExtra("Phone",phonenumber);
                startActivity(show);
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }
}

class HttpGetRequest1 extends AsyncTask<String, Void, String> {

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
