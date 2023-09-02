interface PropsType {
  editArticle: () => void;
}

export default function EditButtonView({ editArticle }: PropsType) {
  return (
      <button className="text-[#666666] text-[18px]" onClick={editArticle}>
        수정
      </button>
  );
}
