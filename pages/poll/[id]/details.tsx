import type { GetServerSideProps, NextPage } from "next";
import { dehydrate, QueryClient, useQuery, UseQueryResult } from "react-query";
import { PollAnswerType, ErrorType, PollType } from "../../../lib/types";
import PageContainer from "../../../components/PageContainer";
import { postQuery } from "../../../lib/dataFetch";
import { useRouter } from "next/router";
import ResultContainer from "../../../components/ResultContainer";
import { Typography, Box, Switch, FormControlLabel } from "@mui/material";
import PollDetails from "../../../components/PollDetails";
import { SetStateAction, useState, useEffect } from "react";

const updatePollMutationQuery = ({ data, uid }) => ({
  query: `
  mutation UpdatePoll($data: PollUpdateInput!, $uid: String!) {
    updatePoll(data: $data, where: {uid: $uid}) {
      uid
      active
    }

    publishPoll(where : {uid: $uid}) {
      uid
      active
    }
  }`,
  variables: {
    data,
    uid,
  },
});

const getPollQuery = (uid: string) => ({
  query: `
  query getPoll($uid:String!) {
    poll(where: {uid: $uid}) {
      uid
      title
      active
      questions {
        uid
        title
        type
        answers {
          uid
          value
        }
      }
    }
    pollAnswers(where: {pollUId: $uid}) {
      name
      pollQuestionAnswers {
        questionUId
        answers
      }
    }
  }`,
  variables: { uid },
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pollId = context.params?.id as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("getPolls", () =>
    postQuery(getPollQuery(pollId))
  );
  const data = queryClient.getQueryData("getPolls");

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    //notFound: !data, //add 404 when form is not active or not found
  };
};

type QueryResult = {
  data: {
    poll: PollType;
    pollAnswers: PollAnswerType[];
  };
  isError: boolean;
  error: ErrorType;
};

const Details: NextPage = () => {
  const router = useRouter();
  const pollUId: string =
    typeof router.query?.id === "string" ? router.query.id : "";
  const queryResult: UseQueryResult<QueryResult, ErrorType> = useQuery(
    `getPollDetail-${pollUId}`,
    () => postQuery(getPollQuery(pollUId))
  );

  const { data: queryData, isError, error } = queryResult;
  const data = queryData?.data;

  const poll = data?.poll;
  const pollAnswers = data?.pollAnswers;
  const pollQuestionAnswers = pollAnswers
    ?.map((pollAnswer) => pollAnswer.pollQuestionAnswers)
    .flat();

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(poll?.active);
  }, [poll]);

  if (isError) {
    return <span>Error... {JSON.stringify(error)}</span>;
  }

  const toggleActive = async (status: SetStateAction<boolean>) => {
    const queryData = {
      data: {
        active: status,
      },
      uid: poll.uid,
    };
    setActive(status);
    await postQuery(updatePollMutationQuery(queryData));
  };

  console.log(poll?.active, active);

  return (
    <PageContainer title={"Poll Details"} loaded={!!poll}>
      <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
        <Typography variant="h4">{`Poll: ${poll?.title}`}</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={!!active}
              onChange={() => toggleActive(!active)}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label={active ? "Active" : "Inactive"}
        />
      </Box>
      <Typography variant="h6">Overview :</Typography>
      {poll && pollQuestionAnswers ? (
        <>
          <PollDetails poll={poll} />
          <ResultContainer
            pollAnswercount={pollAnswers.length}
            poll={poll}
            pollQuestionAnswers={pollQuestionAnswers}
          />
        </>
      ) : null}
    </PageContainer>
  );
};

export default Details;
