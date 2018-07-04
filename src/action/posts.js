import {getPosts} from '../Firebase';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTKEY = 'FETCH_POSTKEY';

 //이 함수를 호출하면 thunk가 함수를 호출하고 redux의 dispatch메소드를 호출하고 그다음 Posts레퍼런스에서 값 이벤트를 받으면 타입과 페이로드를 dispatch한다.
 //전체 post를 가져온다.
export const fetchPosts = () => {
    return async dispatch => {
        getPosts().on("value", snapshot => {
            const posts = [];
            snapshot.forEach(ss => {
                posts.push(ss.val());
            });         
            posts.reverse();//배열을 뒤집어 가장 최근글을 처음에 보여준다.
            dispatch({
                type: FETCH_POSTS,
                payload: posts           
            });        
        }); 
    };
};

//key값만 얻는다.
/*export const fetchPostKey = () => {
    return async dispatch => { 
        getPosts().on("value",snapshot => {
            const postKey = snapshot.val();
            const postsKey = [];
            Object.keys(postKey).forEach(key => {
                postsKey.push(key);
            });
            dispatch({
                type:FETCH_POSTKEY,
                payload: postsKey
            });
        });   
    };
};
*/


//BlogPost.js에서 postId를 매개변수로 받아서 개별 post를 가져온다.
//조건문으로 해당 postId와 일치하는 데이터만 저장한다.
/*
export const fetchPost = (id) => {
    const getPost = () => {return fire.database.ref('posts/' + id)};
    return async dispatch => {
        getPost.on("value",snapshot => {
            const post = [];
            snapshot(ss => {
                post.push(ss.val());
            }); 
            console.log(post);
            dispatch({
                type:FETCH_POST,
                payload: post
            });
        });
    };
};
*/