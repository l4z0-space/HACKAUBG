package com.example.app;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

public class SecondScreen extends AppCompatActivity {

    private AlertDialog.Builder dialogBuilder;
    private AlertDialog dialog;
    private EditText limit;
    private Button limit_set;
    private TextView addButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.second_screen);
         addButton = (TextView)findViewById(R.id.addButton);
//
//        addButton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                // TODO redirect to website
//            }
//        });
//
//        TextView dailyLimit = (TextView)findViewById(R.id.dailyLimit);
//        dailyLimit.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                // TODO change daily limit
//            }
//        });
    };
    public void createLimitDialog() {
        dialogBuilder = new AlertDialog.Builder((this));
        final View limitPopUp = getLayoutInflater().inflate(R.layout.popup, null);
    }
}
