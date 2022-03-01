import useFetch from "./hooks/useFetch"
import { useHistory } from "react-router-dom";

export default function CreateDay(){
    const days=useFetch("http://localhost/3001/days");
    const history = useHistory();

    function addDay(){
            fetch(`http://localhost:3001/days/`, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },

            body : JSON.stringify({
                day : days.length + 1, //현재 날짜에 플러스 1을 해주면 됨
            }),
        }).then(res => { //저장을 해서
            if(res.ok){ //완료 했으면
                alert('생성이 완료됐습니다.'); //알림창 띄움
                history.push(`/`);//확인을 누르면 방금 저장한 단어가 있는 첫번째 페이지로 이동
            }
        });
    }
    return(
    <div>
        <h3>현재 일수 : {days.length}일</h3>
        <button onClick={addDay}>Day 추가</button>
    </div>
    );
}