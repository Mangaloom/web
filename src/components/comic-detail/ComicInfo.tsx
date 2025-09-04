import { RatingComic } from "@/components/RatingComic";

interface ComicInfoProps {
  status: string;
  type: string;
  released: string;
  author: string;
  updatedOn: string;
  rating: string;
}

export const ComicInfo = ({
  status,
  type,
  released,
  author,
  updatedOn,
  rating,
}: ComicInfoProps) => {
  const infoList = [
    { label: "Status", value: status },
    { label: "Tipe", value: type },
    { label: "Rilis", value: released },
    { label: "Author", value: author },
    { label: "Update", value: updatedOn },
  ];

  return (
    <div className="mt-4 border-t border-b border-gray-700 py-4">
      <dl className="space-y-2 text-sm">
        {infoList.map((item) => (
          <div key={item.label} className="flex">
            <dt className="w-24 text-gray-400 font-medium">{item.label}</dt>
            <dd className="text-white">{item.value}</dd>
          </div>
        ))}
        <div className="flex items-center">
          <dt className="w-24 text-gray-400 font-medium">Rating</dt>
          <dd className="flex items-center">
            <RatingComic rating={rating} size={16} />
          </dd>
        </div>
      </dl>
    </div>
  );
};
