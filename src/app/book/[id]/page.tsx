import Book from "../_component/Book";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <Book id={id} />
    </div>
  );
}
