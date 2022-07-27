import { useState } from "react";
import { useAddSuperHero, useSuperHeroes } from "../hooks/useSuperheroesData";
import { NavLink } from "react-router-dom";

export const RQSuperHeroespage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    console.log(data);
  };

  const onError = (err) => {
    console.log(err);
  };

  const { isLoading, isError, error, data, isFetching, refetch } =
    useSuperHeroes(onSuccess, onError);
  console.log(isLoading, isFetching);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {
    mutate: mutateAddHero,
    // isLoading: addIsLoading,
    // isError: addIsError,
    // error: addError,
  } = useAddSuperHero();

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const handleAddHero = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    mutateAddHero(hero);
  };

  return (
    <div>
      <>
        <h2>RQSuperHeroespage</h2>
        <input
          type="text"
          value={name}
          placeholder="Hero Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          placeholder="Alter Ego"
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHero}> Add Hero </button>
      </>
      <br />
      <button onClick={refetch}> Fect Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <NavLink to={`/rq-super-heroes/${hero.id}`}>{hero.name}</NavLink>
          </div>
        );
      })}
      {/* Select functionality for React Query to easily list Hero name */}
      {/* {data.map((heroName) => { 
        return <div key={heroName}> {heroName} </div>;
      })} */}
    </div>
  );
};
