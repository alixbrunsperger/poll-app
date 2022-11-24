import { InputTypes, LooseObject, OptionType, PollType, QuestionFormTypes, QuestionType, ValidationRule } from "./types";
import { string, Schema } from "zod";

export function getInputType(type: QuestionFormTypes): InputTypes {
    switch (type) {
        case QuestionFormTypes.choice:
            return InputTypes.radio
        case QuestionFormTypes.multichoice:
            return InputTypes.checkbox
        case QuestionFormTypes.text:
            return InputTypes.text
    }
}

export const QuestionsChoicesLabels: object = {
    [QuestionFormTypes.choice]: "Single answer",
    [QuestionFormTypes.multichoice]: "Multiple answers",
    [QuestionFormTypes.text]: "Free answer"
}

export function getQuestionTypeOptions(): OptionType[] {
    return Object.keys(QuestionsChoicesLabels).map(key => ({
        value: key,
        label: QuestionsChoicesLabels[key]
    }));
}

export function initializeFormFromPoll(poll: PollType): object {
    const { questions } = poll
    return Object.assign({}, ...questions.map(({ uid, type, title }: QuestionType) => ({
        [uid]: { type, title }
    })))
}

//Function<ZodArray || ZodString>
export function getValidationRule(type: QuestionFormTypes): ValidationRule {
    return type === QuestionFormTypes.multichoice
        ? string().array().nonempty()
        : string().min(1)
};

export function getRegisterSchema(poll: PollType): Schema {
    const validationsRules = poll.questions
        .filter(({ required }) => !!required)
        .map((question: QuestionType) => [
            question.uid,
            getValidationRule(question.type),
        ]);
    return Object.fromEntries([...validationsRules, ["name", string().optional()]]);
};

export function getDefaultValues(poll: PollType): LooseObject[] {
    const defaultValues = poll.questions
        .map((question: QuestionType) => [
            question.uid,
            question.type === QuestionFormTypes.multichoice ?
                []
                : ""
        ]);
    return Object.fromEntries([...defaultValues, ["name", ""]]);
}