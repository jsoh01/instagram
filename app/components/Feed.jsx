import { Heart } from "../icons/Heart";
import { Menu } from "../icons/Menu";

export const Feed = () => {
  return (
    <div className="border-2 w-[400px]">
      <div id="header" className="flex items-center justify-between p-2">
        {/* profile */}
        <div className="flex items-center ">
          <div
            className="rounded-full w-10 h-10
           bg-[url('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')]
           bg-contain mr-2"
          />
          <div>
            <div className="font-semibold">Name</div>
            <div className="font-light">location</div>
          </div>
        </div>
        {/* 더보기 버튼 */}
        <div>
          <Menu />
        </div>
      </div>
      <div id="content">{/* 이미지 */}</div>
      <div id="footer">
        <Heart />
        {/** 좋아요버튼, 댓글버튼, DM버튼 */}
        {/** 저장 버튼 */}
      </div>
      <div id="comments">
        {/* 누가 좋아요했는지 + 좋아요한 사람의 수 */}
        {/* 내가 작성한 컨텐츠의 글 */}
        {/* 댓글들 */}
      </div>
    </div>
  );
};
