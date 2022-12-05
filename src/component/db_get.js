import React, { Component } from 'react';
import axios from 'axios';

export function getData(){
    return new Promise(function(resolve) {
        axios.get('http://localhost:4000/quizdb')
            .then(res => {
                resolve(res.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    });
};
   