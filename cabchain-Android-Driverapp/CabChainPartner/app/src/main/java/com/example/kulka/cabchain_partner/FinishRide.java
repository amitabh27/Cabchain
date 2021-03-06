package com.example.kulka.cabchain_partner;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.RatingBar;
import android.widget.Toast;

import org.json.JSONObject;

public class FinishRide extends AppCompatActivity {

    String phone,userphone,ridetrackingnno;
    public RatingBar ratingBar;
    public RatingBar ratingBar1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_finish_ride);
        phone=getIntent().getStringExtra("Phone");
        userphone=getIntent().getStringExtra("UserPhone");
        ridetrackingnno=getIntent().getStringExtra("RideTrackingNo");
        ratingBar = (RatingBar) findViewById(R.id.ratingBar);
        ratingBar1 = (RatingBar) findViewById(R.id.ratingBar1);
    }

    public void rateMe(View view){
               String behaviour=String.valueOf(ratingBar.getRating());
               String overall =String.valueOf(ratingBar1.getRating());

        if(overall.equals("0.0") && behaviour.equals("0.0")) {
            Toast.makeText(this,"Please rate the customer!",Toast.LENGTH_SHORT).show();
        }else{
            String username=getIntent().getStringExtra("Username");
            String email=getIntent().getStringExtra("Email");
            String b=behaviour.substring(0,behaviour.indexOf("."));
            String o=overall.substring(0,overall.indexOf("."));
            String url = "https://cabchain.herokuapp.com/users/updateuserratings/" + userphone + "/" +o+ "/" +b+"/"+ridetrackingnno;
            HttpGetRequest getRequest1 = new HttpGetRequest();
            try {
                Intent i=new Intent(this,HomeActivity.class);
                i.putExtra("Phone",phone);
                i.putExtra("Username",username);
                i.putExtra("Email",email);
                String result = getRequest1.execute(url).get();
                Log.d("Result : ",result);
                startActivity(i);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
