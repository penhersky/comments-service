import {
  useHooks,
  parseEvent,
  handleUnexpectedError,
  State,
  Hook,
} from 'lambda-hooks';

import database from './database';
import res from './responses';

const connectDB: Hook = async (state: State): Promise<State> => {
  const newState = state;
  try {
    const client = await database.connect();
    newState.context.clientDB = client;
    return newState;
  } catch (error) {
    newState.response = res.C500({ message: 'Database error' });
    return newState;
  }
};

const useLambdaHook = useHooks({
  before: [parseEvent, connectDB],
  after: [],
  onError: [handleUnexpectedError],
});

export default {
  useLambdaHook,
};
