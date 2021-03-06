package com.example.kulka.cabchain_partner;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends AppCompatActivity {
    Button mButton;
    EditText mEdit;
    Session session;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
       // sharedPreferences=getSharedPreferences(mypreferences, Context.MODE_PRIVATE);
    }
    public void sendMessage(View view){
        EditText mEdit;
        mEdit   = (EditText)findViewById(R.id.mobile);
        Log.v("EditText", mEdit.getText().toString());

        String phone;
        phone=mEdit.getText().toString();

      //  session= new Session(getApplicationContext());
       // session.setusename(phone);

        String myUrl = "https://cabchain.herokuapp.com/users/driverlogin/"+phone;
        String result;

        HttpGetRequest getRequest = new HttpGetRequest();
        try{
            result = getRequest.execute(myUrl).get();
            Log.d("ReceivedJSONResponse", result);
            JSONObject jObject = new JSONObject(result);

            if(jObject.getString("status").equals("match")){
                Log.d("status:", jObject.getString("status"));
                String username=jObject.getString("name");
                String email=jObject.getString("email");
                Intent show = new Intent(this, RegUserActivity.class);
                show.putExtra("Phone",phone);
                show.putExtra("Username",username);
                show.putExtra("Email",email);
                startActivity(show);
            }else{
                Toast.makeText(this,"Go to the website and Register yourself!",Toast.LENGTH_SHORT).show();
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }
}

class HttpGetRequest extends AsyncTask<String, Void, String> {

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

class Session {

    private SharedPreferences prefs;

    public Session(Context cntx) {
        // TODO Auto-generated constructor stub
        prefs = PreferenceManager.getDefaultSharedPreferences(cntx);
    }

    public void setusename(String usename) {
        prefs.edit().putString("usename", usename).commit();
    }

    public String getusename() {
        String usename = prefs.getString("usename","");
        return usename;
    }
}
