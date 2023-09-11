interface PropsType {
  deleteArticle: () => void;
}

export default function DeleteButtonView({ deleteArticle }: PropsType) {
  return (
    <button className="text-[#666666] text-[18px]" onClick={deleteArticle}>
      삭제
    </button>
  );
}
