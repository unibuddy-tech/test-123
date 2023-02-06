import {
  UbLoggerFactory,
  UbLoggerOptionsFactory,
  Environments,
} from 'unibuddy-logger';
import get from 'lodash.get';

export const initialiseLogger = () => {
  const serviceName = get(process.env, 'UB_SERVICE', '');
  const environment = get(process.env, 'UB_ENVIRONMENT', Environments.LOCAL);
  const loggingLevel =
    environment === Environments.LOCAL
      ? 'debug'
      : get(process.env, 'LOG_LEVEL', 'info');

  UbLoggerFactory.configure(
    UbLoggerOptionsFactory.getOptions({
      service: serviceName,
      environment: environment,
      loggingLevel: loggingLevel,
    }),
  );
};
export default initialiseLogger;
