import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get(`http://localhost:4000/superheroes`);
};

const addSuperHero = async (hero) => {
  try {
    return await axios.post(`http://localhost:4000/superheroes`, hero);
  } catch (err) {
    throw new Error(err);
  }
};

export const useSuperHeroes = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};

export const useAddSuperHero = () => {
  const queryClient = useQueryClient(); // To update the existing state after adding hero.
  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries("super-heroes");
      queryClient.setQueriesData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};

//   onMutate: async (newHero) => {
//     await queryClient.cancelQueries("super-heroes");
//     const previousHeroData = queryClient.getQueriesData("super-heroes");
//     queryClient.setQueriesData("super-heroes", (oldQueryData) => {
//       return {
//         ...oldQueryData,
//         data: [
//           ...oldQueryData.data,
//           { id: oldQueryData?.data?.length + 1, ...newHero },
//         ],
//       };
//     });
//     return {
//       previousHeroData,
//     };
//   },
//   onError: (_error, _hero, context) => {
//     queryClient.setQueriesData("super-heroes", context.previousHeroData);
//   },
//   onSettled: () => {
//     queryClient.invalidateQueries("super-heroes");
//   },
