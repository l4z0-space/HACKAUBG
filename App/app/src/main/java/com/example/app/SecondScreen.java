package com.example.app;

import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TableLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.AuthFailureError;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SecondScreen extends AppCompatActivity implements PopupFragment.Communicator {

    private AlertDialog.Builder dialogBuilder;
    private AlertDialog dialog;
    private Button limit_set;
    private TextView addButton;
    private TextView changeLimit;
    private RecyclerView rv;

    private float progress = 0;
    private float limit = 100;
    private ProgressBar progressBar;
    private TextView textViewProgress;
    private float balance;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.second_screen);
        getSupportActionBar().hide();
        //addButton = (TextView)findViewById(R.id.addButton);
//        addButton.setTextColor(ContextCompat.getColor(getApplicationContext(), R.color.white));

        progressBar = findViewById(R.id.progress_bar);
        textViewProgress = findViewById(R.id.balance);

        textViewProgress.setText(String.valueOf(balance));

        List<BankAccount> list = new ArrayList<>();
        BankAccount ba1 = new BankAccount("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png", "American Express");
        BankAccount ba2 = new BankAccount("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEWzHjD/zAL/1ACyGzCtADL/0gD/zgD/0ACxFTG5Ly3/1QDJYCewDjGsADKvADGyGDD8xQX4vgq+QizlmhjxsRDTdCLsqRXYgCC3Ky7eix3IWyfrpRTEUCi1Iy/1uQ3mnBi9PSv/2wDhkhvbhx/RcCP2uwzBSSrMZiXPbCTYgSDGVyi7Ny3DTynVeiHurBPARioRKs7BAAAQPElEQVR4nO1caXfiurLFtgbjeCKQhEAgCSQhYcr//3dXQ5Ukywbsft1vrXuX9oeT00aWta1SqVSDR6OAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgP8pJFWVDLzDQ99rN3HhnlvP72qDTdOSlOP7+zkheYU33yY4HzcwF7ckYw9Ju91NiI4670muP7+rDbQsq4/lJIsF6Pr5l6Ti0mg8Xt1iWJ7VPYhsTUYjEjWuxe+iq/L1PR6CbEZG5TJrXa5J8/n5pt3vO+kYaD6fcspZpMB4NnshCZlk79v8FsMljxywmWRYM/daFAtZKKeNdjfBzoLha+seNvEZPrf7pR0MyQdvNmTZtNjSiD71YOjQYRwY2muMsUwxpM2L/r8ADYZL6jaT7XiL4abVhnUwJJuM6QFSAT1kOhN/bjPMp3VEDb/J5LEU3a0n9lo0mdRqJPWkpnooLBYXJ1Fs5sWgjmJsIxjKeyY1NovUXTOf4bbRhso2viSLefjJ9IPr15+Pj6fNZ8zV2PowHOWkfIIH8ENBSvXGCPmOUaoEdDtCDvo91vtSXr0DsYlXxKCcf3xSZKjuIXfwsuI7gn01ny/wBbNIT51tqjdFkNd3pMwFSvK2zOCO2wwFik8YeWGvEb3u2Np9HJmp13bQnZKNphi7ui/Jiw1Fhrr3me597fTug2htwKLuNvpnVqeGTVXs6ACG+ZNuHR/sUNMvPYnx3Bl+KQWDL2Hs+Ym2GSIly5A86tH78ukC9FhLD2kkiXpQvE/dW+7i/gyTsWZDXc1bTPRyfrDX0r1sFy/gQflDk2EO8qWa/U2G6UKNjze5kGfam6FQLaz1ABAc/mivKe3PonLUyTCfzs4zZWrIqf6bDEFYPIajsu6lS90uouxQ2fv1ImNOv7lU63x6gSFZc05T5PRXGf50SCmMuifDZN4S03QHCtYIJVyyz/EZCrHm6rf8mTL+NxnqB7G6arBJKi72zp9eDEFJuk8gaOvwTe5ectSdL6XiV80w/aZiDnGq/8I63MPWVX+TMrVqTQ6o5xxatXgPYirejyZo95AkpQ3CHkOlDjTDUSp3RjOO/zPDEQ5G7PjT3UrsiTBKuS33IzhKVnoD5c9wg5wGQPam+0s/5KX4aBaDZZgmVV5K3cvTdt9/gaE1cIXVFk9eT7/m/NQbvpiSs7FzUdJVE+ZYVIbh1+Ht66GWN/wjhridWZZ0tr0n+ZCjsBntr3o1yYraDvXQtDZyhNTcE6kjm3pD/4jhKP/IoiYYzSantKeIupRATFF76UlcyXell2r8ZYXDMLT4VwxH5JQx/2GMshPpP40glqBXlETyDZg133LcyipoDMEwtKemf8ZwRPZ4snE5xutVxxO7kX/goqpQ8cR7bVrzpdCLySGOHE3kMmSf6/WE8n/LcJTm2yjmPklez/tqnGQEYioXmpJIFhG9Dyk7Ld/K31GvNhiq09NqGv9bhuJ55W7JYtpkySfllVs6ByKVpZJIYZ6VeiVKM0YZ4mzinm4a+2FSLLllWDkuv0sM3TaXGIo2ldM2LcnX6XUiVKn1aNCbjhoE7oBiw9PKWfACJ46Y1+o3a/XW3PGre7vjj97e3sxJ7BJD0eYN21xgmMg24u9K/tXSIzZekrz8nDmuSsb6MkzSGMS0VOdFKZvAWjw4V0vStcxbVpuccLDa9u/K13aNYXqUPja81M0wOYg27/NE9he/W2lM0pyk359oON/1VTZ4zq4JCikePQUz5X5rHvhblvensbw/6M2zhbJdo+sM06MgQQXDl7h9skiLE0zJ82AxfRmbMwSYOvQkn+Vbua3TU0xjNcdywm8xlCeimwylfkeGQra8ARM4Nr721TVJykFMtZDKh4FFzh6VkHruCo9h+vDzs1UM5Xu5xVAu8VsM1dJAhixqTRVRilBtZv1gxFQJqXplyRispTpqCWnLi5HmuRqEso9uMZRif4uhWi3IMKLP/laiJcweyW8CD73KQIlf9HF9Yncfemq+RZ+huf50m6FaYjcYVsrIMAyFMeLNoh6cP6xryO1mimcI1+merTqYtBkmVXTb11ac+U2GhTozWYaMvTX1ABD/7X+OIjaGgesanYptMRPNXzv9peVaOTetvxTcXPb2JC22slvLEBeIwzAtHrS70DAUpvY3sQo1n6tlyD6v2UEe0jvrgceDro3SuH7FRNhpxYvxeRfW6b36rvVg0eeNrlt2Nq2q/RnMQWyzB7fXp2mTH5fgO7IMxaPWu5xIr7f474M297N9b9t7JP1raCjUnvxEeIjSBA9R7YQ7aouIunGLae00i0wbHgMhwTDfXm/jaBo1YzE7b04fD9sl0w+KpwOm0PEW2IOumVfrPJMMs36xJ97ZzFyQDJ/p1TaGIX2AiVfhJw5zES8HEbR04i8z9Sm+yw8rDfoodRUX4ofNNorhjbikYZiT57jZVnA9DSMoJpGqqG3mREgIBIkzJ2SuDMY/igE328SkMwbcDAhruzQTkyUjTnh4ElMZ8818gBsDhj630Xy8tILgekMnH/44ju8F7G+2UWeUg47XV2T+c46odAtF681dWQ7MylB82tkQnQkSf56L8SdtbM5FIlTv/HAYi0N3PkSH/nfhWkJKQEBAQEBAQEBAQEDA/yiSVKLXYUg3HVqLYJDeQutR/rAu3nl5TGlJVse7791+XJb6AdUFulVO8vGLbPpbkfJPzr6r3d117OaW4Ju+dGgMJd1fuHP/NupO78nLxWsdx5TSOIuWuzKXYVZxQ7sYISX32xnTTWM6md6Vg1JpJKr7d3od79Z3TmaZvJI9eqGWuPtOOabNfSstpCIftc08YDyuH4qkEJ28+xHPtNitYyePXrSNttVAH5QKUV+FyXizCUqN9GEVIL3oNuTZ49xLnTx8xs0bZOqIzI2zyZDQ8e8EWxpHKqN8SCqNYphx7sRluIbjmLUM82fwUDej+mRCr/XA2X0jh3lh4vC2voCruJ7HkGyBH49pbYsBWDzrn0ozkg7Q83K5nGAG0GypMfuk6IS1DE0kgzWqBvKpuAGz4dgae4iwAxaN7EvP73BaaDR9WCweXpVjX8f1GgwJhC8437xUMp5xOE3gSn0YRLEsS1JA8j1dkFJCRkj2r3oshqEbvmmsmFzeAc5wvi2gh+L+FcMCr+aFpL8xSttTWeZpKu49oQA0GJJHiOAtE8gsrfLiBNMYjYcqVVyN1Bl5So76zSJDCAeqMZ9bPvWikR6nOrUFFxjaSVIQAxbdm/hteYCLLkOygYqB58ItGfgCinW/jfQ6QzE3OkMfGEImqmaZtRQ74T5DuZKgNOIbI3YbXMm/TrN0DvlJlmG6gLTXZbMOI7/T1+nAuEyLIWQkqfAlMtTZXxzSIFqJHl0Mk6qZFmLiOkJEG+OGmK5lCDlZLPLnCoOz2WKYnHoMq9/jUebxqfxmZKgTa84F1Li0MkA6GGIyAKYUYEiS+fVNetyWYY6T38rlxh3reiLcTYZEljMSOQfUMNTFHfRbx9ijeOe9w6sMISiZY7zOTzFI5rTBsMQE11FruWEOc/+EqE6GskiPqBFylmmbRufrsxzS59ux/S6GZexOhalzoKvWKn4VpouRvBSqyzoUGiSdd//Wm6GcOsgbmq5nnyrLTqcSyywk2BXjQ9Pi7GKIWSnwkjBu2pGOWR0/Z7PPF9TakDjRVXCQzLF2bVCQpslQZadFpjJP11So6hWZEAaWjZv33c0wKQ8Mitc0I0zR6cpHq1QiA/wDhdTPaFMocG/x10lPhmWaknHkZi05/apMaZ3OIwS2qWuQ4bbINUgKWzmLdf6kqeQwm8el0bx12r/4oNnl93SbIf9ZLO6e5cA8hnr1aXsUqsG8cQJDdv7ZKmxmkAjK+R72CjPw43WG6Q4tha6iRJT1AVltDsOIoy3sMdQrQ5cpYjq/l66GVigcnWD+xNlijLUqe2TomgsV8ZCYOp7WpqKQg4XpJ9v1ZGjQZKj1DNZfwD5uTXKXYbOT9fObOeukxohzhK/6rScN1PMEd8PuPQ9zOIbtiIYhw2NPk6FOZMPcKCxQbOR9unMIh6n6fBoXjqGLDKnL8CtjDWQ3GW6vzfAthuL09DhjtMVQa0EO7pd8AbqmsbnDm308PT09T9e65Jpm55WZaDuHY5ehJz1igqHq8NYcDklrs7p0IdPLTtRjqDImBf3jXuMIc/HhWtmoS4kquV5t9DGJ28OhSVJzq46rr3csLFKvJH4fJ6acg3VxMKbftSKHywzVfiiPBA2GYO4yzOXB87JbpO3thwnZg+1hTgHWCdLY5g7j8c6cqXaHg6n+FQ27tCV+C6J/DnSbobQSXYa6/rADmZPg2drxCSahGhOtBM+Gm+uoUkhyfPwTSRJb2NqYbPugNfTSs4a0i6Hc3l2GWG/sADZdJw25bdPoZOyIGtvD7NWt7GUwyfHwhsYP7TJbClzNN3bVqwzJZ4OhdqbxpQMoWuROgUyLIWzN9l1f1vNp85CPW16nefcLSrF1fhvEcJJlmfWtKHUnFl1pQKrMl7c2Q5h665jTCksyefP8xJAGiQyxYZcyRUU7II29g+FIsjA/6rloLh5M4bYau80QdgfFsFLRATSa/QoKY0Pg8QnXWtOo0D+BBLfe0jCGzcerVdc8jOJRzy6GDoZ6d5AMq6/dTqwpNMf8kw9KnmGYgjvG8dJhp2D68YGOmmsM9e7k9wh60Q6hg6EeDBcM82lGpdjncCzyHEwlmCn2kE9mILf33oDMFHZ/cOk2ww7lpT+T4XPHfdfMxmWGYt8Sgq627/wbV6Kb4lslzHcnJmOw3OtmaKcAZ108oNRC9Ueg8klYJF42aVro9xt7OavpAu54LJQ7LCmwAM5qKCiWWBdJIZSz0hqmUjx+MhZrnq7xonWgoduQrxPLpSqeYSaGyGgllEq1iLCc92Es/42/5eMFlgYcpfYBZS7/F0uB6Xp3EH0kxh7+kr/KUaHvMP4oPyh8SCRJa2QzOxaltO/Kb7zUdAk/AMXou8jTtKrSnLzNYDBDDLbq913sDLaUmMZZ9g6yKrOsTc2muJ69K9koX9UteAeTt2Qm1ZyphsqiMq412Rj8a9Uc+bC4Xm42Uzgoc5/hiHzH4CKoN7vj/dfiZ5aZNP0Bi7Aruoar0dZz4A9qx+jx8S+9WTkfL7D+tXS1xl6ZsY5YvG06TCXK3xrkgqsEb4qRqKehXjbmI7YMmz8Yhq1bPGiG6dF+LSAzbrOEbL3KbBZPjsVJPMsLr6XlM/UL1Xl2Pgza6ocyVK64PgwVn/KUaZcIz9wCu3I+5TGetMX8fH6QVB6rfYai5Whbyxpu3VSWIbx+kUE7/UhrGh/Vpd8cTXMdMGHl72stJKxeHptlvmW6m67lNydY/fhzr79SYvt3W+bk6+dxIpvyera5Swfz+9eohAkrQ5T+0NWnHhPx5/anSmQNdw5Nh8bU/p9w+YuW/b3WoQohICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOAC/gOYciUmIV2wZQAAAABJRU5ErkJggg==", "Wells Fargo");
        BankAccount ba3 = new BankAccount("https://static.wikia.nocookie.net/earthmc2820/images/3/34/Bofa_lo1_digital_v-1.png/revision/latest?cb=20200306142338", "Bank of America");

        list.add(ba1);
        list.add(ba2);
        list.add(ba3);
        BankAccountAdapter adapter = new BankAccountAdapter(list);
        rv = findViewById(R.id.bank_accounts);
        rv.setAdapter(adapter);
        rv.setLayoutManager(new LinearLayoutManager(this, RecyclerView.VERTICAL, false));
        getMoney();
        PopupFragment popupFragment = new PopupFragment(this);
        textViewProgress.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                popupFragment.show(getSupportFragmentManager(),"");
            }
        });

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

    public  void getMoney(){
        Context context = getApplicationContext();
        String url = getResources().getString(R.string.money_url);
        RequestQueue requestQueue = Volley.newRequestQueue(context);

        try {
            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    int num = 0;
                    try {
                        num = (Integer) response.get("progress_number");
                        int curr_num = (int) limit - num;
                        progressBar.setProgress(curr_num);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    textViewProgress.setText(String.valueOf(num));
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(context, error.toString(), Toast.LENGTH_LONG).show();
                }
            })
            {
                @Override
                public Map<String,String> getHeaders() throws AuthFailureError {
                    Map<String, String> params = new HashMap<String, String>();
                    params.put("Content-Type", "application/json");
                    params.put("authorization", "bearer "+ Utils.readFromFile(context,"token.txt").trim());
                    return params;
                }
            };
            requestQueue.add(jsonObjectRequest);

        } catch(Exception e){
            e.printStackTrace();
        }

    }

    @Override
    public void message(String data) {
        textViewProgress.setText(data);

    }
}
