import {getPosts} from '../Firebase';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';

 //이 함수를 호출하면 thunk가 함수를 호출하고 redux의 dispatch메소드를 호출하고 그다음 Posts레퍼런스에서 값 이벤트를 받으면 타입과 페이로드를 dispatch한다.
export function fetchPosts () {
    return async dispatch => {
    getPosts.on("value", snapshot => {
        const data = [];
        snapshot.forEach(ss => {
            data.push(ss.val())
        });
        console.log(data);
        dispatch({
            type: FETCH_POSTS,
            payload: data             
        });        
    });
};
}

export const fetchPost = () => {
    
}