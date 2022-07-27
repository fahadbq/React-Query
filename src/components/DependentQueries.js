import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchuserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchuserBychannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueries = ({ email }) => {
  const { data: user } = useQuery(["user", email], () =>
    fetchuserByEmail(email)
  );

  const channelId = user?.data.channelId;

  const { data } = useQuery(
    ["courses", channelId],
    () => fetchuserBychannelId(channelId),
    {
      enabled: !!channelId,
    }
  );

  console.log(channelId);

  return (
    <div>
      {data?.courses?.map((course) => {
        return <strong> {course} </strong>;
      })}
    </div>
  );
};
