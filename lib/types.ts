import { ZodArray, ZodString } from "zod";

export type ErrorType = {
    response: {
        status: number
    },
}

export type BasicEntityType = {
    uid: string,
    title: string,
}

export type AnswerType = Omit<BasicEntityType, "title"> & {
    value: string;
};

export type QuestionType = BasicEntityType & {
    type: QuestionFormTypes,
    answers: AnswerType[],
    required: boolean,
};

export type PollType = BasicEntityType & {
    active: boolean,
    questions: QuestionType[],
};

export type PollsType = {
    polls: PollType[],
};

export type PollAnswerType = {
    uid: string,
    pollUId: string,
    name?: string,
    pollQuestionAnswers: PollQuestionAnswerType[],
}

export type PollQuestionAnswerType = {
    uid: string,
    questionUId: string,
    answers: string,
}

export type OptionType = {
    label: string,
    value: string,
}

export enum InputTypes {
    radio = "radio",
    checkbox = "checkbox",
    text = "text"
}

export enum QuestionFormTypes {
    choice = "choice",
    multichoice = "multichoice",
    text = "text"
}

export type LooseObject = {
    [key: string]: string
}

export type ValidationRule = ZodArray<ZodString, "atleastone"> | ZodString;