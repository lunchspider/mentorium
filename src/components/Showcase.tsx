export default function ShowcaseProject({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-6 m-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
