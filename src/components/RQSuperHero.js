import React from "react";
import { useHeroData } from "../hooks/useHeroData";
import { useParams } from "react-router-dom";

const RQSuperHero = () => {
  const { heroId } = useParams();

  const { isLoading, data, isError, error } = useHeroData(heroId);

  if (isLoading) {
    <h1> Loading...</h1>;
  }

  if (isError) {
    <h1> {error.message}</h1>;
  }

  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
};

export default RQSuperHero;
