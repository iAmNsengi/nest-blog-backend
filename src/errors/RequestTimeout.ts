import { RequestTimeoutException } from '@nestjs/common';

export default function requestTimeoutError(
  message = "Couldn't process your request at the moment",
  description = 'Error connecting to the database'
) {
  throw new RequestTimeoutException(message, { description });
}
