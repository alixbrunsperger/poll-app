import type { GetServerSideProps, NextPage } from "next";
import { v4 as uuidv4 } from "uuid";
import { dehydrate, QueryClient, useQuery, UseQueryResult } from "react-query";
import { ErrorType, PollType, QuestionType } from "../../../lib/types";
import PageContainer from "../../../components/PageContainer";
import { postQuery } from "../../../lib/dataFetch";
import { getDefaultValues, getRegisterSchema } from "../../../lib/utils";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import QuestionContainer from "../../../components/form/QuestionContainer";
import { useEffect } from "react";
import _ from "lodash";
import { object } from "zod";
import { Box, Typography, Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputText } from "../../../components/form/FormInputText";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

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
        required
        answers {
          uid
          value
        }
      }
    }
  }`,
  variables: { uid },
});

const CreatePollAnswerMutationQuery = (data: any) => ({
  query: `
  mutation CreatePollAnswer($data: PollAnswerCreateInput!) {
    createPollAnswer(data: $data) {
      id
    }

    publishManyPollAnswersConnection{
      aggregate {
        count
      }
    }
    publishManyPollQuestionAnswersConnection{
      aggregate {
        count
      }
    }
}`,
  variables: {
    data,
  },
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pollId = context.params?.id as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(`getPoll-${pollId}`, () =>
    postQuery(getPollQuery(pollId))
  );
  const data = queryClient.getQueryData(`getPoll-${pollId}`);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    //notFound: !data, //add 404 when form is not active or not found
  };
};

type QueryResult = {
  poll: PollType;
  isError: boolean;
  error: ErrorType;
};

//type RegisterInput = TypeOf<typeof registerSchema>;

const Poll: NextPage = () => {
  const router = useRouter();
  const pollUId: string =
    typeof router.query?.id === "string" ? router.query.id : "";
  const queryResult: UseQueryResult<QueryResult, ErrorType> = useQuery(
    `getPoll-${pollUId}`,
    () => postQuery(getPollQuery(pollUId))
  );

  const { data, isError, error } = queryResult;
  const poll = data?.poll;

  const methods = useForm<any>({
    mode: "onTouched",
    defaultValues: poll ? getDefaultValues(poll) : {},
    resolver: zodResolver(object(poll ? getRegisterSchema(poll) : {})),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = methods;

  const onSubmit = async (data: any) => {
    const uid = uuidv4();
    const { name, ...questions } = data;
    const queryData = {
      uid,
      pollUId,
      name: name,
      pollQuestionAnswers: {
        create: Object.keys(questions).map((questionUId) => ({
          uid: uuidv4(),
          questionUId,
          answers: data[questionUId].toString(),
        })),
      },
    };

    await postQuery(CreatePollAnswerMutationQuery(queryData)).then((data) =>
      router.push("/poll/end")
    );
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  if (isError) {
    return <span>Error... {JSON.stringify(error)}</span>;
  }

  return (
    <PageContainer title="Please answer the poll" loaded={!!poll}>
      <Typography
        variant="h4"
        component="div"
        sx={{ flexGrow: 1, margin: "auto" }}
      >
        {`Poll: ${poll?.title}`}
      </Typography>
      {poll ? (
        <FormProvider {...methods}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "grid", gridTemplateColumns: "1fr" }}
          >
            {poll.questions.map((question: QuestionType) => (
              <QuestionContainer
                disabled={false}
                key={question.uid}
                question={question}
              />
            ))}
            <Typography variant="h6" sx={{ textDecoration: "underline" }}>
              Your name (optional)
            </Typography>
            <FormInputText name="name" label="Name" />
            <Button
              className=""
              type="submit"
              variant="outlined"
              disabled={!_.isEmpty(errors)}
              sx={{ marginTop: "1rem" }}
            >
              Submit your answers <PlaylistAddCheckIcon />
            </Button>
          </Box>
        </FormProvider>
      ) : null}
    </PageContainer>
  );
};

export default Poll;
