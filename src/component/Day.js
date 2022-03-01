//DayList에서 선택한 날짜에 해당되는 단어가 나오게 해주는 페이지
import Word from "./Word";
import { useParams } from "react-router-dom";
import useFetch from "./hooks/useFetch";

export default function Day(){
    const {day}=useParams() //각 day에 해당되는 단어(eng, kor)가 출력됨
    //const wordList = dummy.words.filter(word => word.day === Number(day)); //단어 데이터들을 가져오는데 위에 정의된 day=숫자와 word의 날짜가 같은 것만 출력
    const words = useFetch(`http://localhost:3001/words?day=${day}`);

    return(
    <>
    <h2>Day{day}</h2>
    {words.length === 0 && <span>Loading...</span>}
        <table>
            <tbody>
                {words.map(word=>(
                    <Word word={word} key={word.id}/>
                ))}
            </tbody>
        </table>
    </>
    );
}