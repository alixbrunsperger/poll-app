import { postQuery } from "../lib/dataFetch";
import type { GetServerSideProps, NextPage } from "next";
import { dehydrate, QueryClient, useQuery, UseQueryResult } from "react-query";
import { ErrorType, PollAnswerType, PollType } from "../lib/types";
import PageContainer from "../components/PageContainer";
import PollList from "../components/PollList";

const getPollsQuery = {
  query: `
  query {
        polls {
            uid
            title
            active
            questions {
              title
              answers {
                value
              }
            }
        }
        pollAnswers{
          pollUId
        }
    }`,
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("getPolls", () => postQuery(getPollsQuery));
  //const data = queryClient.getQueryData("getPolls");

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    //notFound: !data,
  };
};

type QueryResult = {
  data: {
    pollAnswers: PollAnswerType[];
    polls: PollType[];
  };
  isError: boolean;
  error: ErrorType;
};

const Dashboard: NextPage = () => {
  const queryResult: UseQueryResult<QueryResult, ErrorType> = useQuery(
    "getPolls",
    () => postQuery(getPollsQuery)
  );
  const { data: queryData, isError, error } = queryResult;
  const data = queryData?.data;

  if (isError) {
    return <span>Error... {JSON.stringify(error)}</span>;
  }

  return (
    <PageContainer title="Dashboard" loaded={!!data}>
      {data ? (
        <PollList polls={data.polls} pollAnswers={data.pollAnswers} />
      ) : (
        "Loading..."
      )}
    </PageContainer>
  );
};

export default Dashboard;
