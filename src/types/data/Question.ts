interface Question {
    second: number;
    text: string;
}

export const isQuestion = (item: unknown): item is Question => {
    const questionItem = item as Question;
    return (
        typeof questionItem.second === 'number' &&
        typeof questionItem.text === 'string'
    );
};

export default Question;
