import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Advertisment } from "../types/advertisment";
import { advertisments as advertisementsExampleData } from "../data/data";

export const getAdvertisements = (): Advertisment[] => {
  const storedAds = localStorage.getItem("advertisment");
  return storedAds ? JSON.parse(storedAds) : [];
};

const setAdvertisements = (advertisements: Advertisment[]) => {
  localStorage.setItem("advertisment", JSON.stringify(advertisements));
};

export const useAdvertisments = () => {
  const queryClient = useQueryClient();

  const { data: advertisments = [], isLoading } = useQuery({
    queryKey: ["advertisments"],
    queryFn: getAdvertisements,
  });

  const setExampleData = useMutation<void, Error>({
    mutationKey: ["set-example-data"],
    mutationFn: async () => {
      await setAdvertisements(advertisementsExampleData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advertisments"] });
    },
  });

  const addAdvertisement = useMutation<Advertisment[], Error, Advertisment>({
    mutationKey: ["add-advertisment"],
    mutationFn: async (newAdvertisement: Advertisment) => {
      const updatedAds = [...advertisments, newAdvertisement];
      await setAdvertisements(updatedAds);
      return updatedAds;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advertisments"] });
    },
  });

  const deleteAdvertisement = useMutation<Advertisment[], Error, string>({
    mutationKey: ["delete-advertisment"],
    mutationFn: async (id: string) => {
      const updatedAds = advertisments.filter((ad) => ad.id !== id);
      await setAdvertisements(updatedAds);
      return updatedAds;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advertisments"] });
    },
  });

  const editAdvertisement = useMutation<Advertisment[], Error, Advertisment>({
    mutationKey: ["edit-advertisment"],
    mutationFn: async (updatedAdvertisement: Advertisment) => {
      const updatedAds = advertisments.map((ad) =>
        ad.id === updatedAdvertisement.id ? updatedAdvertisement : ad
      );
      await setAdvertisements(updatedAds);
      return updatedAds;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advertisments"] });
    },
  });

  return {
    advertisments,
    isLoading,
    addAdvertisement,
    deleteAdvertisement,
    editAdvertisement,
    setExampleData,
  };
};
