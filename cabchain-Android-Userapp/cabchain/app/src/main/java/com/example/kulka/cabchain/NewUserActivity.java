package com.example.kulka.cabchain;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class NewUserActivity extends AppCompatActivity {
    String phone,name,email;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_user);
     //   String s = getIntent().getStringExtra("Phone");
      //  Log.d("PhoneNo",s);
    }
    public void sendMessage(View view){
        phone= getIntent().getStringExtra("Phone");
        EditText mEdit1,mEdit2;
        mEdit1   = (EditText)findViewById(R.id.name);
        mEdit2   = (EditText)findViewById(R.id.email);


        Log.d("EditText1", mEdit1.getText().toString());
        Log.d("EditText2", mEdit2.getText().toString());

        name=mEdit1.getText().toString();
        email=mEdit2.getText().toString();

        String myUrl = "https://cabchain.herokuapp.com/users/useradd/"+phone+"/"+email+"/"+name;
        String result="";

        HttpGetRequest2 getRequest = new HttpGetRequest2();
        try{
            result = getRequest.execute(myUrl).get();
            Log.d("ReceivedJSONResponse==>", result);

            Intent show;

            show = new Intent(this, HomeActivity.class);
            Log.d("HomeNavigation", "done");
            show.putExtra("Phone",phone);
            show.putExtra("Username", name);
            show.putExtra("Email", email);
            startActivity(show);



        }
        catch(Exception e)
        {
            e.printStackTrace();
        }

    }
}
class HttpGetRequest2 extends AsyncTask<String, Void, String> {

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
