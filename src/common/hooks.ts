import {
  useHooks,
  parseEvent,
  handleUnexpectedError,
  State,
  Hook,
} from 'lambda-hooks';
import { MongoClient } from 'mongodb';

import res from './responses';

const url = process.env.DB_ULR;

const connectDB: Hook = async (state: State): Promise<State> => {
  const newState = state;
  try {
    const client = await MongoClient.connect(url);
    newState.context.clientDB = client;
    return newState;
  } catch (error) {
    newState.response = res.C500({ message: 'Database error' });
    return newState;
  }
};

const closeConnection: Hook = async (state: State): Promise<State> => {
  try {
    state.context.clientDB.close();
    return state;
  } catch (error) {
    const newState = state;
    newState.response = res.C500({ message: 'Database error!' });
    return newState;
  }
};

const useLambdaHook = useHooks({
  before: [parseEvent, connectDB],
  after: [closeConnection],
  onError: [handleUnexpectedError],
});

export default {
  useLambdaHook,
};
