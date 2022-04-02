package com.example.app;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.SharedPreferences;
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

    private RequestQueue requestQueue;
    private static final String TAG = MainActivity.class.getSimpleName();

    private AlertDialog.Builder dialogBuilder;
    private AlertDialog dialog;
    private EditText limit;
    private Button limit_set;


    private EditText passField;
    RequestQueue requestQueue;
    private static final String TAG = MainActivity.class.getSimpleName();

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if(readFromFile(getApplicationContext()).toString().length() > 10){
            Toast.makeText(this, "ses", Toast.LENGTH_SHORT).show();
        }else {
            setContentView(R.layout.activity_main);
            resultTextView = (TextView) findViewById(R.id.myText);
            loginBtn = (Button) findViewById(R.id.login);
            emailField = (EditText) findViewById(R.id.email);
            passField = (EditText) findViewById(R.id.pass);
            RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());

            resultTextView.setText(readFromFile(getApplicationContext()).toString());

            //Click Listener for POST JSONObject
            loginBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    login(emailField.getText().toString(), passField.getText().toString());
                }
            });
        }
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
                            resultTextView.setText("String Response : "+ accessToken.toString());
                            writeToFile(accessToken.toString(),getApplicationContext());
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

        TextView addButton = (TextView)findViewById(R.id.addButton);
        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // TODO redirect to website
            }
        });

        TextView dailyLimit = (TextView)findViewById(R.id.dailyLimit);
        dailyLimit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // TODO change daily limit
            }
        });

    }

    public void createLimitDialog() {
        dialogBuilder = new AlertDialog.Builder((this));
        final View limitPopUp = getLayoutInflater().inflate(R.layout.popup, null);
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
    private void writeToFile(String data,Context context) {
        try {
            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(context.openFileOutput("token.txt", Context.MODE_PRIVATE));
            outputStreamWriter.write(data);
            outputStreamWriter.close();
        }
        catch (IOException e) {
            Log.e("Exception", "File write failed: " + e.toString());
        }
    }
    private String readFromFile(Context context) {

        String ret = "";

        try {
            InputStream inputStream = context.openFileInput("token.txt");

            if ( inputStream != null ) {
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
                BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                String receiveString = "";
                StringBuilder stringBuilder = new StringBuilder();

                while ( (receiveString = bufferedReader.readLine()) != null ) {
                    stringBuilder.append("\n").append(receiveString);
                }

                inputStream.close();
                ret = stringBuilder.toString();
            }
        }
        catch (FileNotFoundException e) {
            Log.e("login activity", "File not found: " + e.toString());
        } catch (IOException e) {
            Log.e("login activity", "Can not read file: " + e.toString());
        }

        return ret;
    }
}

