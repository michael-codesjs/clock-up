import { ErrorTypes, UpdateUserInputSchema } from "@local-types/api";
import middy from "@middy/core";
import { EntityErrorMessages } from "../../framework/entities/types";
import { ZodError } from "zod";
import { withErrorResponse } from "../with-error-response";
import { withZodInputValidator } from "@middleware/with-zod-input-validator";
import { chance } from "@utilities/constants";

/*
 * we are not going to test each and every input validator we generate using graphql codegen.
 * we are just going to test that our middleware works.
 */

describe("With Zod Input Validator", () => {

  const withMiddleware = (lambda: any, validator: Parameters<typeof withZodInputValidator>[0]) => middy(lambda).use(withZodInputValidator(validator));

  let name: string;
  let email: string;

  const lambda = withMiddleware((event) => {
    expect(event.arguments.input).toMatchObject({
      name, email
    });
  }, UpdateUserInputSchema);

  beforeEach(() => {
    name = chance.name();
    email = chance.email();
  });

  it("Validates a clean input", async () => {

    const event = {
      arguments: {
        input: {
          name, email
        }
      }
    };

    await lambda(event as any, {} as any);

  });

  it("Validates a dirty input", async () => {

    const event = {
      arguments: {
        input: {
          name: 4, email: 3
        }
      }
    };

    try {
      await lambda(event as any, {} as any);
    } catch (error: any) {
      expect(error.name).toBe("ZodError");
    }

  });

});