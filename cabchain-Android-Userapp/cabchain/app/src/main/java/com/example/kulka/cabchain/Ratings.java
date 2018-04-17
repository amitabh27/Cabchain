package com.example.kulka.cabchain;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.RatingBar;
import android.widget.Toast;

import com.google.android.gms.maps.model.LatLng;

import org.json.JSONObject;

public class Ratings extends AppCompatActivity {

    String phone,username,modelname,driverphone,email,ridetrackingno,otp,GPSstart,GPSend,userphone,customername,driverlatitude,driverlongitude,gpsstart,gpsend,fare,time,distance;
    String driverfirstname,driverlastname,contactno,modeldesc,modeltype,driverlocation,sourcelocationlat,sourcelocationlong,destlocationlat,destlocationlong,licenseplate;
    public RatingBar ratingBar;
    public RatingBar ratingBar1,ratingBar2,ratingBar3,ratingBar4;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ratings);


        otp=getIntent().getStringExtra("otp");
        phone = getIntent().getStringExtra("Phone");
        username = getIntent().getStringExtra("Username");
        email = getIntent().getStringExtra("Email");
        ridetrackingno=getIntent().getStringExtra("RideTrackingNo");
        driverfirstname=getIntent().getStringExtra("DriverFirstName");
        driverlastname=getIntent().getStringExtra("DriverLastName");
        contactno=getIntent().getStringExtra("DriverPhone");
        modeldesc=getIntent().getStringExtra("ModelDesc");
        modeltype=getIntent().getStringExtra("ModelType");
        modelname=getIntent().getStringExtra("ModelName");
        driverphone=getIntent().getStringExtra("DriverPhone");
        licenseplate=getIntent().getStringExtra("LicensePlate");
        GPSstart=getIntent().getStringExtra("GPSstart");
        GPSend=getIntent().getStringExtra("GPSend");
        driverlocation=getIntent().getStringExtra("driverLocation");
        fare=getIntent().getStringExtra("fare");
        distance=getIntent().getStringExtra("distance");

        ratingBar = (RatingBar) findViewById(R.id.ratingBar);
        ratingBar1 = (RatingBar) findViewById(R.id.ratingBar1);
        ratingBar2 = (RatingBar) findViewById(R.id.ratingBar2);
        ratingBar3 = (RatingBar) findViewById(R.id.ratingBar3);
        ratingBar4 = (RatingBar) findViewById(R.id.ratingBar4);
    }

    public void rateMe(View view){
        String behaviour=String.valueOf(ratingBar.getRating());
        String overall =String.valueOf(ratingBar1.getRating());
        String ds =String.valueOf(ratingBar4.getRating());
        String tp =String.valueOf(ratingBar3.getRating());
        String cv =String.valueOf(ratingBar2.getRating());

        if(overall.equals("0.0") && behaviour.equals("0.0") && ds.equals("0.0") && tp.equals("0.0") && cv.equals("0.0")) {
            Toast.makeText(this,"Please rate the customer!",Toast.LENGTH_SHORT).show();
        }else{
            String username=getIntent().getStringExtra("Username");
            String email=getIntent().getStringExtra("Email");
            String b=behaviour.substring(0,behaviour.indexOf("."));
            String o=overall.substring(0,overall.indexOf("."));
            String dss=overall.substring(0,ds.indexOf("."));
            String tpp=overall.substring(0,tp.indexOf("."));
            String cvv=overall.substring(0,cv.indexOf("."));
            String url = "https://cabchain.herokuapp.com/users/updatedriverratings/" + phone + "/" +o+ "/" +b+"/"+dss+"/"+tpp+"/"+cvv;
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
