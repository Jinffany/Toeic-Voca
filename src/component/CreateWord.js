import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useFetch from "./hooks/useFetch"

export default function CreateWord(){
    const days=useFetch("http://localhost:3001/days"); //만들어놓은 fetch에 url을 넣어서 days를 불러옴
    const history = useHistory();
    const [isLoading, setIsLoading]=useState(false); //통신중일땐 저장버튼 누르는 거 안되게(isLoading이 false일때만 함수 실행)

    function onSubmit(e){ //저장 버튼을 눌렀을때 새로고침 되는 것을 막음(form태그 안에 있어서 버튼 누르면 새로고침 됐었음)
        e.preventDefault();

        if(!isLoading){
        setIsLoading(true);//작업중일때

        //그냥 값이 잘 찍히나 보려고 만든 거
        console.log(engRef.current.value); //current : 해당 요소에 접근할 수 있게 해줌, value : input에 입력된 값을 얻을 수 있음
        console.log(korRef.current.value);
        console.log(dayRef.current.value);

        //data.json의 words에서 day, eng, kor, isDone을 가져오는데 isDone은 폼항목에 없으니 기본값인 false로 가져옴
        fetch(`http://localhost:3001/words/`, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },

            body : JSON.stringify({
                day : dayRef.current.value,
                eng : engRef.current.value,
                kor : korRef.current.value,
                isDone : false
            }),
        }).then(res => { //저장을 해서
            if(res.ok){ //완료 했으면
                alert('생성이 완료됐습니다.'); //알림창 띄움
                history.push(`/day/${dayRef.current.value}`);//확인을 누르면 방금 저장한 단어가 있는 날짜페이지로 이동(이렇게 주소를 넣어주면 link to처럼 해당 페이지로 이동 가능)
                setIsLoading(false);//작업 끝나면 다시 false로 변환
            }
        });
    }
    }

    //input 창에 적힌 값을 얻기 위해서 훅 사용(저장버튼을 눌렀을때 단어와 뜻에 대한 정보를 찍어주기 위해서)
    const engRef=useRef(null); //useRef은 dom에 접근할 수 있도록 해줌 ex)스크롤 위치를 확인하거나 포커스를 줄때 사용
    const korRef=useRef(null);
    const dayRef=useRef(null);

    return(
    <form onSubmit={onSubmit}>
        <div className="input_area">
            <label>Eng</label>
            <input type="text" placeholder="computer" ref={engRef}/>
        </div>
        <div className="input_area">
            <label>Kor</label>
            <input type="text" placeholder="컴퓨터" ref={korRef}/>
        </div>
        <div className="input_area">
            <label>Day</label>
            <select ref={dayRef}>
                {days.map(day => ( //Day 선택 스크롤
                    <option key={day.id} value={day.day}>
                        {day.day}
                    </option>
                ))}
            </select>
        </div>
        <button style={
            {opacity : isLoading ? 0.3 : 1}}>{isLoading ? "Saving..." : "저장"}</button> {/*isLoading인 상태일때는 Saving이라고 띄워줌 + 버튼도 Saving이라고 바뀌면서 흐리게 변환되는 스타일 부여*/}
    </form>
    );
}