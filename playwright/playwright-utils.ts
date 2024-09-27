import { User } from "@/model/user";
import { APIRequestContext } from "playwright-core";

export default class PlaywrightUtils {

  static async createDefaultUser(request: APIRequestContext) {
    console.log('[PlaywrightUtils#createDefaultUser]');

    const requestBody: User = {
      firstName: 'John',
      lastName: 'Doe',
      age: 32,
      weight: 185.3,
      smoker: false,
    };

    const response = await request.post('/api/users', { data: requestBody });

    const responseBody = await response.json();

    // console.log(responseBody);

    return responseBody;
  };
}
