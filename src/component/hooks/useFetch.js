//자주 쓰고 비슷한 부분은 이렇게 만들어서 호출한 뒤 ()괄호 안에 url만 바꾸면 됨
//터미널 플러스 해서 json server --watch ./src/db/data.json --port 3001 서버 띄움
import { useEffect, useState } from "react";

export default function useFetch(url) { //api주소를 넘겨 받아서 fetch에 넣고
    const [data, setData]=useState([]);

    useEffect(()=>{//api호출 목적으로 useEffect 사용
        fetch(url)//api 비동기 통신을 위해 fetch 사용
        .then(res => {
            return res.json(); //response.json()
        })
        .then(data => {
            setData(data);//응답받은 데이터를 setData를 해줌
        });
    }, [url]);

    return data;
}