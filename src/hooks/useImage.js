import { useQuery } from "@tanstack/react-query";

const fetchImages = async () => {
  const response = await fetch(
    "https://picsum.photos/v2/list?page=21&limit=32"
  );
  const data = await response.json();
  return data;
};

export const useImage = () => {
  return useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });
};
