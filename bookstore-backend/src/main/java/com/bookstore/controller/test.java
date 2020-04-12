package com.bookstore.controller;


import java.util.HashSet;
import java.util.Scanner;

class main{
    //static String input ="fsdfdfrbbfsddfsfzccu";

    public static void main (String args[])
    {
        int k,t,l,m=0;
        k=371;
        t=k;
        while(k!=0)
        {
            l=k%10;
            k=k/10;
            m=m+(l*l*l);
        }
        System.out.print(t+" "+m+"      ");
        if(t == m)
            System.out.println("true");
        else
            System.out.println("false");
    }

}
