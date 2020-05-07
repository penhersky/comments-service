import { useHooks, parseEvent, handleUnexpectedError } from 'lambda-hooks';

const withHooks = useHooks({
  before: [parseEvent],
  after: [],
  onError: [handleUnexpectedError],
});

export default {
  withHooks,
};
