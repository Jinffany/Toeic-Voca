//뜻보기 버튼을 눌렀을때 뜻을 보여주거나 숨기는 기능
//삭제 버튼 눌렀을때 단어가 삭제되는 기능

import { useState } from "react"

export default function Word({word : w}){ //word : w 라고 하면 새로운 변수명으로 할당 가능(props로 넘어온 word를 w라는 변수명으로 쓰겠다는 의미)
    const[word, setWord]=useState(w); //삭제를 하고 나서 새로고침을 안하면 변화가 없어서 새로고침 없이 바로 변화가 반영될 수 있게 해줌
    const[isShow,setIsShow]=useState(false);//처음에는 뜻이 안보임
    const[isDone,setIsDone]=useState(word.isDone);//초기값은 isDone이 원래 갖고 있던 값

    function toggleShow(){//1. 뜻보기, 숨기기
        setIsShow(!isShow)//현재 isShow의 상태에 따라 반대로 동작
    }
    function toggleDone(){ //체크 된 거 다른 페이지 왔다가 다시 돌아와도 그대로 되어 있는지
        //setIsDone(!isDone)//현재 isDone의 상태에 따라 반대로 동작
        fetch(`http://localhost:3001/words/${word.id}`, {
            method : "PUT",
            headers : {
                'Content-Type' : 'application/json', //보내는 리소스의 타입을 의미(평범한 문자열, html, 이미지 등)
            },
            //단순히 불러오는 것(GET)과는 다르게 PUT은 수정을 위한 정보들을 실어서 보내줘야 함
            body : JSON.stringify({  //json파일로 변경하기 위해서 stringify로 감싸줌
                ...word,
                isDone : !isDone
            }),
        }).then(res => { //응답을 받아서
            if(res.ok){ //응답이 ok라면
                setIsDone(!isDone); //스테이트를 바꿔줌
            }
        });
    }

    function del(){ //2. 단어 삭제
        if(window.confirm('삭제하시겠습니까?')){
            fetch(`http://localhost:3001/words/${word.id}`,{
                method:'DELETE',
            }).then(res=>{
                if(res.ok){
                    setWord({id:0});
                }
            });
        }
    }

    if(word.id===0){ //만약 word의 id가 0이면 null을 리턴해줌
        return null;
    }

    return(
    <tr className={isDone ? "off" : ""}>
        <td><input type="checkbox" checked={isDone}
        onChange={toggleDone}/></td>{/*체크박스에 체크를 하면 외웠다는 의미로 word.isDone이 true상태가 되면서 칸이 흐리게 변함 */}
        <td>{word.eng}</td>
        <td>{isShow && word.kor}</td> {/*isShow일때는 보여줌 */}
        <td>
            <button onClick={toggleShow}>뜻 {isShow ? '숨기기':'보기'}</button> {/*isShow의 상태에 따라서 버튼 숨기기 혹은 보기로 바뀌게 함 */}
            <button onClick={del} className="btn_del">삭제</button>
        </td>
    </tr>)
}

//Create - POST
//Read - GET
//Update - PUT
//Delete - DELETE