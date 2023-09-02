interface PropsType {
  editArticle: () => void;
  nickname: string;
  authorNickname: string;
}

export default function EditButtonView({ editArticle, nickname, authorNickname }: PropsType) {
  return (
    <>
      {nickname === authorNickname && (
        <button className="text-[#666666] text-[18px]" onClick={editArticle}>
          수정
        </button>
      )}
    </>
  );
}
