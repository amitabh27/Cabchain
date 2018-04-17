package com.example.kulka.cabchain;

import android.graphics.Color;
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

import java.util.ArrayList;

/**
 * Created by kulka on 3/15/2018.
 */

public class KnowYourRides extends android.support.v4.app.Fragment {
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        String phonenum=this.getArguments().getString("Phone");

        final View KnowYourRidesView = inflater.inflate(R.layout.knowyourrides,container,false);
        KnowYourRidesView.setBackgroundColor(Color.WHITE);


        //  return inflater.inflate(R.layout.previousride,container,false);
        return KnowYourRidesView;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        getActivity().setTitle("Home Activity");
    }


}
