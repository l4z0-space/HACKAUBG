package com.example.app;

import android.app.Activity;
import android.os.Bundle;

import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;

import com.google.android.material.textfield.TextInputEditText;

public class PopupFragment extends DialogFragment implements View.OnClickListener {
    Button yes_button;
    ImageView no_button;
    Communicator communicator;
    TextInputEditText editText;

    public PopupFragment(Communicator communicator) {
        this.communicator = communicator;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        setCancelable(false);
        getDialog().setTitle("Title");

        View view = inflater.inflate(R.layout.fragment_popup, null, false);

        yes_button = (Button) view.findViewById(R.id.saveButton);
        no_button = view.findViewById(R.id.closeButton);
        editText = view.findViewById(R.id.editText);


        // setting onclick listener for buttons
        yes_button.setOnClickListener(this);
        no_button.setOnClickListener(this);

        return view;
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.saveButton:
                dismiss();
                //send post request
                communicator.message(editText.getText().toString());
                break;

            case R.id.closeButton :
                dismiss();
                break;
        }

    }

    public interface Communicator {
        public void message(String data);
    }

}
