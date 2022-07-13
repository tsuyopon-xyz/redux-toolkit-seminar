type Response = {
  data: number;
};

export const fetchCount = async (amount: number): Promise<Response> => {
  return new Promise(
    (resolve, reject) => setTimeout(() => resolve({ data: amount }), 500)
    // setTimeout(() => reject({ data: 'reject!!!!' }), 1000)
  );
};
