import type { GetServerSideProps, NextPage } from "next";
import { v4 as uuidv4 } from "uuid";
import { dehydrate, QueryClient, useQuery, UseQueryResult } from "react-query";
import { ErrorType, QuestionType, AnswerType } from "../../lib/types";
import PageContainer from "../../components/PageContainer";
import { postQuery } from "../../lib/dataFetch";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import { Container, Button } from "@mui/material";
import { FormInputText } from "../../components/form/FormInputText";
import { QuestionsBlock } from "../../components/form/QuestionsBlock";

const getQuestionsAndAnswersQuery = {
  query: `
  query getQuestionsAndAnswers() {
      questions {
        uid
        title
        type
      }
      answers {
        uid
        value
      }
  }`,
};

const createFullPollMutationQuery = (data: any) => ({
  query: `
    mutation CreateFullPoll($data: PollCreateInput!, $uid: String!) {
        createPoll(data: $data) {
          uid
        }

        publishPoll(where : {uid: $uid}) {
            uid
        }

        publishManyQuestionsConnection {
          aggregate {
            count
          }
        }

        publishManyAnswersConnection {
          aggregate {
            count
          }
        }
      }`,
  variables: {
    data,
    uid: data.uid,
  },
});

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("getQuestionsAndAnswers", () =>
    postQuery(getQuestionsAndAnswersQuery)
  );
  //const data = queryClient.getQueryData("getQuestionsAndAnswers");

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    //notFound: !data, //add 404 when form is not active or not found
  };
};

type QueryResult = {
  questions: QuestionType[];
  answers: AnswerType[];
  isError: boolean;
  error: ErrorType;
};

const Poll: NextPage = () => {
  const router = useRouter();
  const queryResult: UseQueryResult<QueryResult, ErrorType> = useQuery(
    `getQuestionsAndAnswers`,
    () => postQuery(getQuestionsAndAnswersQuery)
  );

  const methods = useForm({
    defaultValues: {
      title: "",
      questions: {},
    },
  });
  const { handleSubmit, getValues, setValue } = methods;

  const onSubmit = async (data: any) => {
    const queryData = {
      uid: uuidv4(),
      title: data.title,
      active: true,
      questions: {
        create: Object.keys(data.questions).map((questionUid) => ({
          uid: questionUid,
          ...data.questions[questionUid],
          answers: {
            create: Object.keys(data.questions[questionUid].answers).map(
              (answerUid) => ({
                uid: answerUid,
                value: data.questions[questionUid].answers[answerUid],
              })
            ),
          },
        })),
      },
    };

    await postQuery(createFullPollMutationQuery(queryData)).then((data) =>
      router.push("/dashboard")
    );
  };

  const { data, isError, error } = queryResult;
  //const questions = data?.questions;
  //const answers = data?.answers;

  if (isError) {
    return <span>Error... {JSON.stringify(error)}</span>;
  }

  return (
    <PageContainer title={"Create a Poll"} loaded={true}>
      <FormProvider {...methods}>
        <Container sx={{ marginTop: "1rem" }}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <FormInputText label="Poll Name" name="title" />
            <QuestionsBlock setValue={setValue} getValues={getValues} />
            <Button
              sx={{ marginTop: "1rem" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Create
            </Button>
          </form>
        </Container>
      </FormProvider>
    </PageContainer>
  );
};

export default Poll;
