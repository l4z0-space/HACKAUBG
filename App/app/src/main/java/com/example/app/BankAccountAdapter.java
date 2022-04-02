package com.example.app;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;

import java.util.List;

public class BankAccountAdapter extends RecyclerView.Adapter<BankAccountAdapter.ViewHolder>{

    List<BankAccount> list;

    public BankAccountAdapter(List<BankAccount> accountList) {
        this.list = accountList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.bank_account, parent, false);
        return new ViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        BankAccount ba = list.get(position);
        holder.tv.setText(ba.name);
        Glide.with(holder.itemView).load(ba.image_url).into(holder.iv);
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tv;
        ImageView iv;
        ViewHolder(View view) {
            super(view);
            tv = view.findViewById(R.id.newTaskText);
            iv = view.findViewById(R.id.imageView);
        }
    }
}

