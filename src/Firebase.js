import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

let database;

let config = {
    apiKey: "AIzaSyC3eCRkiSPT-XRzQEpHQy7kPnazpqieyfA",
    authDomain: "myblog-201805.firebaseapp.com",
    databaseURL: "https://myblog-201805.firebaseio.com",
    projectId: "myblog-201805",
    storageBucket: "myblog-201805.appspot.com",
    messagingSenderId: "143506485432",
    userId: "khj12005@yeah.com"
};

firebase.initializeApp(config);

export const fireStorage = () => {
    if(!firebase.apps.length){
        firebase.initializeApp(config);
    }
    return firebase.storage();
};

//FireBase RealTimeDB의 경우 .set을하면 지정위치에서 하위노드를 포함하여 모든 데이터가 덮어씌워진다.
export const fire = () => {
    if(!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    database = firebase.database()
};

export const todayCount = () => {
    if(!firebase.apps.length){
        firebase.initializeApp(config);
    }
    return firebase.database().ref('visitCount/').child('today')
}

export const todayReset = () => {
    if(!firebase.apps.length){
        firebase.initializeApp(config);
    }
    return firebase.database().ref('visitCount/');
}

export const totalCount = () => {
    if(!firebase.apps.length){
        firebase.initializeApp(config);
    }
    return firebase.database().ref('visitCount/').child('total')
}

export const getFireDB = () => {
    return database.ref('/').once('value')
};
//게시물을 생성할때 키 값을 가지고와서 1씩 더한다
export const setPosts = () => {
    if(!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    return firebase.database().ref('posts/')
};
//getPosts

export const getPosts = () => {
    if(!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    return firebase.database().ref().child('posts')
};

/////////////fetch post
//showpost에서 child('postId')를 구현한다.
export const getPost = () => {
    return database.ref('posts/')
}

export const deletePost = () => {
    if(!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    return firebase.database().ref().child('posts')
}
