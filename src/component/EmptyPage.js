//존재하지 않는 페이지를 선택했을때 나오는 페이지
import { Link } from "react-router-dom";

export default function EmptyPage(){
    return(
        <>
            <h2>잘못된 접근입니다.</h2>
            <Link to="/">홈으로</Link>
        </>
    );
}