package com.example.app;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.security.keystore.KeyGenParameterSpec;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;


import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.messaging.FirebaseMessaging;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;

public class MainActivity extends AppCompatActivity {

    private Button loginBtn;
    private TextView resultTextView;
    private EditText emailField;
    private EditText passField;
    private RequestQueue requestQueue;
    private static final String TAG = MainActivity.class.getSimpleName();

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getSupportActionBar().hide();

        if(Utils.readFromFile(getApplicationContext(),"token.txt").toString().length() > 10){
            JSONObject object = new JSONObject();
            Utils.postReq(object, "https://hackaubg.herokuapp.com/plaid/link", getApplicationContext());
            File dir = getFilesDir();
            File file = new File(dir, "token.txt");
            boolean deleted = file.delete();
            Intent menuIntent = new Intent(this, SecondScreen.class);
            startActivity(menuIntent);

        }else {
            setContentView(R.layout.activity_main);
            resultTextView = (TextView) findViewById(R.id.myText);
            loginBtn = (Button) findViewById(R.id.login_button);
            emailField = (EditText) findViewById(R.id.email);
            passField = (EditText) findViewById(R.id.pass);
            RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());

            resultTextView.setText(Utils.readFromFile(getApplicationContext(),"token.txt").toString());
            //Click Listener for POST JSONObject
            loginBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    login(emailField.getText().toString(), passField.getText().toString());
                }
            });
//            FirebaseInstanceId.getInstance().getInstanceId().addOnSuccessListener(this, instanceIdResult -> {
//                String newToken = instanceIdResult.getToken();
//                Log.e("newToken", newToken);
//                fbTest.setText(newToken);
//            });

            FirebaseMessaging.getInstance().getToken()
                    .addOnCompleteListener(new OnCompleteListener<String>() {
                        @Override
                        public void onComplete(@NonNull Task<String> task) {
                            if(!task.isSuccessful()){
                                System.out.println("Fetching FCM registration token failed");
                                return;
                            }
                            String token = task.getResult();
                            Log.d("MyToken",token);
                            emailField.setText(token);
                            System.out.println(token);
                        }
                    });

        }

        resultTextView.setOnClickListener(new View.OnClickListener() {
            public void onClick(View arg0) {
                Intent viewIntent =
                        new Intent("android.intent.action.VIEW",
                                Uri.parse("http://www.stackoverflow.com/")); /* TODO write our webpage */
                startActivity(viewIntent);
            }
        });
    }
    public void register(String first_name, String last_name, String email, String password) {
        RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
        JSONObject object = new JSONObject();
        try {
            object.put("first_name",first_name);
            object.put("Last",last_name);
            object.put("email",email);
            object.put("password",password);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        // Enter the correct url for your api service site
        String url = getResources().getString(R.string.register_url);
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url, object,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        resultTextView.setText("String Response : "+ response.toString());
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                resultTextView.setText("Error getting response");
            }
        });

        requestQueue.add(jsonObjectRequest);
    }
    public void login(String email, String password) {
        RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
        JSONObject object = new JSONObject();
        try {
            object.put("email",email);
            object.put("password",password);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        // Enter the correct url for your api service site
        String url = getResources().getString(R.string.login_url);
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url, object,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        resultTextView.setText("String Response : "+ response.toString());
                        try {
                            Object accessToken = response.get("token");
                            resultTextView.setText("Success");
                            Utils.writeToFile(accessToken.toString(),"token.txt",getApplicationContext());
                            Intent menuIntent = new Intent(getApplicationContext(), SecondScreen.class);
                            startActivity(menuIntent);
                        }catch(Exception e){
                            Toast.makeText(MainActivity.this, "No Token", Toast.LENGTH_SHORT).show();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                resultTextView.setText("INVALID USERNAME OR PASSWORD");
            }
        });
        requestQueue.add(jsonObjectRequest);

    }
    // Get Request For JSONObject
    public void getUsers(){
        RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
        try {
            String url = getResources().getString(R.string.register_url);
            JSONArray object = new JSONArray();
            JsonArrayRequest jsonObjectRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
                @Override
                public void onResponse(JSONArray response) {
                    resultTextView.setText("Resposne : " + response.toString());
                    Toast.makeText(getApplicationContext(), "I am OK !" + response.toString(), Toast.LENGTH_LONG).show();
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    resultTextView.setText("Resposne : " + error.toString());
                    Toast.makeText(getApplicationContext(), "Error", Toast.LENGTH_LONG).show();
                }
            });
            requestQueue.add(jsonObjectRequest);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

