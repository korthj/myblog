import * as firebase from 'firebase'

let database;

let config = {
    apiKey: "AIzaSyC3eCRkiSPT-XRzQEpHQy7kPnazpqieyfA",
    authDomain: "myblog-201805.firebaseapp.com",
    databaseURL: "https://myblog-201805.firebaseio.com",
    projectId: "myblog-201805",
    storageBucket: "myblog-201805.appspot.com",
    messagingSenderId: "143506485432",
};

//FireBase RealTimeDB의 경우 .set을하면 지정위치에서 하위노드를 포함하여 모든 데이터가 덮어씌워진다.
export const fire = () => {
    if(!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    database = firebase.database()
};

export const getFireDB = () => {
    return database.ref('/').once('value')
};
//게시물을 생성할때 키 값을 가지고와서 1씩 더한다
export const setPosts = () => {
    return database.ref('posts/').push({"content" : " abc","title" : " abc","userId" : " abc","category" : "" })
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
export const getPost = (postId) => {
    return database.ref('posts/' + postId)
}