export const Feed = () => {
    return (
        <div> className="border-2 w-[400px]">
            <div id="header" className="flex items-center justify-between p-2">
                { /* profile */ } 

                <div className="flex items-center ">
                   <div> 
                    className="rounded-full w-10 h10
                    bg-[url('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-p
                    bg-contain mr-2"
                />
                <div>
                    <div className="font-semibold">Name</div>
                    <div className="font-light">location</div>
                </div>
                { /* 더보기 버튼 */}
                <div>
                    <Menu />
                </div>
            </div>

            
            <div id="content"> {/* 이미지 */} </dev>
            <div id="footer">
                {/** 좋아요 버튼, 댓극버튼, DM 버튼  */}
                { /** 저장버튼 */}
            </div>
            <div id="Comments">
                {/** 누가 좋아여했는지 좋아요 + 좋아요한 사람의 수 */}
                { /** 내가 작성한 컨텐츠의 글 */}
                { /** 댓글 */}
            </div>
        </div>
    )
}