export interface questionsDTO {
  id: string;
  title: string;
  amount: string;
  description: string;
  category: {
    name: string;
    // icon: 'dollar-sign',
  };
  type: 'positive' | 'negative';
  date: string;
  questionsData: {
    question: string;
    // answers: [];
    correctIndex: number;
  };

  map(element: (item, key) => JSX.Element): any;
}
