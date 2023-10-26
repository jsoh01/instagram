/**
 * Message
 * {
 *   id
 *   text: string
 *   author: User
 * }
 */

// 보낸 메세지 우측 정렬, 파란색 배경
// 받은 메세지 좌측 정렬, 흰색
export const Bubble = ({ message, isMine }) => {
  return (
    <div
      className={`${
        isMine ? "self-end bg-blue-400 " : "self-start bg-rose-200"
      } text-white p-2 px-4 rounded-full w-fit my-1`}
    >
      {message.text}
    </div>
  );
};
